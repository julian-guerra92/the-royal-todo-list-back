import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';
import { Prisma } from 'generated/prisma';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { validateInauspiciousDate } from '../utils/validateInauspiciousDate';
import { validateNigeriaHoliday } from '../utils/validateNigeriaHolidays';
import { isCursedTitle } from '../utils/palindromeValidator';

@Injectable()
export class TodosService extends PrismaClient {
  private readonly logger = new Logger(TodosService.name);

  onModuleInit() {
    this.$connect();
    this.logger.log('Connected to the database');
  }

  async create(createTodoDto: CreateTodoDto) {
    try {
      const { title, content, scheduledDate, priority } = createTodoDto;

      this.validateScheduledDate(scheduledDate);

      const todo = await this.toDo.create({
        data: {
          title: title.trim(),
          content: content.trim(),
          scheduledDate: scheduledDate,
          priority: priority,
        },
      });

      this.logger.log(`Todo created successfully with ID: ${todo.id}`);
      return todo;

    } catch (error) {
      this.handleException(error, 'creating');
    }
  }

  async findAll() {
    try {
      const todos = await this.toDo.findMany({
        where: {
          cursed: false,
        },
        orderBy: [{ scheduledDate: 'asc' }, { priority: 'desc' }],
      });

      this.logger.log(`Found ${todos.length} todos`);
      return todos;

    } catch (error) {
      this.handleException(error, 'fetching');
    }
  }

  async findOne(id: number) {
    const todo = await this.toDo.findUnique({
      where: { id },
    });
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    try {
      await this.findOne(id);
      const { scheduledDate, title } = updateTodoDto;

      if (scheduledDate) {
        this.validateScheduledDate(scheduledDate);
      }

      const titleToCheck = title || '';
      const isTitleCursed = isCursedTitle(titleToCheck);

      const updatedTodo = await this.toDo.update({
        where: { id },
        data: {
          ...updateTodoDto,
          cursed: isTitleCursed,
          deleteAt: isTitleCursed ? new Date(Date.now() + 10 * 1000) : null,
        },
      });

      this.logger.log(`Todo with ID ${id} updated successfully`);
      return updatedTodo;

    } catch (error) {
      this.handleException(error, 'updating', id);
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);

      const deletedTodo = await this.toDo.delete({
        where: { id },
      });

      this.logger.log(`Todo with ID ${id} deleted successfully`);
      return deletedTodo;
    } catch (error) {
      this.handleException(error, 'deleting', id);
    }
  }

  async removeAll(refreshIndexes: boolean = false) {
    try {
      const deleteResult = await this.toDo.deleteMany({});

      if (refreshIndexes) {
        await this.refreshDatabaseIndexes();
        this.logger.warn(`All todos deleted, count: ${deleteResult.count}. Indexes refreshed for prime minute.`);
      } else {
        this.logger.warn(`All todos deleted, count: ${deleteResult.count}`);
      }

      return { ...deleteResult, indexesRefreshed: refreshIndexes };
    } catch (error) {
      this.handleException(error, 'deleting all todos');
    }
  }

  async refreshDatabaseIndexes() {
    try {
      await this.$executeRaw`ANALYZE TABLE ToDo`;
      await this.$executeRaw`OPTIMIZE TABLE ToDo`;
      this.logger.log('✨ Database indexes refreshed successfully');
    } catch (error) {
      this.logger.error('Error refreshing database indexes', error.stack);
    }
  }

  async cleanCursedTodos() {
    try {
      const now = new Date();

      const cursedTodos = await this.toDo.findMany({
        where: {
          cursed: true,
          deleteAt: {
            lte: now,
          },
        },
        select: {
          id: true,
        },
      });

      if (cursedTodos.length === 0) {
        this.logger.log('No cursed todos to clean');
        return;
      }

      const deleteResult = await this.toDo.deleteMany({
        where: {
          cursed: true,
          deleteAt: {
            lte: now,
          },
        },
      });

      if (deleteResult.count > 0) {
        this.logger.warn(
          `Palindrome Curse executed: Eliminated ${deleteResult.count} cursed todo(s)`,
        );
        return deleteResult.count;
      }
    } catch (error) {
      this.handleException(error, 'cleaning cursed todos');
    }
  }

  private validateScheduledDate(scheduledDate: Date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (scheduledDate < today) {
      throw new BadRequestException(
        'Scheduled date cannot be in the past',
      );
    }

    const date = scheduledDate.toISOString().split('T')[0];

    const isInauspiciousDate = validateInauspiciousDate(date);

    if (isInauspiciousDate) {
      throw new BadRequestException(
        'The scheduled date is considered inauspicious. Please choose another date.',
      );
    }

    const isHoliday = validateNigeriaHoliday(date);

    if (isHoliday) {
      throw new BadRequestException(
        'The scheduled date falls on a Nigerian public holiday. Please choose another date.',
      );
    }
  }

  private handleException(error: any, operation: string, id?: number) {
    const message = id
      ? `Error ${operation} todo with ID ${id}`
      : `Error ${operation} todos`;

    this.logger.error(message, error.stack);

    if (
      error instanceof BadRequestException ||
      error instanceof NotFoundException
    ) {
      throw error;
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025' && id) {
        throw new NotFoundException(`Todo with ID ${id} not found`);
      }
      throw new BadRequestException(
        `Database error: ${error.message}`,
      );
    }

    throw new InternalServerErrorException(
      `Error ${operation} ${id ? 'todo' : 'todos'} in database`,
    );
  }
}

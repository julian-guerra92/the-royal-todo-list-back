import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TodosService } from 'src/todos/todos.service';
import { SseService } from './sse.service';

@Injectable()
export class CronProcessService {
  private readonly logger = new Logger(CronProcessService.name);

  constructor(
    private readonly todosService: TodosService,
    private readonly sseService: SseService
  ) { }

  @Cron(CronExpression.EVERY_10_SECONDS, {
    name: 'cleanCursedTodos',
    timeZone: 'America/Bogota',
  })
  async cleanCursedTodos() {
    this.logger.log('🔄 Cron job executing: cleanCursedTodos');
    const result = await this.todosService.cleanCursedTodos();
    if (result) {
      this.sseService.emitCursedCleanupEvent({
        action: 'cursed-cleanup',
        timestamp: new Date().toISOString(),
        message: `🔮 ${result} cursed todos deleted`
      });
    }
  }
}
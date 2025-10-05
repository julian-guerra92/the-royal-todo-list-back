import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TodosService } from 'src/to-do/todos.service';
import { SseService } from './sse.service';
import { isPrime } from '../utils/validatePrimeNumber';
import { ActionsSseEvent } from './enum/actions-sse-event.enum';

@Injectable()
export class CronProcessService {
  private readonly logger = new Logger(CronProcessService.name);

  constructor(
    private readonly todosService: TodosService,
    private readonly sseService: SseService
  ) { }

  @Cron(CronExpression.EVERY_5_SECONDS, {
    name: 'cleanCursedTodos',
    timeZone: 'America/Bogota',
  })
  async cleanCursedTodos() {
    this.logger.log('🔄 Cron job executing: cleanCursedTodos');
    const result = await this.todosService.cleanCursedTodos();
    if (result) {
      this.sseService.emitCursedCleanupEvent({
        action: ActionsSseEvent.CURSED_CLEANUP,
        timestamp: new Date().toISOString(),
        message: `🔮 ${result} cursed todos deleted`
      });
    }
  }

  @Cron(CronExpression.EVERY_MINUTE, {
    name: 'greatReset',
    timeZone: 'America/Bogota',
  })
  async executeGreatReset() {
    const currentTime = new Date();
    const currentMinute = currentTime.getMinutes();
    const isMinutePrime = isPrime(currentMinute);

    this.logger.log(`👑 The Great Reset executing at minute ${currentMinute} ${isMinutePrime ? '(PRIME - with index refresh)' : '(regular)'}`);

    try {
      await this.todosService.removeAll(isMinutePrime);

      if (isMinutePrime) {
        this.sseService.emitGreatResetEvent({
          action: ActionsSseEvent.DELETE_ALL_TODOS_PRIME_NUMBER,
          timestamp: currentTime.toISOString(),
          message: `👑✨ Great Reset executed with index refresh - minute ${currentMinute} is prime`,
        });
      } else {
        // Minuto normal: eliminación simple
        this.sseService.emitGreatResetEvent({
          action: ActionsSseEvent.DELETE_ALL_TODOS,
          timestamp: currentTime.toISOString(),
          message: `👑 Great Reset executed - minute ${currentMinute}`,
        });
      }
    } catch (error) {
      this.logger.error('Error executing Great Reset', error.stack);
    }
  }
}
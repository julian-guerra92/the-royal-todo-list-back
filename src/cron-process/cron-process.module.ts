import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronProcessService } from './cron-process.service';
import { TodosModule } from 'src/todos/todos.module';
import { CronProcessController } from './cron-process.controller';
import { SseService } from './sse.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TodosModule
  ],
  controllers: [CronProcessController],
  providers: [
    CronProcessService,
    SseService,
  ],
  exports: [CronProcessService, SseService],
})
export class CronProcessModule {}
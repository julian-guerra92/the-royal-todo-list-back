import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TodosModule } from './to-do/todos.module';
import { CronProcessModule } from './cron-process/cron-process.module';

@Module({
  imports: [
    TodosModule, 
    CronProcessModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

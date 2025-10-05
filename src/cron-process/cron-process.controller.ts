import { Controller, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SseService } from './sse.service';
import { SseEvent } from './interfaces/sse-event.interface';

@Controller('cron-process')
export class CronProcessController {
  
  constructor(private readonly sseService: SseService) {}

  @Sse('cursed-cleanup')
  cursedCleanupEvents(): Observable<{ data: string }> {
    return this.sseService.getCursedCleanupStream().pipe(
      map((event: SseEvent) => {
        return {
          data: JSON.stringify(event)
        };
      })
    );
  }

  @Sse('great-reset')
  greatResetEvents(): Observable<{ data: string }> {
    return this.sseService.getGreatResetStream().pipe(
      map((event: SseEvent) => {
        return {
          data: JSON.stringify(event)
        };
      })
    );
  }
}

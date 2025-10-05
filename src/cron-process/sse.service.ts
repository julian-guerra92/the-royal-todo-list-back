import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { SseEvent } from './interfaces/sse-event.interface';

@Injectable()
export class SseService {
  private cursedCleanupSubject = new Subject<SseEvent>();
  private greatResetSubject = new Subject<SseEvent>();

  getCursedCleanupStream() {
    return this.cursedCleanupSubject.asObservable();
  }

  getGreatResetStream() {
    return this.greatResetSubject.asObservable();
  }

  emitCursedCleanupEvent(data: SseEvent) {
    this.cursedCleanupSubject.next(data);
  }

  emitGreatResetEvent(data: SseEvent) {
    this.greatResetSubject.next(data);
  }
}
import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { SseEvent } from './interfaces/sse-event.interface';

@Injectable()
export class SseService {
  private cursedCleanupSubject = new Subject<SseEvent>();

  getCursedCleanupStream() {
    return this.cursedCleanupSubject.asObservable();
  }

  emitCursedCleanupEvent(data: SseEvent) {
    this.cursedCleanupSubject.next(data);
  }
}
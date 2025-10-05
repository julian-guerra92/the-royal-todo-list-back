import { Controller, Get, Sse } from '@nestjs/common';
import { interval, map, Observable } from 'rxjs';
import { MessageEvent } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  // @Sse('events')
  // sendEvents(): Observable<MessageEvent> {
  //   // Ejemplo: emite un evento cada 5 segundos
  //   return interval(5000).pipe(
  //     map((count) => ({
  //       data: { message: `Evento ${count}` },
  //     })),
  //   );
  // }
}

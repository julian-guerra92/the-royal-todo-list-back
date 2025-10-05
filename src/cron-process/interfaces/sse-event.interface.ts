import { ActionsSseEvent } from "../enum/actions-sse-event.enum";

export interface SseEvent {
  action: ActionsSseEvent;
  timestamp?: string;
  message?: string;
}
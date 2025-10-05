export interface SseEvent {
  action: string;
  timestamp?: string;
  message?: string;
}
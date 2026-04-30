export interface INotificationService {
  warn(message: string, title?: string): Promise<void>;
  error(message: string, title?: string): Promise<void>;
  success(message: string, title?: string): Promise<void>;
  info(message: string, title?: string): Promise<void>;
}

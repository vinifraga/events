import { Notification } from '../entities/notification';

export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract findById(notificationId: string): Promise<Notification | null>;
  abstract save(notification: Notification): Promise<void>;
  abstract countManyByRecipient(recipientId: string): Promise<number>;
  abstract findManyByRecipient(recipientId: string): Promise<Notification[]>;
}

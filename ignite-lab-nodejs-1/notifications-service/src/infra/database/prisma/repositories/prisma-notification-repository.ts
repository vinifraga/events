import { Injectable } from '@nestjs/common';

import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async findManyByRecipient(recipientId: string): Promise<Notification[]> {
    const raw = await this.prismaService.notification.findMany({
      where: {
        recipientId,
      },
    });

    const notifications = raw.map(PrismaNotificationMapper.toDomain);

    return notifications;
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const raw = await this.prismaService.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!raw) {
      return null;
    }

    const notification = PrismaNotificationMapper.toDomain(raw);

    return notification;
  }

  async countManyByRecipient(recipientId: string): Promise<number> {
    const count = await this.prismaService.notification.count({
      where: {
        recipientId,
      },
    });

    return count;
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPersistance(notification);

    await this.prismaService.notification.create({
      data: raw,
    });
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPersistance(notification);

    await this.prismaService.notification.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }
}

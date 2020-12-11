import { ObjectId } from 'mongodb';

import InterfaceNotificationsRepository from '@modules/notifications/repositories/InterfaceNotificationsRepository';
import InterfaceCreateNotificationDTO from '@modules/notifications/dtos/InterfaceCreateNotificationDTO';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

export default class FakeNotificationsRepository
    implements InterfaceNotificationsRepository {
    private notifications: Notification[] = [];

    public async createAndSave({
        content,
        recipientId,
    }: InterfaceCreateNotificationDTO): Promise<Notification> {
        const notification = new Notification();

        Object.assign(notification, {
            id: new ObjectId(),
            content,
            recipientId,
        });

        this.notifications.push(notification);

        return notification;
    }
}

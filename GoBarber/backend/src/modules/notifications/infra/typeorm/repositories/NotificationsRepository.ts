import { getMongoRepository, MongoRepository } from 'typeorm';

import InterfaceNotificationsRepository from '@modules/notifications/repositories/InterfaceNotificationsRepository';
import InterfaceCreateNotificationDTO from '@modules/notifications/dtos/InterfaceCreateNotificationDTO';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

export default class NotificationsRepository
    implements InterfaceNotificationsRepository {
    private ormRepository: MongoRepository<Notification>;

    constructor() {
        this.ormRepository = getMongoRepository(Notification, 'mongo');
    }

    public async createAndSave({
        content,
        recipientId,
    }: InterfaceCreateNotificationDTO): Promise<Notification> {
        const notification = this.ormRepository.create({
            content,
            recipientId,
        });

        await this.ormRepository.save(notification);

        return notification;
    }
}

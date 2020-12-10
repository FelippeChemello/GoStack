import InterfaceCreateNotificationDTO from '@modules/notifications/dtos/InterfaceCreateNotificationDTO';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

export default interface InterfaceNotificationsRepository {
    createAndSave(data: InterfaceCreateNotificationDTO): Promise<Notification>;
}

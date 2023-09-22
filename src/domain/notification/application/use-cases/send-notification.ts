import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotificationRepository } from '../repositories/notification-repository'
import { Notification } from '../../enterprise/entities/notification'
import { right } from '@/core/either'

interface SendNotificationUseCaseRequest {
  recipientId: string
  title: string
  content: string
}

export class SendNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({
    recipientId,
    title,
    content,
  }: SendNotificationUseCaseRequest) {
    const notification = Notification.create({
      recipientId: new UniqueEntityID(recipientId),
      title,
      content,
    })

    await this.notificationRepository.create(notification)

    return right({ notification })
  }
}

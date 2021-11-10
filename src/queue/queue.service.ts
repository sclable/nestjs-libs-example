import { Inject, Injectable } from '@nestjs/common'
import { QUEUE_SERVICE, QueueMessage, QueueServiceContract } from '@sclable/nestjs-queue'

@Injectable()
export class QueueService {
  public constructor(
    @Inject(QUEUE_SERVICE)
    private readonly queueService: QueueServiceContract,
  ) {}

  public sendMessage<PayloadType>(queueName: string, payload: PayloadType): Promise<void> {
    return this.queueService.sendMessage<PayloadType>(queueName, payload)
  }

  public listen<PayloadType>(
    queueName: string,
    consumer: (msg: QueueMessage<PayloadType>) => Promise<void> | void,
  ): Promise<void> {
    return this.queueService.addConsumer<PayloadType>(queueName, consumer)
  }
}

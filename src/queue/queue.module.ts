import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  QueueModuleOptions,
  QueueType,
  QueueModule as SclableQueueModule,
} from '@sclable/nestjs-queue'

import { QueueController } from './queue.controller'
import { QueueService } from './queue.service'

@Module({
  imports: [
    SclableQueueModule.forRootAsync({
      useFactory: (config: ConfigService) =>
        config.get<QueueModuleOptions>('queue', {
          type: QueueType.DUMMY,
          config: {},
        }),
      inject: [ConfigService],
    }),
  ],
  providers: [QueueService],
  controllers: [QueueController],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class QueueModule {}

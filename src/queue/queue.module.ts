import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  QueueModule as SclableQueueModule,
  QueueModuleOptions,
  QueueType,
} from '@sclable/nestjs-queue';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';

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
export class QueueModule {}

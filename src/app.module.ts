import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StorageModule } from './storage/storage.module';
import { QueueModule } from './queue/queue.module';

import storage from '../config/storage';
import queue from '../config/queue';

@Module({
  imports: [
    StorageModule,
    ConfigModule.forRoot({ isGlobal: true, load: [storage, queue] }),
    QueueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

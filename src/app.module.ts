import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StorageModule } from './storage/storage.module';
import { QueueModule } from './queue/queue.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import auth from '../config/auth';
import storage from '../config/storage';
import queue from '../config/queue';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [auth, storage, queue] }),
    AuthModule,
    UserModule,
    StorageModule,
    QueueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

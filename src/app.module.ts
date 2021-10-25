import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import auth from '../config/auth'
import queue from '../config/queue'
import storage from '../config/storage'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { QueueModule } from './queue/queue.module'
import { StorageModule } from './storage/storage.module'
import { UserModule } from './user/user.module'

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
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppModule {}

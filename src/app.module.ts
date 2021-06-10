import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StorageModule } from './storage/storage.module';

import storage from '../config/storage';

@Module({
  imports: [
    StorageModule,
    ConfigModule.forRoot({ isGlobal: true, load: [storage] }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

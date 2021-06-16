import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import {
  StorageModule as SclableStorageModule,
  StorageModuleOptions,
  StorageType,
} from '@sclable/nestjs-storage';

@Module({
  imports: [
    SclableStorageModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        ...config.get<StorageModuleOptions>('storage', {
          defaultDriver: StorageType.DUMMY,
          config: {},
        }),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [StorageService],
  controllers: [StorageController],
})
export class StorageModule {}

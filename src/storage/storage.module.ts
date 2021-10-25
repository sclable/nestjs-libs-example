import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  StorageModule as SclableStorageModule,
  StorageModuleOptions,
  StorageType,
} from '@sclable/nestjs-storage'

import { StorageController } from './storage.controller'
import { StorageService } from './storage.service'

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
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class StorageModule {}

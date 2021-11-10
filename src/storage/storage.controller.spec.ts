import { ConfigModule, ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { StorageManager } from '@sclable/nestjs-storage'

import storage from '../../config/storage'
import { StorageController } from './storage.controller'
import { StorageModule } from './storage.module'

describe('StorageController', () => {
  const mockedStorageManager = {
    disk: jest.fn(),
  }
  const mockedConfig = {
    get: jest.fn(),
  }
  let controller: StorageController

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true, load: [storage] }), StorageModule],
    })
      .overrideProvider(ConfigService)
      .useValue(mockedConfig)
      .overrideProvider(StorageManager)
      .useValue(mockedStorageManager)
      .compile()

    controller = module.get(StorageController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})

import { ConfigModule, ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { StorageManager, StorageType } from '@sclable/nestjs-storage'

import storage from '../../config/storage'

import { StorageService } from './storage.service'
import { StorageModule } from './storage.module'

describe('StorageService', () => {
  const mockedStorageManager = {
    disk: jest.fn(),
  }
  const mockedConfig = {
    get: jest.fn(),
  }
  let service: StorageService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true, load: [storage] }), StorageModule],
    }).overrideProvider(ConfigService).useValue(mockedConfig)
      .overrideProvider(StorageManager).useValue(mockedStorageManager)
      .compile()

    service = module.get<StorageService>(StorageService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})

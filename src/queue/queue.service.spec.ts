import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { QUEUE_SERVICE } from '@sclable/nestjs-queue'

import queue from '../../config/queue'

import { QueueModule } from './queue.module'
import { QueueService } from './queue.service'

describe('QueueService', () => {
  const mockedQueueService = {
    addConsumer: jest.fn()
  }
  let service: QueueService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true, load: [queue] }), QueueModule],
    }).overrideProvider(QUEUE_SERVICE).useValue(mockedQueueService)
      .compile()

    service = module.get<QueueService>(QueueService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})

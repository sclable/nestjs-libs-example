import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { QUEUE_SERVICE } from '@sclable/nestjs-queue'

import queue from '../../config/queue'

import { QueueModule } from './queue.module'
import { QueueController } from './queue.controller'

describe('QueueService', () => {
  const mockedQueueService = {
    addConsumer: jest.fn()
  }
  let controller: QueueController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true, load: [queue] }), QueueModule],
    }).overrideProvider(QUEUE_SERVICE).useValue(mockedQueueService)
      .compile()

    controller = module.get<QueueController>(QueueController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})


import { INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Test as NestTest, TestingModule } from '@nestjs/testing'
import { QueueType } from '@sclable/nestjs-queue'
import { StorageType } from '@sclable/nestjs-storage'
import { SuperTest, Test } from 'supertest'

import { AppModule } from '../src/app.module'

describe('AppController (e2e)', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const supertest = require('supertest')
  const testConfig = {
    auth: {
      jwtSecret: 'test-secret',
      jwtExpiresIn: '1h',
    },
    queue: {
      type: QueueType.DUMMY,
      config: {
        [QueueType.DUMMY]: { enabled: true },
      },
    },
    storage: {
      defaultDriver: StorageType.DUMMY,
      config: {
        [StorageType.DUMMY]: { enabled: true },
      },
    },
  }
  const testConfigService = {
    get: (config: string) => testConfig[config],
  }
  let app: INestApplication
  let testRequest: SuperTest<Test>
  let token: string

  beforeAll(async () => {
    const moduleFixture: TestingModule = await NestTest.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ConfigService)
      .useValue(testConfigService)
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()
    testRequest = supertest(app.getHttpServer())

    const loginResponse = await testRequest
      .post('/auth/login')
      .send({ username: 'testuser', password: 'any' })
    token = loginResponse.body.accessToken
  })

  it('/ (GET)', () => {
    return testRequest
      .get('/')
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .expect('Hello World!')
  })
})

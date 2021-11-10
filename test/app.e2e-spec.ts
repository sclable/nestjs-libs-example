import { INestApplication } from '@nestjs/common'
import { Test as NestTest, TestingModule } from '@nestjs/testing'
import { SuperTest, Test } from 'supertest'

import { AppModule } from '../src/app.module'

describe('AppController (e2e)', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const supertest = require('supertest')
  let app: INestApplication
  let testRequest: SuperTest<Test>
  let token: string

  beforeAll(async () => {
    const moduleFixture: TestingModule = await NestTest.createTestingModule({
      imports: [AppModule],
    }).compile()

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

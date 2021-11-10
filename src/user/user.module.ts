import { Module } from '@nestjs/common'

import { UserService } from './user.service'

@Module({
  providers: [UserService],
  exports: [UserService],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class UserModule {}

import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthConfig, KeycloakAuthModule } from '@sclable/nestjs-auth'

import { UserModule } from '../user/user.module'
import { UserService } from '../user/user.service'

@Module({
  imports: [KeycloakAuthModule.forRootAsync({
    imports: [UserModule],
    inject: [ConfigService, UserService],
    useFactory: (config: ConfigService, userService: UserService) => ({
      config: config.get<AuthConfig>('auth', {}),
      userService,
    })
  })]
})
export class AuthModule {}

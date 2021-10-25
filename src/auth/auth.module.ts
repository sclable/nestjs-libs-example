import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import {
  AuthConfig,
  JwtGuard,
  // KeycloakAuthModule,
  // KeycloakGuard,
  LocalAuthModule,
  LocalGuard,
} from '@sclable/nestjs-auth';

import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    // KeycloakAuthModule.forRootAsync({
    //   imports: [UserModule],
    //   inject: [ConfigService, UserService],
    //   useFactory: (config: ConfigService, userService: UserService) => ({
    //     config: config.get<AuthConfig>('auth', {}),
    //     userService,
    //   }),
    // }),
    LocalAuthModule.forRootAsync({
      imports: [UserModule],
      inject: [ConfigService, UserService],
      useFactory: (config: ConfigService, userService: UserService) => ({
        config: config.get<AuthConfig>('auth', {}),
        userService,
      }),
    })
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
      // useClass: KeycloakGuard,
    },
    LocalGuard,
  ],
})
export class AuthModule {}

import { ApplicationUserContract, ResourceAccess } from '@sclable/nestjs-auth'

export class User implements ApplicationUserContract {
  public id: string
  public externalId?: string
  public email?: string
  public username?: string
  public firstName?: string
  public lastName?: string
  public resourceAccess?: ResourceAccess
}

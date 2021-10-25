import { AuthProviderUserContract } from '@sclable/nestjs-auth'

export interface ExternalUser extends AuthProviderUserContract {
  id: string
  externalId: string
}

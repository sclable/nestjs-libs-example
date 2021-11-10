import { registerAs } from '@nestjs/config'
import { AuthConfig } from '@sclable/nestjs-auth'

export default registerAs('auth', (): AuthConfig => ({
  loglevel: process.env.AUTH_LOGLEVEL || 'error',
  testEndpointEnabled: process.env.AUTH_TEST_ENDPOINT_ENABLED === 'true',
  jwtSecret: process.env.AUTH_JWT_SECRET,
  jwtExpiresIn: process.env.AUTH_JWT_EXPIRES_IN,
  providerUrl: process.env.AUTH_KEYCLOAK_URL,
  providerRealm: process.env.AUTH_KEYCLOAK_REALM,
  providerAdminUser: process.env.AUTH_KEYCLOAK_USER,
  providerAdminPassword: process.env.AUTH_KEYCLOAK_PASSWORD,
}))

import { Injectable } from '@nestjs/common'
import { UserServiceContract } from '@sclable/nestjs-auth'
import { v4 as uuidv4 } from 'uuid'

import { ExternalUser } from './external-user'
import { User } from './user.entity'

@Injectable()
export class UserService implements UserServiceContract<User> {
  private users: User[] = []

  constructor() {
    const user = new User()
    user.id = uuidv4()
    user.externalId = uuidv4()
    user.username = 'testuser'
    user.firstName = 'Test'
    user.lastName = 'User'
    this.users.push(user)
  }

  public getOneById(userId: string): User | Promise<User | null> | null {
    return this.users.find(user => user.id === userId) ?? null
  }
  public getOneByExternalId(externalId: string): User | Promise<User | null> | null {
    return this.users.find(user => user.externalId === externalId) ?? null
  }
  public getOneByUsernameAndPassword(
    username: string,
    _password: string,
  ): User | Promise<User | null> | null {
    let user = this.users.find(user => user.username === username)

    return user
  }
  public createFromExternalUserData(userData: ExternalUser): string | Promise<string> {
    const user = this.users.find(user => user.externalId === userData.externalId)
    if (!user) {
      const id = uuidv4()
      this.users.push({ id, ...userData })

      return id
    }

    return user.id
  }
  public updateFromExternalUserData(userData: ExternalUser): string | Promise<string> {
    const user = this.users.find(user => user.externalId === userData.externalId)
    if (!user) {
      return this.createFromExternalUserData(userData)
    }
    Object.assign(user, userData)

    return user.id
  }
}

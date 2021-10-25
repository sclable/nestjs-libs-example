import { Injectable } from '@nestjs/common';
import { UserServiceContract } from '@sclable/nestjs-auth';
import { v4 as uuidv4 } from 'uuid';

import { ExternalUser } from './external-user';
import { User } from './user.entity';

@Injectable()
export class UserService implements UserServiceContract<User> {
  private users: User[] = [];

  public getOneById(userId: string): User | Promise<User | null> | null {
    return this.users.find((u) => u.id === userId) ?? null;
  }
  public getOneByExternalId(
    externalId: string,
  ): User | Promise<User | null> | null {
    return this.users.find((u) => u.externalId === externalId) ?? null;
  }
  public getOneByUsernameAndPassword(
    username: string,
    password: string,
  ): User | Promise<User | null> | null {
    let user = this.users.find(u => u.username === username)
    if (!user) {
      user = new User();
      user.id = uuidv4();
      user.externalId = uuidv4();
      user.username = 'testuser';
      user.firstName = 'Test'
      user.lastName = 'User'
      this.users.push(user)
    }
    return user;
  }
  public createFromExternalUserData(
    userData: ExternalUser,
  ): string | Promise<string> {
    const user = this.users.find((u) => u.externalId === userData.externalId);
    if (!user) {
      const id = uuidv4();
      this.users.push({ id, ...userData });
      return id;
    }
    return user.id;
  }
  public updateFromExternalUserData(
    userData: ExternalUser,
  ): string | Promise<string> {
    const user = this.users.find((u) => u.externalId === userData.externalId);
    if (!user) {
      return this.createFromExternalUserData(userData);
    }
    Object.assign(user, userData);
    return user.id;
  }
}

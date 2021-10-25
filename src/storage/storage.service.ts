import { Inject, Injectable } from '@nestjs/common'
import { StorageManager, StorageType } from '@sclable/nestjs-storage'

@Injectable()
export class StorageService {
  public constructor(
    @Inject(StorageManager)
    private readonly storageManager: StorageManager,
  ) {}

  public async put(
    bucket: string,
    id: string,
    content: Buffer,
    disk: StorageType = undefined,
  ): Promise<string> {
    return this.storageManager.disk(disk).putObject(bucket, id, content)
  }

  public async get(
    bucket: string,
    id: string,
    disk: StorageType = undefined,
  ): Promise<Buffer> {
    return this.storageManager.disk(disk).getObject(bucket, id)
  }

  public async delete(
    bucket: string,
    id: string,
    disk: StorageType = undefined,
  ): Promise<boolean> {
    return this.storageManager.disk(disk).deleteObject(bucket, id)
  }
}

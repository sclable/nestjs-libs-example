import { Injectable, Inject } from '@nestjs/common';
import { StorageManager } from '@sclable/nestjs-storage';

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
  ): Promise<string> {
    return this.storageManager.disk().putObject(bucket, id, content);
  }

  public async get(bucket: string, id: string): Promise<Buffer> {
    return this.storageManager.disk().getObject(bucket, id);
  }
}

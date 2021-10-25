import { Controller, Delete, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Public } from '@sclable/nestjs-auth'
import { StorageService } from './storage.service';
import { Response } from 'express';

@Controller('storage')
export class StorageController {
  private readonly bucket = 'test';
  private readonly id = 'one';
  private readonly content = 'hello world';

  constructor(private readonly storageService: StorageService) {}

  @Post()
  public async create(@Res() res: Response): Promise<Response> {
    const result = await this.storageService.put(
      this.bucket,
      this.id,
      Buffer.from(this.content),
    );

    return res.status(HttpStatus.CREATED).json({
      status: 201,
      path: `${this.bucket}/${this.id}`,
      content: this.content,
      etag: result,
    });
  }

  @Public()
  @Get()
  public async read(@Res() res: Response): Promise<Response> {
    let status = HttpStatus.OK;
    let error = undefined;

    const content =
      (await this.storageService.get(this.bucket, this.id).catch((e) => {
        status = HttpStatus.NOT_FOUND;
        error = e;
      })) || '';

    return res.status(status).json({
      status: status,
      path: `${this.bucket}/${this.id}`,
      content: content.toString(),
      error,
    });
  }

  @Delete()
  public async delete(@Res() res: Response): Promise<Response> {
    const isFailed = await this.storageService.delete(this.bucket, this.id);

    return res.status(HttpStatus.OK).json({
      status: 200,
      path: `${this.bucket}/${this.id}`,
      success: !isFailed,
    });
  }
}

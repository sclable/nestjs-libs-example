import { Controller, Delete, Get, HttpStatus, Post, Res } from '@nestjs/common';
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
      path: `${this.bucket}/${result}`,
      content: this.content,
    });
  }

  @Get()
  public async read(@Res() res: Response): Promise<Response> {
    const content = await this.storageService.get(this.bucket, this.id);

    return res.status(HttpStatus.OK).json({
      status: 200,
      path: `${this.bucket}/${this.id}`,
      content: content.toString(),
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

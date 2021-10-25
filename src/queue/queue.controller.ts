import { Controller, Get, HttpStatus, Post, Res } from '@nestjs/common'
import { Response } from 'express'

import { QueueService } from './queue.service'

@Controller('queue')
export class QueueController {
  private readonly queueName = 'test-queue'
  private readonly testMessage = 'hello world'

  private _messages: string[] = []

  public constructor(private readonly queueService: QueueService) {
    this.queueService.listen<string>(this.queueName, message => {
      this._messages.push(message.getContent())

      message.ack()
    })
  }

  @Post()
  public async send(@Res() res: Response): Promise<Response> {
    await this.queueService.sendMessage<string>(this.queueName, this.testMessage)

    return res.status(HttpStatus.CREATED).json({
      status: 201,
      payload: this.testMessage,
    })
  }

  @Get()
  public async messages(@Res() res: Response): Promise<Response> {
    return res.status(HttpStatus.OK).json({
      status: 200,
      messages: this._messages,
    })
  }
}

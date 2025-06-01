import { Body, Controller, Get, HttpException, HttpStatus, Post, Query } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreateQueueHandler } from "./handlers/queue.handler";
import Queue, { QueueDashboard } from "./queue.entity";
import { AddItemToQueueHandler, AddItemToQueueRequest } from "./handlers/add-item-to-queue.handler";
import { CallNextQueueItemHandler, CallNextQueueItemHandlerRequest } from "./handlers/call-next-queue-item.handler";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@ApiTags('Queue')
@Controller('queue')
export class QueueController {

  constructor(
    private readonly createQueueHandler: CreateQueueHandler,
    private readonly addItemToQueueHandler: AddItemToQueueHandler,
    private readonly callNextQueueItemHandler: CallNextQueueItemHandler,
    @InjectRepository(Queue) private readonly repository: Repository<Queue>
  ) {}
  
  @Post()
  @ApiOperation({description: 'Creates a new queue'})
  async create(): Promise<Queue> {
    const handlerResult = await this.createQueueHandler.ExecuteAsync()

    if (handlerResult.HasError) {
        throw new HttpException(handlerResult.ErrorMessage, HttpStatus.INTERNAL_SERVER_ERROR); 
    } else {
        return handlerResult.Result
    }
  }


  @Post('add-item')
  @ApiOperation({description: 'Adds a new item to queue'})
  @ApiBody({
    type: AddItemToQueueRequest,
    examples: { 
      a: {
        value: {
          queue_id: "ABC-EDFG-HIJO9089098",
          clientIdentification: "Carla"
        } as AddItemToQueueRequest
      }
    }
  })
  async addItemToQueue(@Body() request: AddItemToQueueRequest): Promise<Queue> {
    const handlerResult = await this.addItemToQueueHandler.ExecuteAsync(request)

    if (handlerResult.HasError) {
        throw new HttpException(handlerResult.ErrorMessage, HttpStatus.INTERNAL_SERVER_ERROR); 
    } else {
        return handlerResult.Result
    }
  }

  @Post('call-next')
  @ApiOperation({description: 'Calls queue next item'})
  @ApiQuery({
    example: "1234-csdf-34",
    description: "queue_id"
  })
  async callNextQueueItem(@Query('queue_id') queue_id: string): Promise<Queue> {
    const handlerResult = await this.callNextQueueItemHandler.ExecuteAsync(new CallNextQueueItemHandlerRequest(queue_id))

    if (handlerResult.HasError) {
        throw new HttpException(handlerResult.ErrorMessage, HttpStatus.INTERNAL_SERVER_ERROR); 
    } else {
        return handlerResult.Result
    }
  }

  @Get('dashboard')
  @ApiOperation({description: 'Get Queue Dashboard'})
  @ApiQuery({
    example: "1234-csdf-34",
    description: "queue_id"
  })
  async getQueueDashboard(@Query('queue_id') queue_id: string): Promise<QueueDashboard> {
    const queue = await this.repository.findOne({
      where: {
          id: queue_id
      },
      relations: ['items'],
      order: {
          items: {
              position: "ASC"
          }
      }
  })

    if (!queue) {
        throw new HttpException("Not found", HttpStatus.NOT_FOUND); 
    } 

    const qd = QueueDashboard.create(queue)

    return qd
  }
}
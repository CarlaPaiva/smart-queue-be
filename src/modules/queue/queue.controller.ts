import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateQueueHandler } from "./handlers/queue.handler";
import Queue from "./queue.entity";
import { AddItemToQueueHandler, AddItemToQueueRequest } from "./handlers/add-item-to-queue.handler";

@ApiTags('Queue')
@Controller('queue')
export class QueueController {

  constructor(
    private readonly createQueueHandler: CreateQueueHandler,
    private readonly addItemToQueueHandler: AddItemToQueueHandler
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
}
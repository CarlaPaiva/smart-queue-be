import { Body, Controller, Post } from "@nestjs/common"
import QueueItem from "./queue-item.entity";
import { CreateQueueItemHandler, CreateQueueItemRequest } from "./Handlers/create-queue-item.handler";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('QueueItem')
@Controller('queue-item')
export class QueueItemController {

  constructor(
    private readonly handler: CreateQueueItemHandler
  ) {}

  @ApiBody({
    type: CreateQueueItemRequest,
    examples: {
      a: {
        value: {
          position: 1,
          clientIdentification: 'Carla'
        } as CreateQueueItemRequest
      }
    }
  })
  @ApiResponse({
    type: QueueItem,
    example: {} as QueueItem
  })
  @Post()
  async create(@Body() request: CreateQueueItemRequest): Promise<QueueItem> {
    const result = await this.handler.ExecuteAsync(request);

    return result.Result
  }
}
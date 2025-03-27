import { Body, Controller, Post } from "@nestjs/common"
import QueueItem from "./queue-item.entity";
import { CreateQueueItemHandler, CreateQueueItemRequest } from "./Handlers/create-queue-item.handler";


@Controller('queue-item')
export class QueueItemController {

  @Post()
  async create(@Body() request: CreateQueueItemRequest): Promise<QueueItem> {
    const handler = new CreateQueueItemHandler();
    const result = await handler.ExecuteAsync(request);

    return result.Result
  }
}
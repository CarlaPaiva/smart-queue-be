import { Module } from "@nestjs/common";
import QueueItem from "./queue-item.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CreateQueueItemHandler } from "./handlers/create-queue-item.handler";
import { QueueItemController } from "./queue-item.controller";
import Queue from "../queue/queue.entity";

@Module({
    imports: [TypeOrmModule.forFeature([QueueItem, Queue])],
    providers: [CreateQueueItemHandler],
    controllers: [QueueItemController]
  })
  export class QueueItemModule { }
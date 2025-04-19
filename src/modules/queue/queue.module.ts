import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Queue from "./queue.entity";
import { CreateQueueHandler } from "./handlers/queue.handler";
import { QueueController } from "./queue.controller";
import QueueItem from "../queue-item/queue-item.entity";
import { AddItemToQueueHandler } from "./handlers/add-item-to-queue.handler";

@Module({
    imports: [TypeOrmModule.forFeature([Queue, QueueItem])],
    providers: [CreateQueueHandler, AddItemToQueueHandler],
    controllers: [QueueController]
  })
  export class QueueModule { }
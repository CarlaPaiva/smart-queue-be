import { Module } from "@nestjs/common";
import QueueItem from "./queue-item.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CreateQueueItemHandler } from "./Handlers/create-queue-item.handler";
import { QueueItemController } from "./queue-item.controller";

@Module({
    imports: [TypeOrmModule.forFeature([QueueItem])],
    providers: [CreateQueueItemHandler],
    controllers: [QueueItemController]
  })
  export class QueueItemModule { }
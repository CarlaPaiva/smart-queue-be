import { Module } from "@nestjs/common";
import QueueItem from "./queue-item.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CreateQueueItemHandler } from "./Handlers/create-queue-item.handler";

@Module({
    imports: [TypeOrmModule.forFeature([QueueItem])],
    providers: [CreateQueueItemHandler],
    controllers: []
  })
  export class QueueItemModule { }
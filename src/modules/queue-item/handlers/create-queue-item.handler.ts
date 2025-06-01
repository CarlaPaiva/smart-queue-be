import { IHandlerAsync, IRequest, Result } from "src/shared/IHandler";
import QueueItem from "../queue-item.entity";
import { Injectable } from "@nestjs/common";
import {  Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

export class CreateQueueItemRequest implements IRequest {
    position: number;
    clientIdentification: string;
}

@Injectable()
export class CreateQueueItemHandler implements IHandlerAsync<QueueItem> {

    /**
     *
     */
    constructor(
        @InjectRepository(QueueItem) private readonly repository: Repository<QueueItem>
    ) {
    }

    async ExecuteAsync(_request: CreateQueueItemRequest): Promise<Result<QueueItem>> {
        const queueItem = QueueItem.create(_request.position, _request.clientIdentification);

        const savedItem = await this.repository.save(queueItem)

        const result = new Result<QueueItem>();


        if (savedItem != null) {
            result.SetError('Fail to save item.');
        } else {
            result.SetSuccess(queueItem);
        }

        return result;
    }

}
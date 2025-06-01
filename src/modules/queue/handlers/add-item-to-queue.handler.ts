import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IHandlerAsync, IRequest, Result } from "src/shared/IHandler";
import Queue from "../queue.entity";

export class AddItemToQueueRequest implements IRequest {
    queue_id: string;
    clientIdentification: string;
}

@Injectable()
export class AddItemToQueueHandler implements IHandlerAsync<Queue> {
    constructor(
        @InjectRepository(Queue) private readonly repository: Repository<Queue>
    ) { }

    async ExecuteAsync(request: AddItemToQueueRequest): Promise<Result<Queue>> {
        const res = new Result<Queue>();

        const queue = await this.repository.findOne({
            where: {
                id: request.queue_id
            },
            relations: ['items'],
            order: {
                items: {
                    position: "ASC"
                }
            }
        })

        if (!queue) {
            res.SetError('Queue not found.');
            return res;
        }

        const nextPosition = queue.getLastPosition() + 1

        queue.addItem(nextPosition, request.clientIdentification);

        const savedQ = await this.repository.save(queue)

        res.SetSuccess(savedQ);

        return res;
    }

}
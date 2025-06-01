import { IHandlerAsync, IRequest, Result } from "src/shared/IHandler";
import Queue from "../queue.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class CallNextQueueItemHandlerRequest implements IRequest {
    constructor(queueId: string) {
        this.queue_id = queueId
    }
    queue_id: string
}

@Injectable()
export class CallNextQueueItemHandler implements IHandlerAsync<Queue> {

    constructor(
        @InjectRepository(Queue) private readonly repository: Repository<Queue>
    ) {}

    async ExecuteAsync(request: CallNextQueueItemHandlerRequest): Promise<Result<Queue>> {
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
            res.SetError("Queue not found")

            return res
        }

        const result = queue?.callNext()

        if (result?.HasError) {
            res.SetError(result.ErrorMessage)

            return res
        }

        const savedQ = await this.repository.save(queue)

        res.SetSuccess(savedQ)

        return res
    }

}
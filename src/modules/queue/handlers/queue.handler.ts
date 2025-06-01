import { Injectable } from "@nestjs/common";
import Queue from "../queue.entity";
import { IHandlerAsync, Result } from "src/shared/IHandler";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CreateQueueHandler implements IHandlerAsync<Queue> {

    constructor(
        @InjectRepository(Queue) private readonly repository: Repository<Queue>
    ) {
    }

    async ExecuteAsync(): Promise<Result<Queue>> {
        const queue = Queue.create();

        const savedItem = await this.repository.save(queue)

        const result = new Result<Queue>();

        if (savedItem === null) {
            result.SetError('Fail to save item.');
        } else {
            result.SetSuccess(queue);
        }

        return result;
    }

}
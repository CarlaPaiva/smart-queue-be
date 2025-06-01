import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import QueueItem from "../queue-item/queue-item.entity";
import { ResultValidation } from "src/shared/IHandler";

@Entity('queue')
export default class Queue {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({name: 'creationdate'})
    creationDate: Date

    @Column({nullable: true, name: 'startdate'})
    startDate?: Date

    @Column({nullable: true, name: 'finishdate'})
    finishDate?: Date

    @OneToMany(() => QueueItem, (queueItem) => queueItem.queue, {
        cascade: true
    })
    items: QueueItem[]

    private constructor(_creationDate: Date) {
        this.creationDate = _creationDate
    }

    public static create() {
        return new Queue(new Date());
    }

    public getLastPosition(): number {
        if (!this.items) {
            return 0
        }

        return this.items[this.items.length - 1]?.position ?? 0
    }

    public callNext(): ResultValidation {
        const res = new ResultValidation

        if (!this.items || this.items.length < 1) {
            res.SetError('This queue has no items.')
            return res
        }

        let index = 0

        const actual = this.items.find(x => x.isActual)

        if (!actual) {
            index = 0
        } else {
            index = this.items.indexOf(actual)
            index++
        }

        if (this.items[index]) {
            // Call next item
            this.items[index].call()
        } else {
            res.SetError('End of queue.')
            return res
        }

        // Make last 'current' as not actual
        if (this.items[index - 1]) {
            this.items[index - 1].requeue()
        }

        return res
    }

    public addItem(position: number, identification: string) {
        const qItem = QueueItem.create(position, identification);

        if (!this.items) {
            this.items = [qItem]
        }

        this.items.push(qItem);
    }
}

export class QueueDashboard {
    id: string;

    Current: QueueItem | null

    CalledItems: QueueItem[]

    NextItems: QueueItem[]

    public static create(queue: Queue): QueueDashboard {
        const qtdMaxItems = 3

        const qd = new QueueDashboard()

        qd.id = queue.id

        qd.Current = queue.items.find(item => item.isActual  === true) ?? null

        qd.CalledItems = []
        qd.NextItems = []

        const position = queue.items.indexOf(qd.Current as unknown as QueueItem)

        if (position === 0) {
            return qd
        }

        let counter = 0
        for (let i = position; i < queue.items.length; i++) {
            const actual = queue.items[i]
            if (counter >= qtdMaxItems) {
                break
            }

            if (actual.id === qd.Current?.id) {
                continue
            }

            qd.NextItems.push(actual)
            counter++
        }

        counter = 0
        for (let j = position; j >= 0; j--) {
            const actual = queue.items[i]
            if (counter >= qtdMaxItems) {
                break
            }

            if (actual.id === qd.Current?.id) {
                continue
            }
            
            qd.CalledItems.push(queue.items[j])
            counter++
        }

        return qd
    }
}
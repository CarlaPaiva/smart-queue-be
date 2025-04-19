import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import QueueItem from "../queue-item/queue-item.entity";

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

    public static Create() {
        return new Queue(new Date());
    }

    public GetLastPosition(): number {
        if (!this.items) {
            return 0
        }

        return this.items[this.items.length - 1]?.position ?? 0
    }

    public AddItem(position: number, identification: string) {
        const qItem = QueueItem.Create(position, identification);

        if (!this.items) {
            this.items = [qItem]
        }

        this.items.push(qItem);
    }
}
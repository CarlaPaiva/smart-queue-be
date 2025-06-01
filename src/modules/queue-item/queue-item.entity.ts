import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Queue from "../queue/queue.entity";

@Entity("queueitem")
export default class QueueItem {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column('int')
    position: number;

    @Column({name: 'isactual'})
    isActual: boolean;

    @Column()
    identification: string;

    @Column({name: 'creationdate'})
    creationDate: Date

    @Column({nullable: true, name: 'ringdate'})
    ringDate?: Date

    @Column({nullable: true, name: 'startdate'})
    startDate?: Date

    @Column({nullable: true, name: 'finishdate'})
    finishDate?: Date

    @ManyToOne(() => Queue, (queue) => queue.items)
    @JoinColumn({name: 'queue_id'})
    queue: Queue

    /**
     * Constructor
     */
    private constructor(
        position: number,
        identification: string
    ) {
        this.position = position;
        this.identification = identification;
        this.creationDate = new Date();
        this.isActual = false;
    }

    /**
     * Call this position
     */
    public call() {
        this.isActual = true;
        this.ringDate = new Date();
    }

    /**
     * Put the item back to the queue
     */
    public requeue() {
        this.isActual = false
    }

    /**
     * Create a new query item
     * @param position Position for this new queue item
     * @param identification Client Identification
     * @returns new queue item
     */
    public static create(
        position: number,
        identification: string
    ) : QueueItem {
        return new QueueItem(position, identification);
    }
}
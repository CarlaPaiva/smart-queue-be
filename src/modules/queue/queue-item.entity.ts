import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("queueitem")
export default class QueueItem {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column('int')
    position: number;

    @Column()
    isActual: boolean;

    @Column()
    identification: string;

    @Column()
    creationDate: Date

    @Column({nullable: true})
    ringDate?: Date

    @Column({nullable: true})
    startDate?: Date

    @Column({nullable: true})
    finishDate?: Date

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
    public Call() {
        this.isActual = true;
        this.ringDate = new Date();
    }

    /**
     * Put the item back to the queue
     */
    public Requeue() {
        this.isActual = false
    }

    /**
     * Create a new query item
     * @param position Position for this new queue item
     * @param identification Client Identification
     * @returns new queue item
     */
    public static Create(
        position: number,
        identification: string
    ) : QueueItem {
        return new QueueItem(position, identification);
    }
}
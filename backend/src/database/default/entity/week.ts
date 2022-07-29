import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseTimestamp } from "./baseTimestamp";

@Entity()
export default class Week extends BaseTimestamp {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "date",
  })
  dateStart: string;

  @Column({
    type: "date",
  })
  dateEnd: string;

  @Column({
    type: "boolean",
  })
  isPublished: boolean;
}

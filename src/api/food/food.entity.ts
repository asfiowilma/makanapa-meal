import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { FoodResponse } from './food.dto'

@Entity()
export class FoodHistory {
  @PrimaryGeneratedColumn()
  public id!: number

  @CreateDateColumn()
  public date: Date

  @Column()
  public serving: number

  @Column()
  public idMeal: number

  @Column()
  public idUser: number
}

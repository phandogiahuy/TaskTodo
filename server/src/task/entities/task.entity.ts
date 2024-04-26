import { Priority } from 'src/enums/priority.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  priority: Priority;

  @Column({ default: false })
  status: boolean;

  @CreateDateColumn({
    type: 'date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;
}

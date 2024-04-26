import { CreateTaskDTO } from './create-task.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTaskDto extends PartialType(CreateTaskDTO) {}

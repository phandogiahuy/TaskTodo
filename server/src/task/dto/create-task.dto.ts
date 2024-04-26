import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Priority } from 'src/enums/priority.enum';

export class CreateTaskDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  priority: Priority;

  @IsOptional()
  @IsBoolean()
  status: boolean;
}

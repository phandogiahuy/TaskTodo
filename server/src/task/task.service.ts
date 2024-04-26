import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll(pagination: { pageSize: number; page: number }) {
    const { pageSize, page } = pagination;
    const totalTask = await this.taskRepository.count();
    const pageCount = Math.ceil(totalTask / pageSize);
    const task = await this.taskRepository.find({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return [
      task,
      {
        pagination: {
          total: totalTask,
          pageCount,
          pageSize: +pageSize,
          page: +page,
        },
      },
    ];
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOneBy({ id: id });
    if (!task) {
      throw new HttpException(`Task #${id} not found`, HttpStatus.NOT_FOUND);
    }
    return task;
  }

  async create(createTaskDto: CreateTaskDTO): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return await this.taskRepository.save(task);
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task | undefined> {
    const existingTask = await this.taskRepository.preload({
      id: +id,
      ...updateTaskDto,
    });
    if (!existingTask) {
      throw new HttpException(`Task #${id} not found`, HttpStatus.NOT_FOUND);
    }
    return await this.taskRepository.save(existingTask);
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.taskRepository.delete(id);
  }
}

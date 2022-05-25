import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {FindCondition, Repository, UpdateResult} from "typeorm";

@Injectable()
export class AppService {
  constructor(
      @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async create(data: any): Promise<User> {
    return this.userRepository.save(data);
  }

  async findOne(condition: any): Promise<User> {
    return this.userRepository.findOne(condition);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.createQueryBuilder('user')
        .select([
          'user.name',
          'user.tries',
          'user.current_streak',
          'user.max_streak',
          'user.1',
          'user.2',
          'user.3',
          'user.4',
          'user.5',
          'user.6',
        ])
        .getRawMany()
  }

  async update(id: number, data: any): Promise<UpdateResult> {
    return this.userRepository.update(id, data);
  }

  async increment(id: FindCondition<any>, property: string, value: number): Promise<UpdateResult> {
    return this.userRepository.increment(id, property, value);
  }
}

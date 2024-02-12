import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/modules/user/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(id: string) {
    return this.userRepository.getUserById(id);
  }
}

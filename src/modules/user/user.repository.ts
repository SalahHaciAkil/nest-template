import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  // constructor() {}
  private users = [
    {
      id: '1',
      name: 'John Doe',
      email: 'johm.doe@gmail.com',
    },

    {
      id: '2',
      name: 'Jane Doe',
      email: 'jane.doe@gmail.com',
    },

    {
      id: '3',
      name: 'Jim Doe',
      email: '',
    },
  ];

  getUsers() {
    return this.users;
  }

  getUserById(id: string) {
    return this.users.find((user) => user.id === id);
  }
}

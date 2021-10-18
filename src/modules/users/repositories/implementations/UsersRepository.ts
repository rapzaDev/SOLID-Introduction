import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const newUser = new User();

    Object.assign(newUser, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(newUser);

    return newUser;
  }

  findById(id: string): User | undefined {
    const userFindedById = this.users.find((user) => user.id === id);
    return userFindedById;
  }

  findByEmail(email: string): User | undefined {
    const userFindedById = this.users.find((user) => user.email === email);
    return userFindedById;
  }

  turnAdmin(receivedUser: User): User {
    const adminUser = receivedUser;

    const deleteUserIndex = this.users.findIndex(
      (user) => user.id === receivedUser.id
    );

    this.users.splice(deleteUserIndex, 1);

    adminUser.updated_at = new Date();
    adminUser.admin = true;

    this.users.push(adminUser);

    return adminUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };

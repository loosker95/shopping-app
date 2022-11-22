import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { hashPassword } from 'src/utils/hash/hashPassword';
import { BeforeInsert, EventSubscriber, Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import users from './entity/users.entity';


@Injectable()
@EventSubscriber()
export class UsersService {
  constructor(
    @InjectRepository(users)
    private usersRepository: Repository<users>,
  ) { }


  @BeforeInsert()
  async createUser(userData: CreateUserDto) {
    const hashPass = await hashPassword(userData.password);
    userData.password = hashPass;

    // const emailExist = await this.usersRepository.findOne({where: {email: userData.email}})
    // if (emailExist) throw new NotFoundException("An account with this emai already exist");

    const newUser = this.usersRepository.create(userData)
    await this.usersRepository.save(newUser);
    return newUser;

  }

  async getUsers() {
    const user = await this.usersRepository.find();
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  async getSingleUser(userID: string) {
    const user = await this.usersRepository.findOne({ where: { id: userID } })
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  async deleteSingleUser(userID: string) {
    const getUser = await this.usersRepository.findOne({ where: { id: userID } })
    if (!getUser) throw new NotFoundException("User not found");
    const user = await this.usersRepository.remove(getUser)
    return user
  }

}

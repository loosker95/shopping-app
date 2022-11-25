import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { hashPassword } from 'src/utils/hash/hashPassword';
import { BeforeInsert, EventSubscriber, Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/update-users.dto';
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

    const chekEmail = await this.isEmailExist(userData.email)
    if (chekEmail) throw new NotFoundException("Email already exist...");

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

  async updateSingleuser(id: string, userUpdate: UpdateUserDto) {
    if (userUpdate.email) { await this.isEmailExist(userUpdate.email) }

    const hashPass = await hashPassword(userUpdate.password);
    userUpdate.password = hashPass;
    await this.usersRepository.update(id, userUpdate)
    const getUser = await this.usersRepository.findOne({ where: { id: id } })

    if (!getUser) throw new NotFoundException("User not found");
    return getUser
  }

  async deleteSingleUser(userID: string) {
    const getUser = await this.usersRepository.findOne({ where: { id: userID } })
    if (!getUser) throw new NotFoundException("User not found");
    const user = await this.usersRepository.remove(getUser)
    return user
  }

  async registeruser(addRegisterUser: CreateUserDto) {
    const hashPass = await hashPassword(addRegisterUser.password);
    addRegisterUser.password = hashPass;

    const chekEmail = await this.isEmailExist(addRegisterUser.email)
    if (chekEmail) throw new NotFoundException("Email already exist...");

    const newUserRegister = this.usersRepository.create(addRegisterUser)
    await this.usersRepository.save(newUserRegister);
    return newUserRegister;
  }

  async isEmailExist(email: string) {
    const getEmail = await this.usersRepository.findOne({ where: { email: email } })
    return getEmail
  }

  async getUserId(email: string) {
    const getUserInfoId = await this.usersRepository.findOne({ where: { email: email } })
    return getUserInfoId
  }
}

import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from 'src/utils/enum/orderby,param';
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
    private readonly usersRepository: Repository<users>,
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

  async getUsers(
    page?: number,
    limit?: number
  ) {
    const pages = page
    const limits = limit
    const startIndex = (pages - 1) * limits
    const endIndex = pages * limits

    const user = await this.usersRepository.createQueryBuilder("users")
    .take(endIndex || 0)
    .skip(startIndex || 0)
    .leftJoinAndSelect("users.orders", "Order")
    .leftJoinAndSelect("users.reviews", "Reviews")
    .leftJoinAndSelect("users.Carts", "Carts")
    .orderBy('users.name', "ASC")
    .getMany()
    if (Object.keys(user).length == 0) throw new NotFoundException("User not found");
    return { user, page, limit }

  }

  async getSingleUser(userID: string) {
    const user = await this.usersRepository.createQueryBuilder("users")
    .leftJoinAndSelect("users.orders", "Order")
    .where("users.id= :userId", { userId: userID })
    .getOne()
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
    const chekEmail = await this.isEmailExist(email)
    if (!chekEmail) throw new NotFoundException("User not exist...");
    const getUserInfoId = await this.usersRepository.findOne({ where: { email: email } })
    return getUserInfoId
  }

  async getUserById(id: string) {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) throw new NotFoundException("User not found");
      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }



}

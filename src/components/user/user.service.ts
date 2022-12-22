import { NotFoundException, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { Permission } from "../permission/permission.entity";
import { CreateUserDto, UpdateUserDto } from "./dto/index";
import { SuccessResponse, ErrorResponse } from "src/core/BaseResponse/index";
import { STATUSCODE, MESSAGE, ERROR } from "src/core/constants";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>
  ) {}

  private readonly logger = new Logger(UserService.name);

  async getByUsername(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotFoundException("User with this email does not exist");
    }

    const permission = await this.permissionRepository.findOneBy({
      id: user.permissionId,
    });
    console.log({ ...user, permission });
    return { ...user, permission };
  }

  async getAll(): Promise<any> {
    try {
      const users = await this.userRepository.find({});

      return new SuccessResponse(
        STATUSCODE.COMMON_SUCCESS,
        users,
        MESSAGE.LIST_SUCCESS
      );
    } catch (error) {
      this.logger.debug(
        `${UserService.name} is Logging error: ${JSON.stringify(error)}`
      );
      return new ErrorResponse(
        STATUSCODE.COMMON_FAILED,
        error,
        MESSAGE.LIST_FAILED
      );
    }
  }

  async getOneById(id: number): Promise<any> {
    try {
      const user = await this.userRepository.findOneBy({ id });

      return new SuccessResponse(
        STATUSCODE.COMMON_SUCCESS,
        user,
        MESSAGE.LIST_SUCCESS
      );
    } catch (error) {
      this.logger.debug(
        `${UserService.name} is Logging error: ${JSON.stringify(error)}`
      );
      return new ErrorResponse(
        STATUSCODE.COMMON_NOT_FOUND,
        error,
        ERROR.NOT_FOUND
      );
    }
  }

  async create(userDto: CreateUserDto): Promise<any> {
    try {
      const createdUser = await this.userRepository.create(userDto);
      await this.userRepository.save(createdUser);

      return new SuccessResponse(
        STATUSCODE.COMMON_CREATE_SUCCESS,
        createdUser,
        MESSAGE.CREATE_SUCCESS
      );
    } catch (error) {
      this.logger.debug(
        `${UserService.name} is Logging error: ${JSON.stringify(error)}`
      );
      return new ErrorResponse(
        STATUSCODE.COMMON_FAILED,
        error,
        ERROR.CREATE_FAILED
      );
    }
  }

  // async update(
  //   id: number,
  //   userDto: UpdateUserDto,
  // ): Promise<any> {
  //   try {
  //     let foundUser = await this.userRepository.findOneBy({
  //       id
  //     });

  //     if (!foundUser) {
  //       throw new ErrorResponse(STATUSCODE.COMMON_NOT_FOUND, `User with id: ${id} not found!`, ERROR.NOT_FOUND);
  //     }

  //     foundUser = {
  //       ...foundUser,
  //       ...userDto,
  //       updatedAt: new Date(),
  //     };
  //     await this.userRepository.save(foundUser);

  //     return new SuccessResponse(STATUSCODE.COMMON_UPDATE_SUCCESS, foundUser, MESSAGE.UPDATE_SUCCESS);
  //   } catch (error) {

  //     this.logger.debug(`${UserService.name} is Logging error: ${JSON.stringify(error)}`);
  //     return new ErrorResponse(STATUSCODE.COMMON_FAILED, error, ERROR.UPDATE_FAILED);
  //   }
  // }

  async delete(id: number): Promise<any> {
    try {
      const foundUser = await this.userRepository.findOneBy({
        id,
      });

      if (!foundUser) {
        throw new ErrorResponse(
          STATUSCODE.COMMON_NOT_FOUND,
          `User with id: ${id} not found!`,
          ERROR.NOT_FOUND
        );
      }
      await this.userRepository.delete(id);

      return new SuccessResponse(
        STATUSCODE.COMMON_DELETE_SUCCESS,
        `User has deleted id: ${id} success!`,
        MESSAGE.DELETE_SUCCESS
      );
    } catch (error) {
      this.logger.debug(
        `${UserService.name} is Logging error: ${JSON.stringify(error)}`
      );
      return new ErrorResponse(
        STATUSCODE.COMMON_FAILED,
        error,
        ERROR.DELETE_FAILED
      );
    }
  }
}

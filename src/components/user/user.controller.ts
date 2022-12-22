import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  Patch,
} from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "./dto/index";
import { User } from "./user.entity";
import { UserService } from "../user/user.service";
import { Response, ErrorResponse } from "src/core/interfaces";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("/api/v1/user")
@ApiTags("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Post("create")
  @ApiOperation({
    description: "Create user",
  })
  @ApiOkResponse({
    type: Response<User>,
  })
  async create(@Body() userDto: CreateUserDto): Promise<any> {
    return this.userService.create(userDto);
  }

  @Get("all")
  @ApiOperation({
    description: "Get all user",
  })
  @ApiOkResponse({
    type: Response<User[]>,
  })
  async GetAll(): Promise<any> {
    return this.userService.getAll();
  }

  @Get(":id")
  @ApiOperation({
    description: "Get user by id",
  })
  @ApiOkResponse({
    type: Response<User>,
  })
  async GetOne(@Param("id", ParseIntPipe) id: number): Promise<any> {
    return this.userService.getOneById(id);
  }

  // @Patch(':id')
  // @ApiOperation({
  //   description: 'Update user',
  // })
  // @ApiOkResponse({
  //   type: Response<User>,
  // })
  // @UsePipes(ValidationPipe)
  // async update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() userDto: UpdateUserDto,
  // ): Promise<any> {
  //   return this.userService.update(id, userDto);
  // }

  @Delete(":id")
  @ApiOperation({
    description: "Delete user",
  })
  async delete(@Param("id") id: number): Promise<any> {
    return this.userService.delete(id);
  }
}

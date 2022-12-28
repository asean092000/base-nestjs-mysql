import { JwtAuthGuard } from './../auth/jwt-auth.guard';
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
  UseGuards
} from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "./dto/index";
import { User } from "./user.entity";
import { UserService } from "../user/user.service";
import { Response, ErrorResponse } from "src/system/interfaces";
import { ApiOkResponse, ApiOperation, ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserRoles } from './enums/user.enum';
@Controller("/api/v1/user")
@ApiTags("user")
@ApiBearerAuth("Authorization")
@UseGuards(JwtAuthGuard)
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
  @UseGuards(RolesGuard)
  @Roles( UserRoles.SUPPER, UserRoles.ADMIN)
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

  @Patch(':id')
  @ApiOperation({
    description: 'Update user',
  })
  @ApiOkResponse({
    type: Response<User>,
  })
  @UsePipes(ValidationPipe)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() userDto: UpdateUserDto,
  ): Promise<any> {
    return this.userService.update(id, userDto);
  }

  @Delete(":id")
  @ApiOperation({
    description: "Delete user",
  })
  async delete(@Param("id") id: number): Promise<any> {
    return this.userService.delete(id);
  }
}

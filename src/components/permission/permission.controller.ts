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
  UseGuards,
} from "@nestjs/common";
import { CreatePermissionDto, UpdatePermissionDto } from "./dto/index";
import { Permission } from "./permission.entity";
import { PermissionService } from "./permission.service";
import { Response, ErrorResponse } from "src/system/interfaces";
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
} from "@nestjs/swagger";
@Controller("/api/v1/permission")
@ApiTags("Permissions")
@ApiBearerAuth("Authorization")
@UseGuards(JwtAuthGuard)
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Post("create")
  @ApiOperation({
    description: "Create permission",
  })
  @ApiOkResponse({
    type: Response<Permission>,
  })
  async create(@Body() permissionDto: CreatePermissionDto): Promise<any> {
    return this.permissionService.create(permissionDto);
  }

  @Get("all")
  @ApiOperation({
    description: "Get all permission",
  })
  @ApiOkResponse({
    type: Response<Permission[]>,
  })
  async GetAll(): Promise<any> {
    return this.permissionService.getAll();
  }

  @Get(":id")
  @ApiOperation({
    description: "Get permission by id",
  })
  @ApiOkResponse({
    type: Response<Permission>,
  })
  async GetOne(@Param("id", ParseIntPipe) id: number): Promise<any> {
    return this.permissionService.getOneById(id);
  }

  @Patch(":id")
  @ApiOperation({
    description: "Update permission",
  })
  @ApiOkResponse({
    type: Response<Permission>,
  })
  @UsePipes(ValidationPipe)
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() permissionDto: UpdatePermissionDto
  ): Promise<any> {
    return this.permissionService.update(id, permissionDto);
  }

  @Delete(":id")
  @ApiOperation({
    description: "Delete permission",
  })
  async delete(@Param("id") id: number): Promise<any> {
    return this.permissionService.delete(id);
  }
}

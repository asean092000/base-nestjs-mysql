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
  Query
} from "@nestjs/common";
import { CreateExampleDto, UpdateExampleDto } from "./dto/index";
import { Example } from "./example.entity";
import { ExampleService } from "./example.service";
import { Response, ErrorResponse } from "src/system/interfaces";
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
  ApiQuery,
  ApiResponse
} from "@nestjs/swagger";
import { PaginationQueryDto } from "../common/dto";

@Controller("/api/v1/example")
@ApiTags("Examples")
@ApiBearerAuth("Authorization")
export class ExampleController {
  constructor(private exampleService: ExampleService) {}

  @Post("create")
  @ApiOperation({
    description: "Create example",
  })
  @ApiOkResponse({
    type: Response<Example>,
  })
  async create(@Body() exampleDto: CreateExampleDto): Promise<any> {
    return this.exampleService.create(exampleDto);
  }

  @Get("all")
  @ApiResponse({
      status: 2000,
      description: 'Get list example success'
  })
  @ApiQuery({
      name: 'take',
      type: 'number',
      description: 'enter take (Take is limit in sql) of record',
      required: true
  })
  @ApiQuery({
      name: 'skip',
      type: 'number',
      description: 'enter skip (Skip is offset in sql) of record',
      required: true
  })
  @ApiQuery({
    name: 'order',
    type: 'string',
    description: 'The ORDER BY keyword sorts the records in ascending order by default. To sort the records in descending order, use the DESC|ASC keyword',
    required: true
  })
  @ApiOperation({
    description: "Get all example",
  })
  @ApiOkResponse({
    type: Response<Example[]>,
  })
  async GetAll(@Query() paginationQueryDto: PaginationQueryDto): Promise<any> {
    return this.exampleService.getAll(paginationQueryDto);
  }

  @Get(":id")
  @ApiOperation({
    description: "Get example by id",
  })
  @ApiOkResponse({
    type: Response<Example>,
  })
  async GetOne(@Param("id", ParseIntPipe) id: number): Promise<any> {
    return this.exampleService.getOneById(id);
  }

  @Patch(":id")
  @ApiOperation({
    description: "Update example",
  })
  @ApiOkResponse({
    type: Response<Example>,
  })
  @UsePipes(ValidationPipe)
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() exampleDto: UpdateExampleDto
  ): Promise<any> {
    return this.exampleService.update(id, exampleDto);
  }

  @Delete(":id")
  @ApiOperation({
    description: "Delete example",
  })
  async delete(@Param("id") id: number): Promise<any> {
    return this.exampleService.delete(id);
  }
}

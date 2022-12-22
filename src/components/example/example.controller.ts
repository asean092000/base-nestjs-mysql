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
} from '@nestjs/common';
import { CreateExampleDto, UpdateExampleDto } from './dto/index';
import { Example } from './example.entity';
import { ExampleService } from './example.service';
import { Response,  ErrorResponse } from 'src/core/interfaces';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/api/v1/example')
@ApiTags('example')
export class ExampleController {
  constructor(private exampleService: ExampleService) {}

  @Post('create')
  @ApiOperation({
    description: 'Create example',
  })
  @ApiOkResponse({
    type: Response<Example>,
  })
  async create(
    @Body() exampleDto: CreateExampleDto,
  ): Promise<any> {
    return this.exampleService.create(exampleDto);
  }

  @Get('all')
  @ApiOperation({
    description: 'Get all example',
  })
  @ApiOkResponse({
    type: Response<Example[]>,
  })
  async GetAll(): Promise<any> {
    return this.exampleService.getAll();
  }

  @Get(':id')
  @ApiOperation({
    description: 'Get example by id',
  })
  @ApiOkResponse({
    type: Response<Example>,
  })
  async GetOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.exampleService.getOneById(id);
  }

  @Patch(':id')
  @ApiOperation({
    description: 'Update example',
  })
  @ApiOkResponse({
    type: Response<Example>,
  })
  @UsePipes(ValidationPipe)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() exampleDto: UpdateExampleDto,
  ): Promise<any> {
    return this.exampleService.update(id, exampleDto);
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Delete example',
  })
  async delete(@Param('id') id: number): Promise<any> {
    return this.exampleService.delete(id);
  }
}

import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateExampleDto, UpdateExampleDto } from "./dto/index";
import { Example } from "./example.entity";
import { SuccessResponse, ErrorResponse } from "src/system/BaseResponse/index";
import { STATUSCODE, MESSAGE, ERROR } from "src/system/constants";
import { PaginationQueryDto } from "../../common/dto";

@Injectable()
export class ExampleService {
  constructor(
    @InjectRepository(Example)
    private exampleRepository: Repository<Example>
  ) {}

  private readonly logger = new Logger(ExampleService.name);

  async getAll(paginationQueryDto: PaginationQueryDto): Promise<any> {
    const { take, skip, order } = paginationQueryDto;
    try {
      const examples = await this.exampleRepository.findAndCount({
        order: { id: order },
        take: take,
        skip: skip,
      });

      return new SuccessResponse(
        STATUSCODE.COMMON_SUCCESS,
        examples,
        MESSAGE.LIST_SUCCESS
      );
    } catch (error) {
      this.logger.debug(
        `${ExampleService.name} is Logging error: ${JSON.stringify(error)}`
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
      const example = await this.exampleRepository.findOneBy({ id });

      return new SuccessResponse(
        STATUSCODE.COMMON_SUCCESS,
        example,
        MESSAGE.LIST_SUCCESS
      );
    } catch (error) {
      this.logger.debug(
        `${ExampleService.name} is Logging error: ${JSON.stringify(error)}`
      );
      return new ErrorResponse(
        STATUSCODE.COMMON_NOT_FOUND,
        error,
        ERROR.NOT_FOUND
      );
    }
  }

  async create(exampleDto: CreateExampleDto): Promise<any> {
    try {
      const createdExample = await this.exampleRepository.create(exampleDto);
      await this.exampleRepository.save(createdExample);

      return new SuccessResponse(
        STATUSCODE.COMMON_CREATE_SUCCESS,
        createdExample,
        MESSAGE.CREATE_SUCCESS
      );
    } catch (error) {
      this.logger.debug(
        `${ExampleService.name} is Logging error: ${JSON.stringify(error)}`
      );
      return new ErrorResponse(
        STATUSCODE.COMMON_FAILED,
        error,
        ERROR.CREATE_FAILED
      );
    }
  }

  async update(id: number, exampleDto: UpdateExampleDto): Promise<any> {
    try {
      let foundExample = await this.exampleRepository.findOneBy({
        id,
      });

      if (!foundExample) {
        return new ErrorResponse(
          STATUSCODE.COMMON_NOT_FOUND,
          `Example with id: ${id} not found!`,
          ERROR.NOT_FOUND
        );
      }

      foundExample = {
        ...foundExample,
        ...exampleDto,
        updatedAt: new Date(),
      };
      await this.exampleRepository.save(foundExample);

      return new SuccessResponse(
        STATUSCODE.COMMON_UPDATE_SUCCESS,
        foundExample,
        MESSAGE.UPDATE_SUCCESS
      );
    } catch (error) {
      this.logger.debug(
        `${ExampleService.name} is Logging error: ${JSON.stringify(error)}`
      );
      return new ErrorResponse(
        STATUSCODE.COMMON_FAILED,
        error,
        ERROR.UPDATE_FAILED
      );
    }
  }

  async delete(id: number): Promise<any> {
    try {
      const foundExample = await this.exampleRepository.findOneBy({
        id,
      });

      if (!foundExample) {
        return new ErrorResponse(
          STATUSCODE.COMMON_NOT_FOUND,
          `Example with id: ${id} not found!`,
          ERROR.NOT_FOUND
        );
      }
      await this.exampleRepository.delete(id);

      return new SuccessResponse(
        STATUSCODE.COMMON_DELETE_SUCCESS,
        `Example has deleted id: ${id} success!`,
        MESSAGE.DELETE_SUCCESS
      );
    } catch (error) {
      this.logger.debug(
        `${ExampleService.name} is Logging error: ${JSON.stringify(error)}`
      );
      return new ErrorResponse(
        STATUSCODE.COMMON_FAILED,
        error,
        ERROR.DELETE_FAILED
      );
    }
  }
}

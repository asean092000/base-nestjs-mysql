import { ApiProperty } from '@nestjs/swagger';

export class Response<T> {
  @ApiProperty()
  data: T;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  constructor(data: T, statusCode: number, success: boolean, message: string) {
    this.data = data;
    this.statusCode = statusCode;
    this.success = success;
    this.message = message;
  }
}

export class ErrorResponse {
  @ApiProperty()
  data: null;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty()
  timestamp: Date;

  @ApiProperty()
  path: string;
}

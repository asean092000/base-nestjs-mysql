import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExampleDto {
  @IsNotEmpty()
  @IsNumber()
  @Max(9999)
  @Min(0)
  @ApiProperty()
  count: number;
}

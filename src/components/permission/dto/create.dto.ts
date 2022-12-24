import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePermissionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  role: string;
}

export default CreatePermissionDto;

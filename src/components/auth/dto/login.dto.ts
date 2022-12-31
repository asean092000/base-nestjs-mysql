import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({
    description: "username of the user",
    example: "super9999",
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: "Password in plain text",
    example: "super@9999ps",
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

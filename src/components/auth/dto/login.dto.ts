import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginDto {
  @ApiProperty({
    description: "username of the user",
    example: "super9999",
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: "Password in plain text",
    example: "super@9999ps",
  })
  @IsNotEmpty()
  password: string;
}

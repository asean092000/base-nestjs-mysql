import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches, Length } from "class-validator";
import { REGEX, MESSAGES } from "../../../core/config/app.utils";
export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  password: string;
}

export default CreateUserDto;

import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AdminService } from "./admin.service";
import { LoginDto } from "./dto/login.dto";
import { LocalAdminGuard } from "./local.stratery/local-Admin.guard";
import { JWTResult } from "src/system/interfaces";
import { Response } from "src/system/interfaces";

@ApiTags("Admin")
@Controller("Admin")
export class AdminController {
  constructor(private AdminService: AdminService) {}

  @Post("login")
  @UseGuards(LocalAdminGuard)
  @ApiOperation({
    description: "Login to the system",
  })
  @ApiOkResponse({
    type: Response<JWTResult>,
  })
  async login(@Request() req, @Body() loginDto: LoginDto): Promise<any> {
    return this.AdminService.generateToken(req.user);
  }

}

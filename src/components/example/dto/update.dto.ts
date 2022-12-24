import { PartialType } from "@nestjs/swagger";
import { CreateExampleDto } from "./index";

export class UpdateExampleDto extends PartialType(CreateExampleDto) {}

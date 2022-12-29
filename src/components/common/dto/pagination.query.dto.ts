import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';
import { Paging } from 'src/system/interfaces';
import { Order } from "src/system/constants/order";

export class PaginationQueryDto implements Paging {
    @IsOptional()
    @IsNumberString()
    @ApiProperty({ default: 10 })
    take: number;

    @IsOptional()
    @IsNumberString()
    @ApiProperty({ default: 0 })
    skip: number;

    @IsOptional()
    @IsString()
    @ApiProperty({ default: Order.DESC })
    order: Order;
}

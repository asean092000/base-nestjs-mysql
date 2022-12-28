import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';
import { Paging } from 'src/system/interfaces';

export class PaginationQueryDto implements Paging{
    @IsOptional()
    @IsNumberString()
    @ApiProperty({ default: 20 })
    limit: number;

    @IsOptional()
    @IsNumberString()
    @ApiProperty({ default: 0 })
    offset: number;
}

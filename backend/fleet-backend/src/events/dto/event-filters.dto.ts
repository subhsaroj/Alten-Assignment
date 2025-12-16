import { IsOptional, IsString, IsIn, IsDateString } from 'class-validator';

export class EventFiltersDto {
  @IsOptional()
  @IsString()
  vehicle?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsIn(['ERROR', 'WARN', 'INFO'])
  level?: string;

  @IsOptional()
  @IsDateString()
  from?: string;

  @IsOptional()
  @IsDateString()
  to?: string;
}

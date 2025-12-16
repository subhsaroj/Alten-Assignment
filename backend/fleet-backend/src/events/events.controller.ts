import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { EventFiltersDto } from './dto/event-filters.dto';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private service: EventsService) { }

 
  @Get()
  getEvents(
    @Query() filters: EventFiltersDto,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20
  ) {
    return this.service.getPaginatedEvents(filters, page, limit);
  }

 @Get('stats/errors-per-vehicle')
errorsPerVehicle() {
  return this.service.errorsPerVehicle();
}

@Get('stats/top-error-codes')
topErrorCodes() {
  return this.service.topErrorCodes();
}

}

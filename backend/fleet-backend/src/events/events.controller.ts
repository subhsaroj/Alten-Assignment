import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { EventFiltersDto } from './dto/event-filters.dto';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly service: EventsService) {}

 @Get()
getEvents(@Query() filters: EventFiltersDto) {
  return this.service.getPaginatedEvents(filters);
}

@Get('stats/critical-vehicles')
getCriticalVehicles() {
  return this.service.getCriticalVehicles();
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

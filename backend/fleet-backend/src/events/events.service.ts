import { Injectable } from '@nestjs/common';
import { EventsRepository } from './events.repository';
import { EventFiltersDto } from './dto/event-filters.dto';

@Injectable()
export class EventsService {
  constructor(private repo: EventsRepository) { }

  getEvents(filters: EventFiltersDto) {
    const all = this.repo.findAll();

    return all.filter((e) => {
      if (filters.vehicle && e.vehicleId !== filters.vehicle) return false;
      if (filters.code && e.code !== filters.code) return false;
      if (filters.level && e.level !== filters.level) return false;

      if (filters.from && new Date(e.timestamp) < new Date(filters.from))
        return false;

      if (filters.to && new Date(e.timestamp) > new Date(filters.to))
        return false;

      return true;
    });
  }
  getPaginatedEvents(filters: EventFiltersDto, page = 1, limit = 20) {
    const all = this.getEvents(filters); // reuse your existing filtering logic

    const total = all.length;
    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      page,
      limit,
      total,
      data: all.slice(start, end)
    };
  }

  errorsPerVehicle() {
  const all = this.repo.findAll();

  const counts = all.reduce((acc, ev) => {
    acc[ev.vehicleId] = (acc[ev.vehicleId] || 0) + 1;
    return acc;
  }, {});

  return counts;
}

  topErrorCodes() {
  const all = this.repo.findAll();

  const counts = all.reduce((acc, ev) => {
    acc[ev.code] = (acc[ev.code] || 0) + 1;
    return acc;
  }, {});

  // sort top 5 by frequency
  return (Object.entries(counts) as [string, number][])
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5)
  .map(([code, count]) => ({ code, count }))
}

}

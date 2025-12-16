import { Injectable } from '@nestjs/common';
import { EventsRepository } from './events.repository';
import { EventFiltersDto } from './dto/event-filters.dto';

@Injectable()
export class EventsService {
  constructor(private readonly repo: EventsRepository) {}


  getEvents(filters: EventFiltersDto) {
  let events = this.repo.findAll();

  if (filters.vehicle && filters.vehicle.trim() !== '') {
    const v = filters.vehicle.trim();
    events = events.filter(e => e.vehicleId === v);
  }

  if (filters.code && filters.code.trim() !== '') {
    const c = filters.code.trim();
    events = events.filter(e => e.code === c);
  }

  if (filters.level && filters.level.trim() !== '') {
    const l = filters.level.trim();
    events = events.filter(e => e.level === l);
  }

  if (filters.from && filters.from !== '') {
    const from = new Date(filters.from);
    events = events.filter(e => new Date(e.timestamp) >= from);
  }

  if (filters.to && filters.to !== '') {
    const to = new Date(filters.to);
    events = events.filter(e => new Date(e.timestamp) <= to);
  }

  return events;
}



  getPaginatedEvents(filters: EventFiltersDto) {
  let events = this.getEvents(filters); 

  const page = Number(filters.page) || 1;
  const limit = Number(filters.limit) || 20;

  const total = events.length;
  const start = (page - 1) * limit;
  const end = start + limit;


  return {
    data: events.slice(start, end),
    total,
    page,
    limit
  };
}



 
  errorsPerVehicle() {
    const all = this.repo.findAll();

    const counts: Record<string, number> = all.reduce((acc, ev) => {
      acc[ev.vehicleId] = (acc[ev.vehicleId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return counts;
  }

  
  topErrorCodes() {
    const all = this.repo.findAll();

    const counts: Record<string, number> = all.reduce((acc, ev) => {
      acc[ev.code] = (acc[ev.code] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return (Object.entries(counts) as [string, number][])
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([code, count]) => ({ code, count }));
  }
}

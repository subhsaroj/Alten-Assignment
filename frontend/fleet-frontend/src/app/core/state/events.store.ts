import { Injectable, signal, computed } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ApiService } from '../services/api.service';
import { EventFilters } from '../../models/diagnostic-event.model';
import { switchMap, shareReplay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventsStore {

 
  private filters = signal<EventFilters>({
    vehicle: '',
    code: '',
    level: '',
    from: '',
    to: ''
  });


  page = signal(1);
  limit = signal(20);

  constructor(private api: ApiService) {}


  events$ = toObservable(
    computed(() => ({
      filters: this.filters(),
      page: this.page(),
      limit: this.limit()
    }))
  ).pipe(
    switchMap(req =>
      this.api.getEvents({
        ...req.filters,
        page: req.page,
        limit: req.limit
      })
    ),
    shareReplay(1)
  );


  updateFilters(newFilters: Partial<EventFilters>) {
    this.filters.update(curr => ({
      ...curr,
      ...newFilters
    }));
    this.page.set(1); // reset to first page on filter change
  }


  setPage(page: number) {
    this.page.set(page);
  }

  setLimit(limit: number) {
    this.limit.set(limit);
  }
}

import { Injectable, signal, computed } from '@angular/core';
import { ApiService } from '../services/api.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsStore {

  constructor(private api: ApiService) {}

  // ------------------------------
  // FILTER SIGNAL
  // ------------------------------
  filters = signal({
    vehicle: '',
    code: '',
    level: '',
    from: '',
    to: '',
    page: 1,
    limit: 20
  });


  events = toSignal(
    toObservable(this.filters).pipe(
      switchMap((f) => this.api.getEvents(f))
    ),
    { initialValue: null }
  );

  paginatedData = computed(() => {
    const ev: any = this.events();
    return ev && ev['data'] ? ev['data'] : [];
  });

  total = computed(() => {
    const ev: any = this.events();
    return ev && ev['total'] ? ev['total'] : 0;
  });

  page = computed(() => this.filters().page);
  limit = computed(() => this.filters().limit);

 
  updateFilters(newFilters: any) {
  this.filters.update((curr) => ({
    ...curr,
    ...newFilters,
    page: 1
  }));
}


  setPage(page: number) {
    this.filters.update((curr) => ({
      ...curr,
      page
    }));
  }

  setLimit(limit: number) {
    this.filters.update((curr) => ({
      ...curr,
      limit,
      page: 1
    }));
  }
}

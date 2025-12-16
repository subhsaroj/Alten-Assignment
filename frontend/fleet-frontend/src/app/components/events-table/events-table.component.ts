import { Component, effect } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EventsStore } from '../../core/state/events.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events-table',
  standalone: true,
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.scss'],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    CommonModule
  ]
})
export class EventsTableComponent {

  displayedColumns = ['timestamp', 'vehicleId', 'level', 'code', 'message'];
  dataSource = new MatTableDataSource<any>([]);
  eventsResponse: any = null;

  constructor(public store: EventsStore) {

    // ✔ THIS RUNS INSIDE AN INJECTION CONTEXT
    effect(() => {
      const res = this.store.events();
      if (!res) return;

      this.eventsResponse = res;
      this.dataSource.data = res.data;
    });
  }

  onPageChange(event: PageEvent) {
    const newPage = event.pageIndex + 1;
    const newLimit = event.pageSize;

    this.store.setLimit(newLimit);
    this.store.setPage(newPage);
  }
}

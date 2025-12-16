import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MaterialModule } from '../../core/material.module';
import { NgFor, NgClass, CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-events-table',
  standalone: true,
  imports: [MaterialModule, CommonModule, NgClass,MatPaginatorModule],
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.scss']
})
export class EventsTableComponent {

  @Input() eventsResponse: any | null = null;

  @Output() pageChange = new EventEmitter<{ page: number; limit: number }>();

  get events() {
    return this.eventsResponse?.data ?? [];
  }

  onPageChange(event: PageEvent) {
    this.pageChange.emit({
      page: event.pageIndex + 1,
      limit: event.pageSize
    });
  }
}

import { Component } from '@angular/core';
import { EventsStore } from '../../core/state/events.store';
import { FilterPanelComponent } from '../../components/filter-panel/filter-panel.component';
import { EventsTableComponent } from '../../components/events-table/events-table.component';
import { SummaryViewComponent } from '../../components/summary-view/summary-view.component';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FilterPanelComponent, EventsTableComponent, SummaryViewComponent, AsyncPipe,MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(public store: EventsStore) {}
}

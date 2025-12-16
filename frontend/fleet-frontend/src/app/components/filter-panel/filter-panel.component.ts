import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventsStore } from '../../core/state/events.store';
import { MaterialModule } from '../../core/material.module';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [FormsModule, MaterialModule],
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent {

 
  vehicle: string = '';
  code: string = '';
  level: string = '';

  fromDate: Date | null = null;
  fromTime: string | null = null;

  toDate: Date | null = null;
  toTime: string | null = null;

  constructor(public store: EventsStore) {}


  setVehicle(e: Event) {
    this.vehicle = (e.target as HTMLInputElement).value;
  }

  setCode(e: Event) {
    this.code = (e.target as HTMLInputElement).value;
  }

  setLevel(level: string) {
    this.level = level;
  }

  onFromDateChange(event: MatDatepickerInputEvent<Date>) {
    this.fromDate = event.value;
  }

  onFromTimeChange(event: Event) {
    this.fromTime = (event.target as HTMLInputElement).value;
  }

  onToDateChange(event: MatDatepickerInputEvent<Date>) {
    this.toDate = event.value;
  }

  onToTimeChange(event: Event) {
    this.toTime = (event.target as HTMLInputElement).value;
  }

 

  applyFilter() {
    const filters: any = {
      vehicle: this.vehicle || '',
      code: this.code || '',
      level: this.level || ''
    };

    if (this.fromDate && this.fromTime) {
      filters.from = this.combineDateTime(this.fromDate, this.fromTime);
    }

    if (this.toDate && this.toTime) {
      filters.to = this.combineDateTime(this.toDate, this.toTime);
    }

    this.store.updateFilters(filters);
  }


  resetFilter() {
    this.vehicle = '';
    this.code = '';
    this.level = '';
    this.fromDate = null;
    this.fromTime = null;
    this.toDate = null;
    this.toTime = null;

    this.store.updateFilters({
      vehicle: '',
      code: '',
      level: '',
      from: '',
      to: ''
    });
  }

 
  combineDateTime(date: Date, time: string): string {
    const [h, m] = time.split(':').map(Number);

    const final = new Date(date);
    final.setHours(h, m, 0, 0);

    return final.toISOString();
  }
}

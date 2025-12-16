import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../core/material.module';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { Observable } from 'rxjs';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-summary-view',
  templateUrl: './summary-view.component.html',
  styleUrls: ['./summary-view.component.scss'],
  imports: [FormsModule, MaterialModule, MatCardModule, CommonModule, MatDivider,MatExpansionModule],
})
export class SummaryViewComponent implements OnInit {

  errorsPerVehicle$!: Observable<Record<string, number>>;
criticalVehicles$!: Observable<any>;
  topErrorCodes$!: Observable<{ code: string; count: number }[]>;
criticalDays = 180;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.errorsPerVehicle$ = this.api.getErrorsPerVehicle();
    this.topErrorCodes$ = this.api.getTopErrorCodes();
    this.criticalVehicles$ = this.api.getCriticalVehicles(this.criticalDays);
  }




loadCritical() {
  this.criticalVehicles$ = this.api.getCriticalVehicles(this.criticalDays);
}
}

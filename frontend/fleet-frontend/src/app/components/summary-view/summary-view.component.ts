import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../core/material.module';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-summary-view',
  templateUrl: './summary-view.component.html',
  styleUrls: ['./summary-view.component.scss'],
  imports: [FormsModule, MaterialModule, MatCardModule, CommonModule, MatDivider],
})
export class SummaryViewComponent implements OnInit {

  errorsPerVehicle$!: Observable<Record<string, number>>;
  topErrorCodes$!: Observable<{ code: string; count: number }[]>;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.errorsPerVehicle$ = this.api.getErrorsPerVehicle();
    this.topErrorCodes$ = this.api.getTopErrorCodes();
  }

}

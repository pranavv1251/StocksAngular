import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import { FirstService } from '../../services/first.service';
import * as Highcharts from 'highcharts';



@Component({
  selector: 'app-historical',
  standalone: true,
  imports: [CommonModule, RouterLink, HighchartsChartModule,],
  templateUrl: './historical.component.html',
  styleUrl: './historical.component.css',
})
export class HistoricalComponent {
  constructor(public service: FirstService) {}
}

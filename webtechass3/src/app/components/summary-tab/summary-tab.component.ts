import { Component, ElementRef } from '@angular/core';
import { FirstService } from '../../services/first.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-summary-tab',
  standalone: true,
  imports: [CommonModule, RouterLink, HighchartsChartModule],
  templateUrl: './summary-tab.component.html',
  styleUrl: './summary-tab.component.css',
})
export class SummaryTabComponent {
  constructor(public service: FirstService) {}
  addTicker(newSearch: string) {
    // var newSearch = (<HTMLInputElement>document.getElementById('newSearch'))
    //   .value;
    // this.demo2 = [];
    // this.quote = [];
    this.service.hourlyData = [];
    this.service.mainSpin = true;
    this.service.addTicker(newSearch);
    this.service.getQuote(newSearch);
    this.service.getPeers(newSearch);
    this.service.getHourlyData(newSearch);
  }
}

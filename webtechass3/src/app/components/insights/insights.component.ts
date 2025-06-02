import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FirstService } from '../../services/first.service';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  templateUrl: './insights.component.html',
  styleUrl: './insights.component.css',
})
export class InsightsComponent {
  breakpoint: number = 0;
  angles: any = [];
  constructor(public service: FirstService) {}
  ngOnInit() {
    this.service.angles =
      window.innerWidth <= 400 ? [-45, -45, -45, -45] : [0, 0, 0, 0];
  }
  onResize(event: any) {
    this.service.angles =
      window.innerWidth <= 400 ? [-45, -45, -45, -45] : [0, 0, 0, 0];
  }
}

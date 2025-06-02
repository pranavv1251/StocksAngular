import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirstService } from '../../services/first.service';
import { MatTabsModule } from '@angular/material/tabs';
import { SummaryTabComponent } from '../summary-tab/summary-tab.component';
import { TopNewsTabComponent } from '../top-news-tab/top-news-tab.component';
import { HistoricalComponent } from '../historical/historical.component';
import { InsightsComponent } from '../insights/insights.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FooterComponent } from '../footer/footer.component';
import { Subject } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { NgbAlert, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-ticker',
  standalone: true,
  templateUrl: './ticker.component.html',
  styleUrl: './ticker.component.css',
  imports: [
    CommonModule,
    MatTabsModule,
    SummaryTabComponent,
    TopNewsTabComponent,
    HistoricalComponent,
    MatProgressSpinnerModule,
    InsightsComponent,
    FooterComponent,
    NgbAlertModule,
  ],
})
export class TickerComponent {
  public userId!: string;
  private _message$ = new Subject<string>();
  @ViewChild('favAlert', { static: true }) alert!: ElementRef;

  // @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;

  @Input() inputFromParent: string = '';
  successMessage = '';

  constructor(route: ActivatedRoute, public service: FirstService) {
    
  }

  // alertTime() {
  //   setTimeout(() => {
  //     this.closeAlert();
  //   }, 6000);
  // }

  // closeAlert() {
  //   this.service.buyAlert = false;
  //   this.service.sellAlert = false;
  //   this.service.favAlert = false;
  // }
}

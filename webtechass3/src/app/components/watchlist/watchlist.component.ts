import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { FirstService } from '../../services/first.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css',
  imports: [
    FooterComponent,
    HeaderComponent,
    CommonModule,
    MatCardModule,
    MatIconModule,
    RouterLink,
    MatProgressSpinnerModule,
    NgbAlertModule,
  ],
})
export class WatchlistComponent {
  constructor(public service: FirstService, private router: Router) {
    service.watchBool = false;
    service.watchSpin = true;
    service.watchlistItems = [];
    service.getWatchlist();
  }

  getTicker(ticker: string) {
    console.log(ticker);
    this.service.addTicker(ticker);
    this.service.getQuote(ticker);
    this.service.getPeers(ticker);
    this.service.getNewsData(ticker);
    this.service.getHistorical(ticker);
    this.service.getInsider(ticker);
    this.service.getRecommendation(ticker);
    this.service.getEarnings(ticker);
    this.service.getWatchlist();
    this.router.navigate(['/search/' + ticker]);
    this.service.reactivateItems();
  }
  close(alert: any) {}
}

import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { FirstService } from '../../services/first.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    CommonModule,
    MatCardModule,
    MatIconModule,
    RouterLink,
    MatProgressSpinnerModule,
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
})
export class PortfolioComponent {
  constructor(public service: FirstService, private router: Router) {
    service.portBool = false;
    service.portSpin = true;
    service.portfolioItems = [];
    service.getPortfolio();
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
    this.service.mainSpin = true;
  }

  ngOnInit() {
    // this.service.getPortfolio();
    this.service.getPortfolioRight();
  }
}

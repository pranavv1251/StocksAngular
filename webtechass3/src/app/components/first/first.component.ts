import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MatAutocompleteModule,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { TickerComponent } from '../ticker/ticker.component';
import { FirstService } from '../../services/first.service';
import { RedirectService } from '../../services/redirect.service';
import { Subscription, interval } from 'rxjs';

import { DOCUMENT } from '@angular/common';
import { DatePipe } from '@angular/common';

import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-first',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    CommonModule,
    RouterLink,
    FooterComponent,
    HeaderComponent,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    TickerComponent,
    HttpClientModule,
  ],
  templateUrl: './first.component.html',
  styleUrl: './first.component.css',
})
export class FirstComponent implements OnInit {
  title = 'Assignment3';
  @ViewChild(MatAutocompleteTrigger) autocomplete!: MatAutocompleteTrigger;

  demo: any = [];

  demo2: any = [];

  quote: any = [];

  options: any = [];

  stock: string = '/search/';

  isLoading: boolean;

  forChild: string = '';

  isOn: boolean;

  starIcon: string = '';

  showAuto: boolean = true;

  constructor(
    public service: FirstService,
    private router: Router,
    private route: ActivatedRoute,
    private router2: RedirectService,
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.isLoading = false;
    this.options = [];
    this.isOn = true;
  }

  ngOnInit() {
    // this.service.getMon();
  }
  addTicker() {
    this.service.mainSpin = true;
    var newSearch = (<HTMLInputElement>document.getElementById('newSearch'))
      .value;
    this.isOn = true;

    // this.demo2 = [];
    // this.quote = [];
    this.service.getPeers(newSearch);
    this.service.addTicker(newSearch);
    this.service.getQuote(newSearch);
    this.service.getNewsData(newSearch);
    this.service.getHistorical(newSearch);
    this.service.getInsider(newSearch);
    this.service.getRecommendation(newSearch);
    this.service.getEarnings(newSearch);
    this.service.getWatchlist();

    // this.mySubscription = Subscription.EMPTY;
    // this.mySubscription = interval(15000).subscribe((x) => {
    //   this.updateTicker();
    // });
  }

  submit(e: any) {
    e.preventDefault();
    this.autocomplete.closePanel();
  }

  clearSearch() {
    this.isOn = false;
    (<HTMLInputElement>document.getElementById('newSearch')).value = '';
    this.service.isOn = false;
    this.router.navigate(['/search/home']);
    this.service.options = [];
    this.service.mainTicker = '';
    this.service.showalert = false;
    this.service.favAlert = false;
    // this.forChild = '';
  }

  async autoSearch(searchText: string) {
    // this.isLoading = true;
    // this.options = [];
    var x = (<HTMLInputElement>document.getElementById('newSearch')).value;
    this.service.autoSearch(searchText);
  }
  // updateTicker() {
  //   if (this.isOn) {
  //     var newSearch = (<HTMLInputElement>document.getElementById('newSearch'))
  //       .value;
  //     // this.demo2 = [];]
  //     console.log(newSearch);
  //     this.service.getQuote(newSearch);
  //   }

  // this.service.addTicker(newSearch).subscribe((data) => {
  //   this.stock = '/search/';
  //   this.demo2.push(data);
  //   this.stock += this.demo2[0].ticker;
  //   this.starIcon = 'bi bi-star';
  //   console.log(this.demo2);
  //   // this.forChild = this.demo2[0].ticker;
  // });
}

//   this.stock = '/search/';
//   this.demo2.push(data);
//   this.stock += this.demo2[0].ticker;
//   this.starIcon = 'bi bi-star';
//   console.log(this.demo2);
//   // this.forChild = this.demo2[0].ticker;
//   // this.mySubscription = interval(2000).subscribe((x) => {
//   //   this.updateTicker();
//   // });

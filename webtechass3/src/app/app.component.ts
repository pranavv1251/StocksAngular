import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FirstService } from './services/first.service';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TickerComponent } from './components/ticker/ticker.component';
import { RedirectService } from './services/redirect.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [FirstService],
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
  ],
})
export class AppComponent {
  constructor(public service: FirstService) {
    service.getWatchlist();
    service.getPortfolio();
  }
  // title = 'Assignment3';

  // demo: any = [];

  // demo2: any = [];

  // options: any = [];

  // stock: string = '/search/';

  // isLoading: boolean;

  // forChild: string = '';

  // constructor(
  //   private service: FirstService,
  //   private router: Router,
  //   private route: ActivatedRoute,
  //   private router2: RedirectService,
  // ) {
  //   this.isLoading = false;
  //   this.options= [];
  // }

  ngOnInit() {

    this.service.getMoney('25000.00');
  }

  // // getDatafromAPI() {
  // //   this.service.readNotes().subscribe((response) => {
  // //     this.demo.push(response);
  // //     // console.log('Data from Node',this.demo)
  // //   });
  // // }

  // addTicker() {
  //   var newSearch = (<HTMLInputElement>document.getElementById('newSearch'))
  //     .value;
  //   this.demo2 = [];
  //   this.service.addTicker(newSearch).subscribe((data) => {
  //     this.stock = '/search/';
  //     this.demo2.push(data);
  //     this.stock += this.demo2[0].ticker;
  //     // console.log(this.stock);
  //     // this.forChild = this.demo2[0].ticker;
  //     this.router.navigate([this.stock]);
  //   });
  // }

  // clearSearch() {
  //   (<HTMLInputElement>document.getElementById('newSearch')).value = '';
  //   this.router.navigate(['/search/home']);
  //   // this.forChild = '';
  // }

  // autoSearch(searchText: string) {
  //   this.isLoading = true;
  //   this.options = [];
  //   var x = (<HTMLInputElement>document.getElementById('newSearch')).value;
  //   this.service.getSymbols(x).subscribe((data) => {
  //     console.log('hello', data);
  //     this.options = data;
  //     const filteredData = this.options.filter(
  //       (cat: any) => cat.symbol.toLowerCase().indexOf('.') == -1
  //     );
  //     console.log('new', filteredData);
  //     this.isLoading = false;
  //     this.options = filteredData;
  //   });
  // }
}

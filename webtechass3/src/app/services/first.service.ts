import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ElementRef,
  Inject,
  Injectable,
  LOCALE_ID,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  Observable,
  Subject,
  Subscription,
  concatMap,
  filter,
  interval,
  switchMap,
} from 'rxjs';
import { formatDate } from '@angular/common';
import IndicatorsAll from 'highcharts/indicators/indicators-all';
import * as Highcharts from 'highcharts/highstock';
import * as High from 'highcharts';

// import IndicatorsCore from "highcharts/indicators/indicators";
// import IndicatorZigzag from "highcharts/indicators/zigzag";
// IndicatorsCore(Highcharts);

import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogComponent } from '../components/dialog/dialog.component';
import { BuydialogComponent } from '../components/buydialog/buydialog.component';
import { resolve } from 'path';
import { SelldialogComponent } from '../components/selldialog/selldialog.component';

@Injectable({
  providedIn: 'root',
})
export class FirstService {
  readonly APIURL = 'https://webtechass3-pranav1251g.wm.r.appspot.com/';

  mainTicker: string = '';

  demo: any = [];

  demo2: any = [];

  quote: any = [];

  options: any = [];

  stock: string = '/search/';

  isLoading: boolean = false;
  hourlyData: any = [];

  forChild: string = '';
  isOn: boolean = false;
  ipoDate: string = '';

  starIcon: string = '';
  mySubscription: Subscription = Subscription.EMPTY;
  currentDate: any;
  peers: any = [];
  marketOpen: boolean = true;
  quoteTime: any;
  Highcharts: typeof Highcharts = Highcharts;
  High: typeof High = High;
  chartOptions: any;
  mspr: any = [];
  Inchange: any = [];
  totalMspr: number = 0;
  totalChange: number = 0;
  positiveMspr: number = 0;
  negativeMspr: number = 0;
  positiveChange: number = 0;
  negativeChange: number = 0;
  recommendChart: any;
  earningsChart: any;
  stockPrice: string = '';
  stockChange: string = '';
  stockChangeP: string = '';
  stockName: string = '';
  money: number = 25000;
  buyingTotal: number = 0;
  private searchTextSubject = new Subject<string>();

  watchlistItems: any = [];
  portfolioItems: any = [];
  isFavorite: boolean = false;
  isBought: boolean = false;
  watchBool: boolean = false;
  portBool: boolean = false;
  buyAlert: boolean = false;
  sellAlert: boolean = false;
  watchSpin: boolean = false;
  portSpin: boolean = false;
  showalert: boolean = false;
  mainSpin: boolean = false;
  favAlert: boolean = false;
  arrowIcon: string = '';
  marketTime: string = '';
  highP: string = '';
  lowP: string = '';
  openP: string = '';
  closeP: string = '';
  once: number = 1;
  portBAlert: boolean = false;
  removeFav: boolean = false;
  portSAlert: boolean = false;
  angles: any = [0, 0, 0, 0];

  chartOptions1: Highcharts.Options = {
    series: [
      {
        type: 'candlestick',
        name: 'aapl',
        id: 'aapl',
        zIndex: 2,
        data: [],
      },
      {
        type: 'column',
        name: 'Volume',
        id: 'volume',
        data: [],
        yAxis: 1,
      },
      {
        type: 'vbp',
        linkedTo: 'aapl',
        params: {
          volumeSeriesID: 'volume',
        },
        dataLabels: {
          enabled: false,
        },
        zoneLines: {
          enabled: false,
        },
      },
      {
        type: 'sma',
        linkedTo: 'aapl',
        zIndex: 1,
        marker: {
          enabled: false,
        },
      },
    ],
  };

  newsData: any = [];
  historicalData: any = [];
  volData: any = [];

  // Highcharts1: typeof stockss = stockss;
  // chartOptions1: any;
  ngOnInit() {
    this.buyAlert = false;
    this.sellAlert = false;
    this.favAlert = false;
  }
  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(LOCALE_ID) private locale: string,
    public dialog: MatDialog,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.isLoading = false;
    this.options = [];
    this.isOn = false;
    this.currentDate = new Date();
    this.buyingTotal = 0;
    this.setupSearchSubscription();

    // IndicatorsAll(Highcharts);
    // IndicatorsAll(stockss);
  }

  // demo2: any = [];

  readNotes() {
    return this.http.get(this.APIURL);
  }

  addTicker(ticker: string) {
    // this.getHourlyData(ticker);
    // this.isFavorite = true;
    for (var i = 0; i < this.watchlistItems.length; i++) {
      if (
        this.watchlistItems[i]['ticker'].toUpperCase() == ticker.toUpperCase()
      ) {
        this.isFavorite = true;
        break;
      }
    }
    this.mainTicker = ticker.toUpperCase();
    this.demo2 = [];
    this.quote = [];
    this.once = 1;
    this.buyAlert = false;
    this.sellAlert = false;
    this.favAlert = false;
    IndicatorsAll(Highcharts);
    this.getWatchlist();
    // (<HTMLInputElement>document.getElementById('newSearch')).value = ticker;

    this.http
      .get<any>('https://webtechass3-pranav1251g.wm.r.appspot.com/search', {
        params: {
          newSearch: ticker,
        },
      })
      .subscribe((response) => {
        this.stock = '/search/';
        this.demo2.push(response);
        this.stock += this.demo2[0].ticker;
        this.stockName = this.demo2[0].name;
        this.starIcon = !this.isFavorite ? 'bi bi-star' : 'bi bi-star-fill';
        // this.getMoney(this.money);
        if (this.stockName !== undefined) {
          this.router.navigate([this.stock]);
        } else {
          this.showalert = true;
          this.mainSpin = false;
        }
        this.ipoDate = formatDate(this.demo2[0].ipo, 'yyyy-MM-dd', this.locale);

        this.isBought = false;
        // console.log(this.mainTicker, 'hello');
        this.getPortfolio();
      });

    // formData.append('newSearch', ticker);
  }

  getQuote(ticker: string) {
    this.currentDate = new Date();
    this.mySubscription.unsubscribe();
    this.quote = [];
    this.currentDate = new Date();
    this.http
      .get<any>('https://webtechass3-pranav1251g.wm.r.appspot.com/quote', {
        params: {
          newSearch: ticker,
        },
      })
      .subscribe((response) => {
        // console.log(response);

        // this.quote = [];
        // this.quote.push(response);
        this.quote.splice(1, 1, response);

        const current = Date.now();

        // console.log(current, formatDate(current, 'yyyy-MM-dd hh:mm:ss', this.locale));
        // console.log(response['t'] * 1000, formatDate(response['t'] * 1000, 'yyyy-MM-dd hh:mm:ss', this.locale));

        // console.log((current - response['t'] * 1000) / 1000);
        this.quoteTime = response['t'] * 1000;

        this.stockPrice = response['c'];
        this.stockChange = response['d'];
        this.stockChangeP = response['dp'];
        this.highP = response['h'];
        this.lowP = response['l'];
        this.openP = response['o'];
        this.closeP = response['pc'];

        if (Number(this.stockChange) >= 0) {
          this.arrowIcon = 'bi bi-caret-up-fill';
        } else {
          this.arrowIcon = 'bi bi-caret-down-fill';
        }

        if ((current - response['t'] * 1000) / 1000 > 300) {
          this.marketOpen = false;
          if (this.once == 1) {
            this.getHourlyData(ticker);
            this.once++;
          }
          this.mySubscription.unsubscribe();
          this.marketTime =
            'Market Closed ' +
            formatDate(
              response['t'] * 1000,
              'yyyy-MM-dd hh:mm:ss',
              this.locale
            );
        } else {
          console.log('hasjsdla');
          if (this.once == 1) {
            this.getHourlyData(ticker);
            this.once++;
          }
          this.marketTime = 'Market is Open ';
          // +
          // formatDate(
          //   response['t'] * 1000,
          //   'yyyy-MM-dd hh:mm:ss',
          //   this.locale
          // );
        }

        if (this.marketOpen) {
          this.mySubscription = Subscription.EMPTY;
          this.mySubscription = interval(15000).subscribe((x) => {
            this.getQuote(ticker);
          });
        }
      });
    // var formData = new FormData();
    // formData.append('newSearch', ticker);
    // return this.http.post('https://webtechass3-pranav1251g.wm.r.appspot.com/quote', formData);
  }

  async autoSearch(searchText: string) {
    this.options = [];
    this.isLoading = true;
    this.searchTextSubject.next(searchText);
  }

  private getSymbols(searchText: string): Observable<any[]> {
    return this.http
      .get<any>('https://webtechass3-pranav1251g.wm.r.appspot.com/autocomp', {
        params: {
          autoText: searchText,
        },
      })
      .pipe(
        switchMap((response) => {
          return this.filterSymbols(response);
        })
      );
  }

  private setupSearchSubscription() {
    this.searchTextSubject
      .pipe(
        filter((searchText) => !!searchText), // Only proceed if searchText is not empty
        switchMap((searchText) => this.getSymbols(searchText))
      )
      .subscribe(
        (filteredData) => {
          this.options = [];
          this.isLoading = false;
          this.options = filteredData;
        },
        (error) => {
          console.error('HTTP request error:', error);
          this.isLoading = false;
        }
      );
  }

  private filterSymbols(response: any): Observable<any[]> {
    return new Observable((observer) => {
      const filteredData = response.filter(
        (cat: any) =>
          cat.symbol.toLowerCase().indexOf('.') == -1 &&
          cat.type == 'Common Stock'
      );
      observer.next(filteredData);
      observer.complete();
    });
  }

  // getSymbols(x: string) {
  //   this.isLoading = true;

  //   this.options = [];
  //   this.http
  //     .get<any>('https://webtechass3-pranav1251g.wm.r.appspot.com/autocomp', {
  //       params: {
  //         autoText: x,
  //       },
  //     })
  //     .pipe(
  //       switchMap((response) => {
  //         const filteredData = response.filter(
  //           (cat: any) =>
  //             cat.symbol.toLowerCase().indexOf('.') == -1 &&
  //             cat.type == 'Common Stock'
  //         );
  //         console.log(filteredData);
  //         this.isLoading = false;
  //         this.options = filteredData;

  //         return new Observable();
  //       })
  //     )
  //     .subscribe();
  // }

  getPeers(ticker: string) {
    this.http
      .get<any>('https://webtechass3-pranav1251g.wm.r.appspot.com/peers', {
        params: {
          ticker: ticker,
        },
      })
      .subscribe((response) => {
        this.peers = [];
        this.peers = response;
        const filteredData = this.peers.filter(
          (cat: any) => cat.toLowerCase().indexOf('.') == -1
        );
        this.peers = filteredData;
        // console.log(this.peers);
        this.isOn = true;

        this.mainSpin = false;
      });
  }

  getHourlyData(ticker: string) {
    this.currentDate = new Date();
    this.hourlyData = [];
    if (this.marketOpen) {
      console.log('hiiiii');
      this.http
        .get<any>(
          'https://webtechass3-pranav1251g.wm.r.appspot.com/hourlyChart',
          {
            params: {
              ticker: ticker,
              from: formatDate(
                this.currentDate - 86400000,
                'yyyy-MM-dd',
                this.locale
              ),
              to: formatDate(this.currentDate, 'yyyy-MM-dd', this.locale),
            },
          }
        )
        .subscribe((response) => {
          // console.log(response);
          this.hourlyData = [];
          var temp: any = [];
          for (var i = 0; i < response.length; i++) {
            temp = [];

            temp.push(response[i]['t'] - 7 * 60 * 60 * 1000);

            // );
            temp.push(response[i]['c']);
            // console.log(temp);
            this.hourlyData.push(temp);
          }
          // console.log(this.hourlyData);
          this.makeCharts(ticker, this.hourlyData);
        });
    } else {
      this.http
        .get<any>(
          'https://webtechass3-pranav1251g.wm.r.appspot.com/hourlyChart',
          {
            params: {
              ticker: ticker,
              from: formatDate(
                this.quoteTime - 86400000,
                'yyyy-MM-dd',
                this.locale
              ),
              to: formatDate(this.quoteTime, 'yyyy-MM-dd', this.locale),
            },
          }
        )
        .subscribe((response) => {
          // console.log(response);
          this.hourlyData = [];
          var temp: any = [];
          for (var i = 0; i < response.length; i++) {
            temp = [];
            temp.push(response[i]['t'] - 7 * 60 * 60 * 1000);
            temp.push(response[i]['c']);
            // console.log(temp);
            this.hourlyData.push(temp);
          }
          // console.log(this.hourlyData);
          this.makeCharts(ticker, this.hourlyData);
        });
    }
  }

  alertTime() {
    setTimeout(() => {
      this.closeAlert();
    }, 4500);
  }

  closeAlert() {
    this.buyAlert = false;
    this.sellAlert = false;
    this.favAlert = false;
    this.portBAlert = false;
    this.portSAlert = false;
    this.removeFav = false;
  }

  makeCharts(ticker: string, hourlyData: any = []) {
    this.chartOptions = {
      title: {
        text: ticker.toUpperCase() + ' Hourly Price Variation',
        style: {
          color: '#848484',
          font: '14px',
        },
      },
      chart: {
        backgroundColor: '#ebebeb',
      },
      legend: { enabled: false },
      yAxis: {
        gridLineColor: 'rgba(197,195,195,0.3)',
        gridLineWidth: 2,
        opposite: true,
        title: '',
        labels: {
          align: 'left',
          x: 0,
          y: -2,
        },
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          day: '%H %M', //ex- 01 Jan 2016
        },
      },
      series: [
        {
          data: hourlyData,
          name: 'Stock Price',
          // data: [
          //   [1, 1],
          //   [2, 3],
          //   [3, 10],
          // ],
          marker: {
            enabled: false,
          },
          color: Number(this.stockChange) >= 0 ? '#31a531' : '#FF0000',
        },
      ],
    };
  }

  getNewsData(ticker: string) {
    this.currentDate = new Date();
    this.newsData = [];
    // console.log(
    //   formatDate(this.currentDate - 604800000, 'yyyy-MM-dd', this.locale)
    // );

    // console.log(formatDate(this.currentDate, 'yyyy-MM-dd', this.locale));
    this.http
      .get<any>('https://webtechass3-pranav1251g.wm.r.appspot.com/newsData', {
        params: {
          ticker: ticker,
          from: formatDate(
            this.currentDate - 1209600000,
            'yyyy-MM-dd',
            this.locale
          ),
          to: formatDate(this.currentDate, 'yyyy-MM-dd', this.locale),
        },
      })
      .subscribe((response) => {
        // console.log(response);
        const filteredData = response.filter(
          (cat: any) => cat.image != '' && cat.headline != ''
        );
        this.newsData = filteredData.slice(0, 20);
        // console.log(this.newsData);
      });
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    p: any
  ): void {
    p['datetime'] = formatDate(p['datetime'] * 1000, 'MMMM dd, Y', this.locale);
    this.dialog.open(DialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      width: '350px',
      position: { top: '8px' },
      data: p,
    });
    // console.log(p);
  }

  getHistorical(ticker: string) {
    this.currentDate = new Date();
    this.historicalData = [];
    this.volData = [];
    // console.log(
    //   formatDate(this.currentDate - 63286704000, 'yyyy-MM-dd', this.locale)
    // );

    // console.log(formatDate(this.currentDate, 'yyyy-MM-dd', this.locale));
    this.http
      .get<any>('https://webtechass3-pranav1251g.wm.r.appspot.com/historical', {
        params: {
          ticker: ticker,
          from: formatDate(
            this.currentDate - 63286704000,
            'yyyy-MM-dd',
            this.locale
          ),
          to: formatDate(this.currentDate, 'yyyy-MM-dd', this.locale),
        },
      })
      .subscribe((response) => {
        // console.log(response);
        var temp: any = [];
        for (var i = 0; i < response.length; i++) {
          temp = [];
          temp.push(response[i]['t']);
          temp.push(response[i]['o']);
          temp.push(response[i]['h']);
          temp.push(response[i]['l']);
          temp.push(response[i]['c']);
          // console.log(temp);
          this.historicalData.push(temp);
          temp = [];
          temp.push(response[i]['t']);
          temp.push(response[i]['v']);
          this.volData.push(temp);
        }
        this.makeHistorical(ticker);
        // console.log(this.volData);
      });
  }

  makeHistorical(ticker: string) {
    // console.log(this.historicalData);
    ticker = ticker.toUpperCase();
    //   this.stockchart = new StockChart({
    //     rangeSelector: {
    //       selected: 1
    //     },
    //     title: {
    //       text: 'AAPL Stock Price'
    //     },
    //     series: [
    //       {
    //         type: 'candlestick',
    //         name: ticker,
    //         id: ticker,
    //         zIndex: 2,
    //         data: this.historicalData,
    //       },
    //       {
    //         type: 'column',
    //         name: 'Volume',
    //         id: 'volume',
    //         data: this.volData,
    //         yAxis: 1,
    //       },
    //       // {
    //       //   type: 'vbp',
    //       //   linkedTo: ticker,
    //       //   params: {
    //       //     volumeSeriesID: 'volume',
    //       //   },
    //       //   dataLabels: {
    //       //     enabled: false,
    //       //   },
    //       //   zoneLines: {
    //       //     enabled: false,
    //       //   },
    //       // },
    //       // {
    //       //   type: 'sma',
    //       //   linkedTo: ticker,
    //       //   zIndex: 1,
    //       //   marker: {
    //       //     enabled: false,
    //       //   },
    //       // },
    //     ],
    //   });
    // }
    this.chartOptions1 = {
      rangeSelector: {
        selected: 2,
      },
      title: {
        text: ticker.toUpperCase() + ' Historical',
        style: {
          color: '#848484',
          font: '14px',
        },
      },
      chart: {
        backgroundColor: '#ebebeb',
      },
      subtitle: {
        text: 'With SMA and Volume by Price technical indicators',
      },
      legend: { enabled: false },

      yAxis: [
        {
          startOnTick: false,
          endOnTick: false,
          labels: {
            align: 'right',
            x: -3,
          },
          title: {
            text: 'OHLC',
          },
          height: '60%',
          lineWidth: 2,
          resize: {
            enabled: true,
          },
        },
        {
          labels: {
            align: 'right',
            x: -3,
          },
          title: {
            text: 'Volume',
          },
          top: '65%',
          height: '35%',
          offset: 0,
          lineWidth: 2,
        },
      ],
      tooltip: {
        split: true,
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          day: '%H %M',
        },
      },
      plotOptions: {
        series: {
          dataGrouping: {
            // units: [
            //   // ['week', [1]],
            //   ['month', [1, 2, 3, 4, 6]],
            // ],
          },
        },
      },
      series: [
        {
          type: 'candlestick',
          name: ticker,
          id: 'aapl',
          zIndex: 2,
          data: this.historicalData,
        },
        {
          type: 'column',
          name: 'Volume',
          id: 'volume',
          data: this.volData,
          yAxis: 1,
        },
        {
          type: 'vbp',
          linkedTo: 'aapl',
          params: {
            volumeSeriesID: 'volume',
          },
          dataLabels: {
            enabled: false,
          },
          zoneLines: {
            enabled: false,
          },
        },
        {
          type: 'sma',
          linkedTo: 'aapl',
          zIndex: 1,
          marker: {
            enabled: false,
          },
        },
      ],
    };
  }

  getInsider(ticker: string) {
    this.http
      .get<any>('https://webtechass3-pranav1251g.wm.r.appspot.com/insider', {
        params: {
          ticker: ticker,
        },
      })
      .subscribe((response) => {
        // console.log(response);
        // for (var i = 0; i < response.length; i++) {
        //   this.mspr.push(response[i]['mspr']);
        //   this.Inchange.push(response[i]['change']);
        // }
        // console.log(this.Inchange);
        this.totalMspr = response.reduce(
          (acc: any, curr: any) => acc + curr.mspr,
          0
        );
        this.totalChange = response.reduce(
          (acc: any, curr: any) => acc + curr.change,
          0
        );
        this.positiveMspr = response
          .filter((item: any) => item.mspr >= 0)
          .reduce((acc: any, curr: any) => acc + curr.mspr, 0);

        this.positiveChange = response
          .filter((item: any) => item.change >= 0)
          .reduce((acc: any, curr: any) => acc + curr.change, 0);

        this.negativeMspr = response
          .filter((item: any) => item.mspr < 0)
          .reduce((acc: any, curr: any) => acc + curr.mspr, 0);

        this.negativeChange = response
          .filter((item: any) => item.change < 0)
          .reduce((acc: any, curr: any) => acc + curr.change, 0);
      });
  }

  getRecommendation(ticker: string) {
    this.http
      .get<any>('https://webtechass3-pranav1251g.wm.r.appspot.com/recommend', {
        params: {
          ticker: ticker,
        },
      })
      .subscribe((response) => {
        // console.log(response);
        // console.log(
        //   response.map(function (a: any, b: any) {
        //     return a.period;
        //   })
        // );
        this.recommendChart = {
          chart: {
            type: 'column',
          },
          title: {
            text: 'Recommendation Trends',
          },
          xAxis: {
            categories: response.map(function (a: any, b: any) {
              return a.period;
            }),
            labels: {
              style: {
                fontSize: '12px',
              },
            },
          },
          yAxis: {
            min: 0,
            title: {
              text: '# Analysis',
            },
            stackLabels: {
              enabled: false,
            },
          },
          legend: {
            enabled: true,
          },
          tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat:
              '{series.name}: {point.y}<br/>Total: {point.stackTotal}',
          },
          plotOptions: {
            column: {
              stacking: 'normal',
              dataLabels: {
                enabled: true,
              },
            },
          },

          series: [
            {
              name: 'Strong Buy',
              data: response.map(function (a: any, b: any) {
                return a.strongBuy;
              }),
              color: '#075a36',
            },
            {
              name: 'Buy',
              data: response.map(function (a: any, b: any) {
                return a.buy;
              }),
              color: '#09c41b',
            },
            {
              name: 'Hold',
              data: response.map(function (a: any, b: any) {
                return a.hold;
              }),
              color: '#b49f09',
            },
            {
              name: 'Sell',
              data: response.map(function (a: any, b: any) {
                return a.sell;
              }),
              color: '#e23a0f',
            },
            {
              name: 'Strong Sell',
              data: response.map(function (a: any, b: any) {
                return a.strongSell;
              }),
              color: '#851c01',
            },
          ],
        };
      });
  }

  getEarnings(ticker: string) {
    this.http
      .get<any>('https://webtechass3-pranav1251g.wm.r.appspot.com/earnings', {
        params: {
          ticker: ticker,
        },
      })
      .subscribe((response) => {
        // console.log(response);
        response = response.map((item: any) => {
          item.actual = item.actual == null ? 0 : item.actual;
          return item;
        });
        response = response.map((item: any) => {
          item.estimate = item.estimate == null ? 0 : item.estimate;
          return item;
        });
        response = response.map((item: any) => {
          item.surprise = item.surprise == null ? 0 : item.surprise;
          return item;
        });
        response = response.map((item: any) => {
          item.surprisePercent =
            item.surprisePercent == null ? 0 : item.surprisePercent;
          return item;
        });
        this.earningsChart = {
          chart: {
            type: 'spline',
          },
          title: {
            text: 'Historical EPS Surprises',
          },
          xAxis: {
            categories: response.map(function (a: any, b: any) {
              return a.period + '<br> Surprise: ' + a.surprise + '<br>';
            }),
            labels: {
              style: {
                fontSize: '12px',
              },
            },
          },
          yAxis: {
            title: {
              text: 'Quarterly EPS',
            },
          },
          legend: {
            enabled: true,
          },
          // tooltip: {
          //   headerFormat: '<b>{point.x}</b><br/>',
          //   pointFormat:
          //     '{series.name}: {point.y}<br/>Total: {point.stackTotal}',
          // },
          // plotOptions: {
          //   column: {
          //     stacking: 'normal',
          //     dataLabels: {
          //       enabled: true,
          //     },
          //   },
          // },

          series: [
            {
              data: response.map(function (a: any, b: any) {
                return a.actual;
              }),
              color: '#4c9df9',
              name: 'Actual',
            },
            {
              data: response.map(function (a: any, b: any) {
                return a.estimate;
              }),
              color: '#5d4bb4',
              name: 'Estimate',
            },
          ],
        };
      });
  }

  addWatchlist(ticker: any) {
    this.http
      .get<any>('https://webtechass3-pranav1251g.wm.r.appspot.com/watchlist', {
        params: {
          ticker: ticker,
          name: this.stockName,
          price: '',
          stockChange: '',
          changePercent: '',
        },
      })
      .subscribe((response) => {
        // console.log('hello', response);
        this.watchlistItems = response;
        this.isFavorite = true;
        this.starIcon = !this.isFavorite ? 'bi bi-star' : 'bi bi-star-fill';
        this.favAlert = true;
        this.alertTime();
      });
  }

  removeWatchlist(ticker: any) {
    // this.watchSpin = true;
    // console.log('t', ticker);
    this.http
      .get<any>(
        'https://webtechass3-pranav1251g.wm.r.appspot.com/removeWatchlist',
        {
          params: {
            ticker: ticker,
          },
        }
      )
      .subscribe((response) => {
        // console.log('hello', response);
        // this.watchlistItems = response;

        this.watchlistItems = this.watchlistItems.filter(
          (x: any) => x.ticker != ticker
        );
        this.removeFav = true;
        this.alertTime();
        console.log(this.watchlistItems);
        if (this.watchlistItems.length == 0) {
          this.watchBool = true;
        }
        this.isFavorite = false;
        this.starIcon = !this.isFavorite ? 'bi bi-star' : 'bi bi-star-fill';
        // this.getWatchlist();
      });
  }

  getWatchlist() {
    this.http
      .get<any>('https://webtechass3-pranav1251g.wm.r.appspot.com/favorites', {
        params: {
          ticker: '',
        },
      })
      .subscribe((response) => {
        // console.log('hello', response);
        this.watchlistItems = [];
        this.watchlistItems = response;
        this.getWatchlistRight();
        if (response.length != 0) {
          this.watchBool = false;
        } else {
          this.watchBool = true;
          this.watchSpin = false;
        }
        for (var i = 0; i < this.watchlistItems.length; i++) {
          if (
            this.watchlistItems[i]['ticker'].toUpperCase() ==
            this.mainTicker.toUpperCase()
          ) {
            this.isFavorite = true;
            break;
          }
        }
      });
  }

  openBuy(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    p: any
  ): void {
    p['money'] = this.money;
    p['currP'] = this.stockPrice;
    // console.log(p);
    const dialogRef = this.dialog.open(BuydialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      width: '350px',
      position: { top: '14px' },
      data: p,
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result['ticker'] !== undefined) {
        this.buyStock(result);
      }
    });
  }

  getPortfolio() {
    this.http
      .get<any>('https://webtechass3-pranav1251g.wm.r.appspot.com/portfolio', {
        params: {
          ticker: '',
        },
      })
      .subscribe((response) => {
        // this.money = 25000;
        // for (var i = 0; i < response.length; i++) {
        //   // console.log('number',Number(response[i]['buyingCost']));
        //   this.money -= Number(response[i]['buyingCost']);
        // }
        // console.log(this.money);
        this.portfolioItems = [];
        this.portfolioItems = response;
        // this.getMon();
        for (var i = 0; i < this.portfolioItems.length; i++) {
          this.portfolioItems[i]['avgCost'] =
            this.portfolioItems[i]['buyingCost'] /
            this.portfolioItems[i]['quantity'];
        }

        if (this.portfolioItems.length == 0) {
          this.portBool = true;
          this.portSpin = false;
        } else {
          this.portBool = false;
        }

        if (this.portfolioItems.find((x: any) => x.ticker == this.mainTicker)) {
          // console.log(this.mainTicker);
          this.isBought = true;
        } else {
          this.isBought = false;
        }
        this.getPortfolioRight();

        if (this.portfolioItems.length > 0 && this.money == 25000.0) {
          for (var i = 0; i < this.portfolioItems.length; i++) {
            this.money -= this.portfolioItems[i]['buyingCost'];
          }
        }
      });
  }

  buyStock(result: any) {
    if (this.portfolioItems.find((x: any) => x.ticker == result['ticker'])) {
      const temp = this.portfolioItems.filter(
        (x: any) => x.ticker == result['ticker']
      );
      // console.log(temp);
      // console.log(result);
      // console.log(
      //   Number(result['boughtPrice']) + Number(temp[0]['buyingCost'])
      // // );
      // console.log(
      //   String(Number(result['boughtPrice']) + Number(temp[0]['buyingCost']))
      // );
      this.http
        .get<any>(
          'https://webtechass3-pranav1251g.wm.r.appspot.com/updateStock',
          {
            params: {
              ticker: result['ticker'],
              quantity: Number(result['quant']) + Number(temp[0]['quantity']),
              buyingCost: String(
                (
                  Number(result['boughtPrice']) + Number(temp[0]['buyingCost'])
                ).toFixed(2)
              ),
            },
          }
        )
        .subscribe((response) => {
          this.getPortfolio();

          // console.log(Number(this.money) - Number(result['boughtPrice']));
          // console.log(Number(result['boughtPrice']));

          this.getMoney(
            String(Number(this.money) - Number(result['boughtPrice']))
          );
          this.buyAlert = true;
          this.alertTime();
        });
    } else {
      // console.log('no');
      // console.log('extraStcok');
      this.http
        .get<any>('https://webtechass3-pranav1251g.wm.r.appspot.com/addStock', {
          params: {
            name: result['name'],
            ticker: result['ticker'],
            quantity: result['quant'],
            buyingCost: result['boughtPrice'].toFixed(2),
          },
        })
        .subscribe((response) => {
          this.getPortfolio();
          // console.log(response);
          this.getMoney(String(this.money - result['boughtPrice']));
          this.buyAlert = true;
          this.alertTime();
          // this.money -= result['boughtPrice'];
        });
    }
  }

  getMon() {
    this.http
      .get<any>('https://webtechass3-pranav1251g.wm.r.appspot.com/getMon')
      .subscribe((response) => {
        // console.log(response);
        // this.money = response[0]['money'];
      });
  }

  portBuy(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    p: any
  ): void {
    p['money'] = this.money;
    this.mainTicker = p['ticker'];
    // p['currP'] = this.stockPrice;
    // console.log(p);
    this.http
      .get<any>('https://webtechass3-pranav1251g.wm.r.appspot.com/quote', {
        params: {
          newSearch: p['ticker'],
        },
      })
      .subscribe((response) => {
        p['currP'] = response['c'];
        const dialogRef = this.dialog.open(BuydialogComponent, {
          enterAnimationDuration,
          exitAnimationDuration,
          width: '350px',
          position: { top: '8px' },
          data: p,
          autoFocus: false,
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result['ticker'] !== undefined) {
            // console.log(result);
            this.buyStock(result);
            this.portBAlert = true;
          }
        });
      });
  }
  async getPortfolioRight() {
    var i: number = 0;

    for (const i of this.portfolioItems) {
      // console.log(i);
      await new Promise<void>((resolve, rej) => {
        this.http
          .get<any>('https://webtechass3-pranav1251g.wm.r.appspot.com/quote', {
            params: {
              newSearch: i['ticker'],
            },
          })
          .subscribe((response) => {
            // console.log('res', response);
            i['stockPricing'] = response['c'];
            // console.log(this.portfolioItems);
            resolve();
          });
      }).then((res) => {
        if (
          this.portfolioItems[this.portfolioItems.length - 1]['stockPricing']
        ) {
          this.portSpin = false;
        }
      });
    }
  }

  async getWatchlistRight() {
    var i: number = 0;

    for (const i of this.watchlistItems) {
      // console.log(i);
      await new Promise<void>((resolve, rej) => {
        this.http
          .get<any>('https://webtechass3-pranav1251g.wm.r.appspot.com/quote', {
            params: {
              newSearch: i['ticker'],
            },
          })
          .subscribe((response) => {
            // console.log('res', response);
            i['price'] = response['c'];
            i['stockChange'] = response['d'];
            i['changePercent'] = response['dp'];
            // console.log(this.portfolioItems);
            resolve();
          });
      }).then((r) => {
        if (
          this.watchlistItems[this.watchlistItems.length - 1]['changePercent']
        ) {
          this.watchSpin = false;
        }
      });
    }
  }

  sellStock(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    p: any,
    flag: boolean
  ) {
    var tmp = this.portfolioItems.filter((x: any) => x.ticker == p['ticker']);
    p['quants'] = tmp[0]['quantity'];
    p['money'] = this.money;
    if (this.stockPrice == '') {
      p['currP'] = tmp[0]['stockPricing'];
    } else {
      p['currP'] = this.stockPrice;
    }

    this.mainTicker = p['ticker'];

    const dialogRef = this.dialog.open(SelldialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      width: '350px',
      position: { top: '14px' },
      data: p,
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result != true) {
        if (tmp[0]['quantity'] == Number(result['sellC'])) {
          this.http
            .get<any>(
              'https://webtechass3-pranav1251g.wm.r.appspot.com/deleteStock',
              {
                params: {
                  ticker: result['ticker'],
                },
              }
            )
            .subscribe((response) => {
              // this.money += result['sellPrice'];

              this.getMoney(this.money + result['sellPrice']);
              if (flag) {
                this.sellAlert = true;
                this.alertTime();
              } else {
                this.portSAlert = true;
                this.alertTime();
              }
              this.getPortfolio();
              this.portfolioItems = this.portfolioItems.filter(
                (cat: any) => cat['ticker'] != result['ticker']
              );
              // console.log(this.portfolioItems);
              if (this.portfolioItems.length == 0) {
                this.portBool = true;
              }
            });
        } else {
          var x =
            (Number(tmp[0]['buyingCost']) / tmp[0]['quantity']) *
            (tmp[0]['quantity'] - Number(result['sellC']));

          console.log(x);

          this.http
            .get<any>(
              'https://webtechass3-pranav1251g.wm.r.appspot.com/sellStock',
              {
                params: {
                  ticker: result['ticker'],
                  quantity: tmp[0]['quantity'] - Number(result['sellC']),
                  buyingCost: x.toFixed(2),
                },
              }
            )
            .subscribe((response) => {
              this.getMoney(
                String(Number(this.money) + Number(result['sellPrice']))
              );
              this.getPortfolio();
              if (flag) {
                this.sellAlert = true;
                this.alertTime();
              } else {
                this.portSAlert = true;
                this.alertTime();
              }

              // this.getPortfolio();
            });
        }
      }
    });
  }

  getMoney(coins: string) {
    this.http
      .get<any>(
        'https://webtechass3-pranav1251g.wm.r.appspot.com/updateMoney',
        {
          params: {
            money: coins,
          },
        }
      )
      .subscribe((response) => {
        // console.log(response);
        this.money = Number(response[0]['money']);
      });
  }

  activateNavItem(item: HTMLElement) {
    // console.log(item);
    this.deactivateAllNavItems();
    this.renderer.addClass(item, 'currTab');
  }

  // Remove active class from all items
  deactivateAllNavItems() {
    const navItems = this.el.nativeElement.querySelectorAll('span');
    navItems.forEach((item: HTMLElement) => {
      this.renderer.removeClass(item, 'currTab');
    });
  }

  reactivateItems() {
    const navItems = this.el.nativeElement.querySelectorAll('span');
    // console.log(navItems[1]);
    this.deactivateAllNavItems();
    this.renderer.addClass(navItems[1], 'currTab');
  }

  ngOnDestroy() {
    this.mySubscription.unsubscribe();
  }
}

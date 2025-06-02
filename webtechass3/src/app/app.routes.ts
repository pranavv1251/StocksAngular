import { Routes } from '@angular/router';
import { TickerComponent } from './components/ticker/ticker.component';
import { AppComponent } from './app.component';
import { RedirectService } from './services/redirect.service';
import { FirstComponent } from './components/first/first.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';

export const routes: Routes = [
  { path: '', redirectTo: 'search/home', pathMatch: 'full' },
  {
    path: 'search',
    component: FirstComponent,
    children: [
      {
        path: 'home',
        component: FirstComponent,
      },
      {
        path: ':id',
        component: TickerComponent,
      },
    ],
  },
  // {
  //   path: 'search/:id',
  //   component: FirstComponent,
  // },
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'portfolio', component: PortfolioComponent },
];

//search/home
//search/AAPL
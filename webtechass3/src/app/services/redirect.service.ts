import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, delay } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedirectService{

  constructor(private router: Router) {}

  canActivate(): Observable<boolean> {
    // this.getInitialUserId().subscribe((userId: number) => {
    //   this.router.navigate(["search/" + userId]);
    // });
    return of(false);
  }

  private getInitialUserId(): Observable<number> {
    return of(this.randomIntFromInterval(1, 6)).pipe(delay(0));
  }

  private randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}

import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { FooterComponent } from '../footer/footer.component';
import { MatCardModule } from '@angular/material/card';
import { FirstService } from '../../services/first.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-news-tab',
  standalone: true,
  templateUrl: './top-news-tab.component.html',
  styleUrl: './top-news-tab.component.css',
  imports: [MatGridListModule, FooterComponent, MatCardModule, CommonModule],
})
export class TopNewsTabComponent {
  breakpoint: number = 0;
  h: string = '';

  ngOnInit() {
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2;
    this.h = window.innerWidth <= 600 ? '210px' : '100px';
  }
  onResize(event: any) {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
    this.h = window.innerWidth <= 600 ? '210px' : '100px';
  }
  constructor(public service: FirstService) {}
}

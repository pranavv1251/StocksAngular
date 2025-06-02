import { Component, ElementRef, Renderer2 } from '@angular/core';
import {
  NgbNavConfig,
  NgbNavModule,
  NgbCollapseModule,
} from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { FirstService } from '../../services/first.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgbNavModule, NgbCollapseModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isMenuCollapsed = true;
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    public service: FirstService
  ) {}

  activateNavItem(item: HTMLElement) {
    console.log(item);
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
}

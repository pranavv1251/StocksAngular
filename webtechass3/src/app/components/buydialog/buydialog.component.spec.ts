import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuydialogComponent } from './buydialog.component';

describe('BuydialogComponent', () => {
  let component: BuydialogComponent;
  let fixture: ComponentFixture<BuydialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuydialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuydialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

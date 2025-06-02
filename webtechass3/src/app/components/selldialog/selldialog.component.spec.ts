import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelldialogComponent } from './selldialog.component';

describe('SelldialogComponent', () => {
  let component: SelldialogComponent;
  let fixture: ComponentFixture<SelldialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelldialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelldialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

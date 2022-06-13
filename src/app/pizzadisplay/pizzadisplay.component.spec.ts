import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzadisplayComponent } from './pizzadisplay.component';

describe('PizzadisplayComponent', () => {
  let component: PizzadisplayComponent;
  let fixture: ComponentFixture<PizzadisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PizzadisplayComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzadisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieserieComponent } from './movieserie.component';

describe('MovieserieComponent', () => {
  let component: MovieserieComponent;
  let fixture: ComponentFixture<MovieserieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieserieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieserieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

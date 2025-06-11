import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePrefecturesComponent } from './liste-prefectures.component';

describe('ListePrefecturesComponent', () => {
  let component: ListePrefecturesComponent;
  let fixture: ComponentFixture<ListePrefecturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListePrefecturesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListePrefecturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

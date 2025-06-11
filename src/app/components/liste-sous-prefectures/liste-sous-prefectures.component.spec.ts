import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeSousPrefecturesComponent } from './liste-sous-prefectures.component';

describe('ListeSousPrefecturesComponent', () => {
  let component: ListeSousPrefecturesComponent;
  let fixture: ComponentFixture<ListeSousPrefecturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeSousPrefecturesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeSousPrefecturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

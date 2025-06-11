import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeVillagesComponent } from './liste-villages.component';

describe('ListeVillagesComponent', () => {
  let component: ListeVillagesComponent;
  let fixture: ComponentFixture<ListeVillagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeVillagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeVillagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

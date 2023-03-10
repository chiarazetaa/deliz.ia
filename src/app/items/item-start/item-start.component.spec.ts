import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemStartComponent } from './item-start.component';

describe('ItemStartComponent', () => {
  let component: ItemStartComponent;
  let fixture: ComponentFixture<ItemStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

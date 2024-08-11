import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemStartComponent } from './item-start.component';

describe('ItemStartComponent', () => {
  let component: ItemStartComponent;
  let fixture: ComponentFixture<ItemStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemStartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

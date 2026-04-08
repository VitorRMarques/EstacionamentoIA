import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsInput } from './items-input';

describe('ItemsInput', () => {
  let component: ItemsInput;
  let fixture: ComponentFixture<ItemsInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsInput],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemsInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

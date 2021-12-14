import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPlantillaComponent } from './dialog-plantilla.component';

describe('DialogPlantillaComponent', () => {
  let component: DialogPlantillaComponent;
  let fixture: ComponentFixture<DialogPlantillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPlantillaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPlantillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

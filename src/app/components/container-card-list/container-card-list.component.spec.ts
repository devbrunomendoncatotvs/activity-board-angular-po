import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerCardListComponent } from './container-card-list.component';

describe('ContainerCardListComponent', () => {
  let component: ContainerCardListComponent;
  let fixture: ComponentFixture<ContainerCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerCardListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

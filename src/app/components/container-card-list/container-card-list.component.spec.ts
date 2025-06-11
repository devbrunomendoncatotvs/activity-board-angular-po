import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerCardListComponent } from './container-card-list.component';
import { ITask } from '../../interfaces/Task';

describe('ContainerCardListComponent', () => {
  let component: ContainerCardListComponent;
  let fixture: ComponentFixture<ContainerCardListComponent>;

  const taskMock: ITask = {
    id: 1,
    title: 'Task Title',
    description: 'Task Description',
    createdAt: 'Atividade criada em: 10/06/2025 às 10:30',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerCardListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContainerCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('events emit', () => {
    it('should emit task to notStarted', () => {
      // 1. Preparação (Arrange)
      spyOn(component.notStarted, 'emit');

      // 2. Ação (Act)
      component.addTaskNotStarted(taskMock);

      // 3. Verificação (Assert)
      expect(component.notStarted.emit).toHaveBeenCalledWith(taskMock);
    });

    it('should emit task to inProgress', () => {
      // 1. Preparação (Arrange)
      spyOn(component.inProgress, 'emit');

      // 2. Ação (Act)
      component.addTaskInProgress(taskMock);

      // 3. Verificação (Assert)
      expect(component.inProgress.emit).toHaveBeenCalledWith(taskMock);
    });

    it('should emit task to fineshed', () => {
      // 1. Preparação (Arrange)
      spyOn(component.finished, 'emit');

      // 2. Ação (Act)
      component.addTaskFinished(taskMock);

      // 3. Verificação (Assert)
      expect(component.finished.emit).toHaveBeenCalledWith(taskMock);
    });

    it('should emit task to remove', () => {
      // 1. Preparação (Arrange)
      spyOn(component.remove, 'emit');

      // 2. Ação (Act)
      component.removeTask(taskMock);

      // 3. Verificação (Assert)
      expect(component.remove.emit).toHaveBeenCalledWith(taskMock);
    });
  });
});

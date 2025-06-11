import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBoardComponent } from './task-board.component';
import { ITask } from '../../interfaces/Task';
import Swal from 'sweetalert2';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

describe('TaskBoardComponent', () => {
  let component: TaskBoardComponent;
  let fixture: ComponentFixture<TaskBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskBoardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('handleSubmitTask()', () => {
    // Não deve adicionar a Task se o o comprimento do title ou description for menor que 3
    it('should not add task if the lenght of the title or description is less than three', () => {
      // 1. Preparação (Arrange)
      component.title = 'ab';
      component.description = 'cd';
      const countLength = component.notStartedTasks.length;

      // 2. Ação (Act)
      component.handleSubmitTask();

      // 3. Verificação (Assert)
      expect(component.notStartedTasks.length).toBe(countLength);
    });

    // Deve adicionar task ao notStartedTasks, incrementar o id e retornar os campos title e description vazios.
    it('should add task to notStartedTasks', () => {
      // 1. Preparação (Arrange)
      component.title = 'Título da atividade';
      component.description = 'Descrição da atividade';
      const countLength = component.notStartedTasks.length;

      // 2. Ação (Act)
      component.handleSubmitTask();

      // 3. Verificação (Assert)
      expect(component.notStartedTasks.length).toBe(countLength + 1);
      expect(component.notStartedTasks[countLength].title).toBe(
        'Título da atividade'
      );
      expect(component.notStartedTasks[countLength].description).toBe(
        'Descrição da atividade'
      );
      expect(component.id).toBe(2);
      expect(component.title).toBe('');
      expect(component.description).toBe('');
    });
  });

  describe('task movement methods', () => {
    const taskMock: ITask = {
      id: 1,
      title: 'Título da atividade',
      description: 'Descrição da atividade',
      createdAt: 'Atividade criada em: 10/06/2025 às 13:40',
    };

    beforeEach(() => {
      // inicia o array notStartedTasks com uma Task nele
      component.notStartedTasks = [taskMock];
      // inicia o array inprogressTasks vazio
      component.inProgressTasks = [];
      // inicia o array fineshedTasks vazio
      component.finishedTasks = [];
    });

    it('should not move task if it already exists in the class she is in', () => {
      component.notStartedTasks = [taskMock];
      component.inProgressTasks = [taskMock];
      component.finishedTasks = [taskMock];
      const initialNotStartedTasks = component.notStartedTasks.length;
      const initialInprogressTasks = component.inProgressTasks.length;
      const initialFinishedTasks = component.finishedTasks.length;

      component.handleNotStartedTask(taskMock);
      component.handleInProgressTask(taskMock);
      component.handleFinishedTask(taskMock);

      expect(component.notStartedTasks.length).toBe(initialNotStartedTasks);
      expect(component.inProgressTasks.length).toBe(initialInprogressTasks);
      expect(component.finishedTasks.length).toBe(initialFinishedTasks);
    });

    //Deve mover uma task de inProgressTasks ou finishedTasks para notStartedTasks
    it('should move task from inProgressTasks or finishedTasks to notStartedTasks', () => {
      // 1. Preparação (Arrange)
      component.inProgressTasks = [taskMock];
      component.finishedTasks = [taskMock];
      component.notStartedTasks = [];

      // 2. Ação (Act)
      component.handleNotStartedTask(taskMock);

      // 3. Verificação (Assert)
      expect(component.notStartedTasks).toContain(taskMock);
      expect(component.inProgressTasks).not.toContain(taskMock);
      expect(component.finishedTasks).not.toContain(taskMock);
    });

    //Deve mover uma task de notStartedTasks ou finishedTasks para inProgressTasks
    it('should move task from notStartedTasks to inProgressTasks', () => {
      // 1. Preparação (Arrange)
      component.notStartedTasks = [taskMock];
      component.finishedTasks = [taskMock];
      component.inProgressTasks = [];

      // 2. Ação (Act)
      component.handleInProgressTask(taskMock);

      // 3. Verificação (Assert)
      expect(component.inProgressTasks).toContain(taskMock);
      expect(component.notStartedTasks).not.toContain(taskMock);
      expect(component.finishedTasks).not.toContain(taskMock);
    });

    //Deve mover uma task de notStartedTasks ou inProgressTasks para finishedTasks
    it('should move task from notStartedTask or inProgressTasks to finishedTask', () => {
      component.notStartedTasks = [taskMock];
      component.inProgressTasks = [taskMock];
      component.finishedTasks = [];

      component.handleFinishedTask(taskMock);

      expect(component.finishedTasks).toContain(taskMock);
      expect(component.notStartedTasks).not.toContain(taskMock);
      expect(component.inProgressTasks).not.toContain(taskMock);
    });
  });

  describe('handleRemoveTask()', () => {
    const taskMock: ITask = {
      id: 1,
      title: 'Título da atividade',
      description: 'Descrição da atividade',
      createdAt: 'Atividade criada em: 10/06/2025 às 13:40',
    };

    it('should remove the task from a list and show a success alert', () => {
      component.notStartedTasks = [taskMock];
      component.inProgressTasks = [taskMock];
      component.finishedTasks = [taskMock];
      spyOn(Swal, 'fire');

      component.handleRemoveTask(taskMock);

      expect(component.notStartedTasks).not.toContain(taskMock);
      expect(component.inProgressTasks).not.toContain(taskMock);
      expect(component.finishedTasks).not.toContain(taskMock);

      expect(Swal.fire).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleDrop()', () => {
    const tasksMock: ITask[] = [
      {
        id: 1,
        title: 'Primeira atividade',
        description: 'Descrição primeira atividade',
        createdAt: 'Atividade criada em: 10/06/2025 às 13:40',
      },
      {
        id: 2,
        title: 'Segunda atividade',
        description: 'Descrição segunda atividade',
        createdAt: 'Atividade criada em: 10/06/2025 às 13:41',
      },
    ];
    it('should move task within same container notStartedTasks', () => {
      component.notStartedTasks = [...tasksMock];
      const event = {
        previousContainer: {
          data: component.notStartedTasks,
        },
        container: {
          data: component.notStartedTasks,
        },
        previousIndex: 0,
        currentIndex: 1,
      } as CdkDragDrop<ITask[]>;

      component.handleDrop(event);

      expect(component.notStartedTasks[0].id).toBe(2);
      expect(component.notStartedTasks[1].id).toBe(1);
    });
    it('should move task within same container inProgressTasks', () => {
      component.inProgressTasks = [...tasksMock];

      const event = {
        previousContainer: {
          data: component.inProgressTasks,
        },
        container: {
          data: component.inProgressTasks,
        },
        previousIndex: 0,
        currentIndex: 1,
      } as CdkDragDrop<ITask[]>;

      component.handleDrop(event);

      expect(component.inProgressTasks[0].id).toBe(2);
      expect(component.inProgressTasks[1].id).toBe(1);
    });
    it('should move task within same container finishedTasks', () => {
      component.finishedTasks = [...tasksMock];

      const event = {
        previousContainer: {
          data: component.finishedTasks,
        },
        container: {
          data: component.finishedTasks,
        },
        previousIndex: 0,
        currentIndex: 1,
      } as CdkDragDrop<ITask[]>;

      component.handleDrop(event);

      expect(component.finishedTasks[0].id).toBe(2);
      expect(component.finishedTasks[1].id).toBe(1);
    });

    //Continuar
    it('should transfer item between containers', () => {
      component.notStartedTasks = [tasksMock[0]];
      component.inProgressTasks = [tasksMock[1]];
      const event = {
        previousContainer: { data: component.notStartedTasks },
        container: { data: component.inProgressTasks },
        previousIndex: 0,
        currentIndex: 1,
      } as CdkDragDrop<ITask[]>;

      component.handleDrop(event);

      expect(component.notStartedTasks.length).toBe(0);
      expect(component.inProgressTasks.length).toBe(2);
      expect(component.inProgressTasks[1].id).toBe(1);
    });
  });

  describe('handleShowAlert', () => {
    beforeEach(() => {
      spyOn(Swal, 'fire');
    });

    it('should show error alert when title is empty', () => {
      component.title = '';
      component.description = 'Descrição válida';

      component.handleShowAlert();

      expect(Swal.fire).toHaveBeenCalledWith({
        icon: 'error',
        title: 'Oops...',
        text: 'Um ou mais campo(s) do formuário não foi preenchido corretamente, Preencah cada campo do formulário com pelo meno 3 caracteres!',
      } as any);
    });

    it('should show error alert when description is empty', () => {
      component.title = 'Título válido';
      component.description = '';

      component.handleShowAlert();

      expect(Swal.fire).toHaveBeenCalledWith({
        icon: 'error',
        title: 'Oops...',
        text: 'Um ou mais campo(s) do formuário não foi preenchido corretamente, Preencah cada campo do formulário com pelo meno 3 caracteres!',
      } as any);
    });

    it('should show error alert when both fields are too short', () => {
      component.title = 'ab';
      component.description = 'cd';

      component.handleShowAlert();

      expect(Swal.fire).toHaveBeenCalledWith({
        icon: 'error',
        title: 'Oops...',
        text: 'Um ou mais campo(s) do formuário não foi preenchido corretamente, Preencah cada campo do formulário com pelo meno 3 caracteres!',
      } as any);
    });

    it('should show success alert when both fields are filled correctly', () => {
      component.title = 'Título válido';
      component.description = 'Descrição válida';

      component.handleShowAlert();

      expect(Swal.fire).toHaveBeenCalledWith({
        icon: 'success',
        title: 'Urrul...',
        text: `A atividade (Título válido) foi criada com sucesso!`,
      } as any);
    });
  });
});
/* 
Dúvidas:

1-No primeiro ït do => decribe(task movement methods) que está na linha "82" é uma boa ou má prática usar duas origen no mesmo "it" sendo elas "notStartedTasks" e "finishedTasks" para fazer a simulação ou é melhor separar as responsabilidades como está sendo feito?

2-No terceiro ït do => decribe(task movement methods) que está na linha "112" faço a preparação dele repetindo oque já está no beforeEache, isso é uma boa prática para deixar mais descritivo ou desnecessário?
*/

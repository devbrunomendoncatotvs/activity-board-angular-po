import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  PoButtonModule,
  PoModule,
  PoFieldModule,
  PoToasterModule,
} from '@po-ui/ng-components';
import Swal from 'sweetalert2';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { ITask } from '../../interfaces/Task';
import { ContainerCardListComponent } from '../container-card-list/container-card-list.component';

@Component({
  selector: 'app-task-board',
  imports: [
    FormsModule,
    CdkDropList,
    PoModule,
    PoFieldModule,
    PoButtonModule,
    ContainerCardListComponent,
    PoToasterModule,
  ],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.css',
})
export class TaskBoardComponent {
  id: number = 1;
  title: string = '';
  description: string = '';
  createdAt() {
    const now = new Date();
    return `Atividade criada em: ${now.toLocaleDateString()} às ${now.toLocaleTimeString(
      [],
      { hour: '2-digit', minute: '2-digit' }
    )}`;
  }

  notStartedTasks: ITask[] = [];
  inProgressTasks: ITask[] = [];
  finishedTasks: ITask[] = [];

  handleSubmitTask() {
    if (this.title.length < 3 || this.description.length < 3) return;
    this.notStartedTasks.push({
      id: this.id,
      title: this.title,
      description: this.description,
      createdAt: this.createdAt(),
    });
    this.id += 1;
    this.title = '';
    this.description = '';
  }

  notStartedTask(ev: ITask) {
    if (this.notStartedTasks.some((task) => task.id === ev.id)) return;

    this.inProgressTasks = this.inProgressTasks.filter(
      (task) => task.id !== ev.id
    );
    this.finishedTasks = this.finishedTasks.filter((task) => task.id !== ev.id);

    this.notStartedTasks.push(ev);
  }

  inProgressTask(ev: ITask) {
    if (this.inProgressTasks.some((task) => task.id === ev.id)) return;

    this.notStartedTasks = this.notStartedTasks.filter(
      (task) => task.id !== ev.id
    );
    this.finishedTasks = this.finishedTasks.filter((task) => task.id !== ev.id);

    this.inProgressTasks.push(ev);
  }

  finishedTask(ev: ITask) {
    if (this.finishedTasks.some((task) => task.id === ev.id)) return;

    this.notStartedTasks = this.notStartedTasks.filter(
      (task) => task.id !== ev.id
    );
    this.inProgressTasks = this.inProgressTasks.filter(
      (task) => task.id !== ev.id
    );

    this.finishedTasks.push(ev);
  }

  removeTask(ev: ITask) {
    this.notStartedTasks = this.notStartedTasks.filter(
      (task) => task.id !== ev.id
    );

    this.inProgressTasks = this.inProgressTasks.filter(
      (task) => task.id !== ev.id
    );

    this.finishedTasks = this.finishedTasks.filter((task) => task.id !== ev.id);

    Swal.fire({
      icon: 'success',
      text: `A atividade removida com sucesso!`,
    });
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  showAlert(): void {
    if (this.title.length < 3 || this.description.length < 3) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Um ou mais campo(s) do formuário não foi preenchido corretamente, Preencah cada campo do formulário com pelo meno 3 caracteres!',
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Urrul...',
        text: `A atividade (${this.title}) foi criada com sucesso!`,
      });
    }
  }
}

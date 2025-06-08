import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { ITask } from '../../interfaces/Task';
import { PoContainerModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-container-card-list',
  imports: [NgFor, CdkDrag, PoContainerModule],
  templateUrl: './container-card-list.component.html',
  styleUrl: './container-card-list.component.css',
})
export class ContainerCardListComponent {
  @Input() className: string = '';
  @Input() title: string = '';
  @Input() tasks: ITask[] = [];

  @Output() notStarted = new EventEmitter();
  @Output() inProgress = new EventEmitter();
  @Output() finished = new EventEmitter();
  @Output() remove = new EventEmitter();

  addTaskNotStarted(task: ITask) {
    this.notStarted.emit(task);
  }
  addTaskInProgress(task: ITask) {
    this.inProgress.emit(task);
  }
  addTaskFinished(task: ITask) {
    this.finished.emit(task);
  }
  removeTask(task: ITask) {
    this.remove.emit(task);
  }
}

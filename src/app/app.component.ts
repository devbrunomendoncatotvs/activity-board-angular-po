import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PoMenuItem, PoPageModule } from '@po-ui/ng-components';
import { TaskBoardComponent } from './components/task-board/task-board.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, PoPageModule, TaskBoardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}

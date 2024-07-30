import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TaskService } from '../tasks.service';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
})
export class TasksListComponent {
  private taskService = inject(TaskService)
  selectedFilter = signal<string>('all');
  tasks = computed(() => {
    switch(this.selectedFilter()){
      case 'all':
        return this.taskService.allTasks();
      case  'open':
        return this.taskService
          .allTasks()
          .filter((tasks) => tasks.status === 'OPEN');
      case  'in-progress':
        return this.taskService
          .allTasks()
          .filter((tasks) => tasks.status === 'IN_PROGRESS');
      case  'done':
        return this.taskService
          .allTasks()
          .filter((tasks) => tasks.status === 'DONE');
      default:
        return this.taskService.allTasks();
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}

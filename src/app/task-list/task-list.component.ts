import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from '../shared/task.model';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[];
  private sub: Subscription;

  constructor(private TaskService: TaskService) { }

  //on initialise subscribe to observarable for task list
  ngOnInit(): void {
    this.tasks = this.TaskService.getTasks();
    this.sub = this.TaskService.taskChanged.subscribe(
      (newTasks: Task[]) => {
        this.tasks = newTasks;
      }
    )
  }

  //destroy observarable when no longer in use
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  //pass selected task to observarable
  onEditItem(i: number) {
    this.TaskService.selectedTask.next(i);
  }
}

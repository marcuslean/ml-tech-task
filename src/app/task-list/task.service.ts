import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DbconnService } from '../shared/dbconn.service';
import { Task } from '../shared/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskChanged = new Subject<Task[]>();  //observarable for when tasks changes
  selectedTask = new Subject<number>();  //observarable for when a task get selected
  private tasks: Task[] = [
    new Task('DO something by the end of sunday!!!', 'John Doe'),
    new Task('Dry the clothes in the washer', 'John Doe'),
    new Task('Fold the clothes', 'John Doe'),
  ];

  constructor(private dbconn: DbconnService) { }

  //return current task
  getTask(index: number) {
    return this.tasks[index];
  }

  //return an array all tasks
  getTasks() {
    return this.tasks.slice();
  }

  //add task
  addTask(newItem: Task) {
    this.tasks.push(newItem); 
    this.taskChanged.next(this.tasks.slice());

    // this.dbconn.insert(newItem);
  }

  //modify selected task
  updateTask(i: number, newItem: Task) {
    this.tasks[i] = newItem;
    this.taskChanged.next(this.tasks.slice());
  }

  //remove selected task
  removeTask(item: Task) {
    const index = this.tasks.indexOf(item);
    if (index > -1) {
      this.tasks.splice(index, 1);
    }

    this.taskChanged.next(this.tasks.slice());
  }
}

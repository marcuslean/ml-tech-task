import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user.model';
import { Task } from '../../shared/task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) formRef: NgForm; 
  taskSub: Subscription;
  userSub: Subscription;
  editMode: Boolean = false;
  selectedTaskIndex: number;
  selectedTask: Task;
  currUser: User | null;

  constructor(private taskService: TaskService, private authService: AuthService) { }

  ngOnInit(): void {
    this.taskSub = this.taskService.selectedTask.subscribe(
      (index: number) => {
        this.editMode = true;
        this.selectedTaskIndex = index;
        this.selectedTask = this.taskService.getTask(index);
        this.formRef.setValue({
          name: this.selectedTask.task,
        })
      }
    )
    this.userSub = this.authService.user.subscribe(
      (user: User | null) => {
        this.currUser = user;
      }
    )
  }

  //add new task or edit selected task
  onAdd(form: NgForm) {
    const newTask = new Task(form.value.name, this.currUser?.name);

    if (this.editMode) {
      this.taskService.updateTask(this.selectedTaskIndex, newTask);
    } else {
      this.taskService.addTask(newTask);
    }

    this.onClear();
  }

  //delete selected task
  onDelete() {
    this.taskService.removeTask(this.selectedTask);
    
    this.onClear();
  }

  //clear selected task
  onClear() {
    this.editMode = false;
    this.formRef.reset();
  }

  ngOnDestroy(): void {
    this.taskSub.unsubscribe();
    this.userSub.unsubscribe();
  }
}

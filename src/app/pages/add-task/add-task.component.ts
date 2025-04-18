import { Component, inject, Input, OnInit, Output, signal, TemplateRef, WritableSignal, EventEmitter } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { Board } from '../../models/board.model';
import { Column } from '../../models/column.model';
import { Task } from '../../models/task.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBug, faCalendar, faCheck, faClose, faCoffee, faPencil, faPlus, faSave, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubTask } from '../../models/sub-task.model';
import { TaskTypeEnum } from '../../models/enum/task.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task',
  imports: [ CommonModule, FontAwesomeModule, ReactiveFormsModule, FormsModule   ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent implements OnInit {

  @Input() public task: Task = new Task(1, '');
  @Output() public close = new EventEmitter<any>();

  public faTrash = faTrash;
  public faPlus = faPlus;
  public faSave = faSave;
  public faPencil = faPencil;
  public faCheck = faCheck;
  public faClose = faClose;
  public faCalendar = faCalendar;
  public faBug = faBug;

  public enumTaskType = TaskTypeEnum;

  constructor() {
  }

  ngOnInit(): void {
  }

  addSubTask() {
    let sub = new SubTask("");
    sub.edit = true;
    this.task.subTasks.push(sub);
  }

  removeSubTask(index: number): void {
    this.task.subTasks.splice(index, 1);
  }

  hasSubTasks() {
    return this.task.subTasks.length > 0;
  }

  getIconType(type: number):IconDefinition {
    switch(Number(type)) {
      case this.enumTaskType.bug:
        return this.faBug;
        break;
      default:
        return this.faCalendar;
    }
  }

  getCheckedPercentage(): number {
    if (this.task.subTasks.length == 0) return 100;
    const checkedTasks = this.task.subTasks.filter(task => task.checked).length;
    return (checkedTasks / this.task.subTasks.length) * 100;
  }

  submitForm(): void {
    this.task.ready = true;
    this.close.emit();
  }
}

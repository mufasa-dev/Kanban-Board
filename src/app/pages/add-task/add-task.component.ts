import { Component, inject, Input, OnInit, Output, signal, TemplateRef, WritableSignal, EventEmitter } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { Board } from '../../models/board.model';
import { Column } from '../../models/column.model';
import { Task } from '../../models/task.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee, faPencil, faPlus, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  imports: [ FontAwesomeModule, ReactiveFormsModule, FormsModule   ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent implements OnInit {

  @Input() public task: Task = new Task(1, '');
  @Output() public close = new EventEmitter<any>();

  public faTrash = faTrash;
  public faPlus = faPlus;
  public faSave = faSave;

  constructor() {
  }

  ngOnInit(): void {
  }


  submitForm(): void {
    this.task.ready = true;
    this.close.emit();
  }
}

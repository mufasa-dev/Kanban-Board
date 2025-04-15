import { Component, inject, Input, OnInit, Output, signal, TemplateRef, WritableSignal, EventEmitter } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { Board } from '../../models/board.model';
import { Column } from '../../models/column.model';
import { Task } from '../../models/task.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee, faPencil, faPlus, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-board',
  imports: [ FontAwesomeModule, ReactiveFormsModule, FormsModule   ],
  templateUrl: './edit-board.component.html',
  styleUrl: './edit-board.component.scss'
})
export class EditBoardComponent implements OnInit {

  @Input() public board: Board = new Board(1, '', []);
  @Output() public close = new EventEmitter<any>();

  public faTrash = faTrash;
  public faPlus = faPlus;
  public faSave = faSave;

  constructor() {
  }

  ngOnInit(): void {
  }

  addColumn(): void {
    this.board.columns.push(new Column('', []));
  }

  removeColumn(index: number): void {
    this.board.columns.splice(index, 1);
  }

  submitForm(): void {
    console.log('Dados enviados:');
    this.close.emit();
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}

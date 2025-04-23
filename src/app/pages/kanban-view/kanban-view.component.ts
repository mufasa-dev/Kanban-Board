import { Component, inject, Input, input, OnInit, output, signal, TemplateRef, WritableSignal } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { Board } from '../../models/board.model';
import { Column } from '../../models/column.model';
import { Task } from '../../models/task.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBug, faC, faCalendar, faCoffee, faPencil, faPlus, faSave, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditBoardComponent } from '../edit-board/edit-board.component';
import { AddTaskComponent } from "../add-task/add-task.component";
import { TaskTypeEnum } from '../../models/enum/task.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kanban-view',
  imports: [CommonModule,CdkDrag, CdkDropList, CdkDropListGroup, FontAwesomeModule ],
  templateUrl: './kanban-view.component.html',
  styleUrl: './kanban-view.component.scss'
})
export class KanbanViewComponent {

  @Input() public columns: Column[] = [];
  @Input() public tasks: Task[] = []

  public newTask = output<void>();
  public openTask = output<Task>();

  public faCoffee = faCoffee;
  public faPencil = faPencil;
  public faSave = faSave;
  public faPlus = faPlus;
  public faCalendar = faCalendar;
  public faBug = faBug;

  public enumTaskType = TaskTypeEnum;

  constructor() {}

  drop(event: CdkDragDrop<Task[]>, newIndex: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      let item = event.item.data;
      const task = this.tasks.find(x => x.id == item.id);
      if (task) task.column = newIndex;
      console.log(this.tasks)
    }
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

  getTasks(col: number) {
    return this.tasks.filter(x => x.column == col);
  }

}

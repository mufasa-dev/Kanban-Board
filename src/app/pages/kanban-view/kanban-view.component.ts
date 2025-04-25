import { Component, inject, Input, input, OnInit, output, signal, TemplateRef, WritableSignal } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { Column } from '../../models/column.model';
import { Task } from '../../models/task.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBug, faC, faCalendar, faCoffee, faPencil, faPenToSquare, faPlus, faSave, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { TaskTypeEnum } from '../../models/enum/task.enum';
import { CommonModule } from '@angular/common';
import { SubTask } from '../../models/sub-task.model';
import { PriorityEnum } from '../../models/enum/priority.enum';

@Component({
  selector: 'app-kanban-view',
  imports: [CommonModule,CdkDrag, CdkDropList, CdkDropListGroup, FontAwesomeModule ],
  templateUrl: './kanban-view.component.html',
  styleUrl: './kanban-view.component.scss'
})
export class KanbanViewComponent {

  @Input() public columns: Column[] = [];
  @Input() public tasks: Task[] = [];

  public newTask = output<void>();
  public openTask = output<Task>();
  public saveTasks = output<void>();

  public faCoffee = faCoffee;
  public faPencil = faPencil;
  public faSave = faSave;
  public faPlus = faPlus;
  public faCalendar = faCalendar;
  public faBug = faBug;
  public faPenToSquare = faPenToSquare;

  public enumTaskType = TaskTypeEnum;
    public priorityEnum = PriorityEnum;

  constructor() {}

  drop(event: CdkDragDrop<Task[]>, newIndex: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      let item = event.item.data;
      const task = this.tasks.find(x => x.id == item.id);
      if (task) task.column = newIndex;
      this.saveTasks.emit();
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

  getCheckedSubTaksLength(tasks: SubTask[]): number {
    return tasks.filter(x => x.checked == true).length;
  }

  getPriorityName(id: number): string {
    switch(Number(id)) {
      case this.priorityEnum.high:
        return 'High';
      case this.priorityEnum.medium:
        return 'Medium';
      default:
        return 'Low';
    }
  }

}

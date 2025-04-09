import { Component, OnInit } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { Board } from '../../models/board.model';
import { Column } from '../../models/column.model';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-main-view',
  imports: [ CdkDrag, CdkDropList, CdkDropListGroup ],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss'
})
export class MainViewComponent implements OnInit {

  constructor() {}

  public board: Board = new Board(1, "My Board", []);

  ngOnInit(): void {
    this.board.columns.push(new Column(1, "Idea", [
      new Task(0, "Some Idea"),
      new Task(1, "Another Idea")
    ]));
    this.board.columns.push(new Column(2, "Research", [
      new Task(0, "Some reserch"),
    ]));
    this.board.columns.push(new Column(3, "Todo", []));
    this.board.columns.push(new Column(4, "Done", []));
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

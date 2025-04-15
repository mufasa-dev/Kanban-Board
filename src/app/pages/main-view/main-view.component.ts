import { Component, inject, OnInit, signal, TemplateRef, WritableSignal } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { Board } from '../../models/board.model';
import { Column } from '../../models/column.model';
import { Task } from '../../models/task.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendar, faCoffee, faPencil, faPlus, faSave } from '@fortawesome/free-solid-svg-icons';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditBoardComponent } from '../edit-board/edit-board.component';
import { AddTaskComponent } from "../add-task/add-task.component";

@Component({
  selector: 'app-main-view',
  imports: [CdkDrag, CdkDropList, CdkDropListGroup, FontAwesomeModule, EditBoardComponent, AddTaskComponent],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss'
})
export class MainViewComponent implements OnInit {

  private modalService = inject(NgbModal);
	closeResult: WritableSignal<string> = signal('');

  public faCoffee = faCoffee;
  public faPencil = faPencil;
  public faSave = faSave;
  public faPlus = faPlus;
  public faCalendar = faCalendar;

  constructor() {}

  public board: Board = new Board(1, "My Board", []);
  public selectedTask: Task = new Task(0, '');

  ngOnInit(): void {
    this.board.columns.push(new Column("Idea", [
      new Task(0, "Some Idea"),
      new Task(1, "Another Idea")
    ]));
    this.board.columns.push(new Column("Research", [
      new Task(0, "Some reserch"),
    ]));
    this.board.columns.push(new Column("Todo", []));
    this.board.columns.push(new Column("Done", []));
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

  open(content: TemplateRef<any>, size: string = "xl") {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: size, centered: true }).result.then(
			(result) => {
				this.closeResult.set(`Closed with: ${result}`);
			},
			(reason) => {
				this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
			},
		);
	}

  newTaskModal(content: TemplateRef<any>, size: string = "xl") {
    if(this.board.columns.length == 0) return;
    let task = new Task(0, '');
    this.board.columns[0].tasks.push(task);
    this.selectedTask = task;
    this.open(content, size)
  }

	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}
}

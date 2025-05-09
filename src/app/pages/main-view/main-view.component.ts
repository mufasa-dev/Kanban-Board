import { Component, inject, OnInit, signal, TemplateRef, WritableSignal } from '@angular/core';
import { Board } from '../../models/board.model';
import { Column } from '../../models/column.model';
import { Task } from '../../models/task.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faBug, faC, faCalendar, faCoffee, faPencil, faPlus, faSave, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditBoardComponent } from '../edit-board/edit-board.component';
import { AddTaskComponent } from "../add-task/add-task.component";
import { TaskTypeEnum } from '../../models/enum/task.enum';
import { CommonModule } from '@angular/common';
import { KanbanViewComponent } from '../kanban-view/kanban-view.component';
import { TableViewComponent } from '../table-view/table-view.component';

@Component({
  selector: 'app-main-view',
  imports: [CommonModule, FontAwesomeModule, EditBoardComponent, AddTaskComponent, KanbanViewComponent, TableViewComponent],
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
  public faBug = faBug;
  public faBars = faBars;

  public enumTaskType = TaskTypeEnum;
  public tableView: boolean = false;

  constructor() {}

  public board: Board = new Board(1, "My Board", []);
  public tasks: Task[] = [];
  public selectedTask: Task = new Task(0, '');

  ngOnInit(): void {
    let board = JSON.parse(localStorage.getItem("board") || 'null');
    let tasks = JSON.parse(localStorage.getItem("tasks") || '[]');
    this.tasks = tasks;
    if (board != null) {
      this.board = board;
    } else {
      this.board.columns.push(new Column("Idea"));
      this.board.columns.push(new Column("Research"));
      this.board.columns.push(new Column("Todo"));
      this.board.columns.push(new Column("Done"));
      localStorage.setItem("board", JSON.stringify(this.board));
    }
  }

  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  removeTask(id: number) {
    this.tasks = this.tasks.filter(x => x.id != id);
    this.saveTasks();
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
    let maxId = this.tasks.reduce((max, task) => Math.max(max, task.id), 0);
    task.id = maxId + 1;

    this.tasks.push(task);
    this.selectedTask = task;
    this.open(content, size)
  }

  openTaskModal(content: TemplateRef<any>, task: Task, size: string = "xl") {
    if(this.board.columns.length == 0) return;
    this.selectedTask = task;
    this.open(content, size);
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

import { SubTask } from "./sub-task.model";

export class Task {
  id: number = 0;
  title: string = "";
  description: string = "";
  user: string = "";
  status: string = "";
  type: number = 1;
  subTasks: SubTask[] = [];
  ready: boolean = false;

  constructor(id: number, title: string, ready: boolean = false) {
    this.id = id;
    this.title = title;
    this.ready = ready;
  }
}

import { Task } from "./task.model";

export class Column {
  id: number = 0;
  name: string = "";
  tasks: Task[] = [];

  constructor(id: number, name: string, tasks: Task[]) {
    this.name = name;
    this.tasks = tasks;
  }
}

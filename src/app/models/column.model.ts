import { Task } from "./task.model";

export class Column {
  id: number = 0;
  name: string = "";
  tasks: Task[] = [];

  get tasksName() {
    return this.tasks.map(x => x.title);
  }

  constructor(name: string, tasks: Task[]) {
    this.name = name;
    this.tasks = tasks;
  }
}

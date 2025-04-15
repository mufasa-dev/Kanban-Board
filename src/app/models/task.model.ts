export class Task {
  id: number = 0;
  title: string = "";
  description: string = "";
  user: string = "";
  status: string = "";
  type: number = 1;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }
}

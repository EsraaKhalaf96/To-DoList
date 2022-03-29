export  interface IToDo{
  userId?: number,
  id?: number,
  title?: string,
  completed?: boolean,
}
export class toDo implements IToDo {
  constructor(
    public id?: number,
    public title?: string,
    public completed?: boolean,
  ) {}
}

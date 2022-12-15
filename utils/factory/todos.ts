class TodoData {
  readonly createdAt = Date.now();
  constructor(
    public title: string,
    public desc: string,
    public prio: "low" | "med" | "high",
    public done: boolean,
    public due: number,
    public projectId: number
  ) {
    this.desc = desc;
    this.title = title;
    this.prio = prio;
    this.done = done;
    this.due = due;
    this.projectId = projectId;
  }
}

export default TodoData;

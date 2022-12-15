// class TodoData {
//   title: string;
//   desc: string | null;
//   prio: string | null;
//   done: boolean;
//   due: number | null;

//   constructor(
//     title: string,
//     desc: string | null,
//     prio: string | null,
//     done: boolean = null,
//     due: number | null = null,
//   ) {
//     this.title = title;
//     this.desc = desc || null;
//     this.prio = prio || null;
//     this.done = done;
//     this.due = due || null;
//   }
// }

class TodoData {
  readonly createdAt = Date.now();
  constructor(
    public title: string,
    public desc: string | null = null,
    public prio: "low" | "med" | "high" | null = null,
    public done: boolean,
    public due: number | null = null,
    public projectId: number | null = null
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

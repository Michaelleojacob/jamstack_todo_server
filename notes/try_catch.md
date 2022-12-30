only need try catch on the route functions, not the inner db calls from util functions.

example:

if i do:

```
###
delete http://localhost:3002/todos/delete/2
```

AND no todo with that id exists, it crashes the app.

---

put try catch on this:

```js
todoRouter.delete(
  "/delete/:id",
  verifyToken,
  async (req: CRequest, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (req.userData) {
        await deleteTodo(id);
        return res.status(200).json({ msg: `deleted todo ${id}` });
      }
      throw new Error("no userData in delete todo http request");
    } catch (e) {
      console.log(e);
      return res.status(400).json({ msg: `no todo deleted.` });
    }
  }
);
```

NOT on this:

```js
const deleteTodo = async (id: number) =>
  await prisma.todo.delete({ where: { id } });
```

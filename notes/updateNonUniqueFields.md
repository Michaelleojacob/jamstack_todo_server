link: https://stackoverflow.com/questions/67556792/prisma-update-using-where-with-non-unique-fields

in utils/db/todos

goal: update a todo

issue: make sure todo being updated belongs to the user updating it.

```js
// attempting to do something like this in prisma:
if (todo.id === id && author.id === authorid)
```

Find todo by id AND make sure the todo's author id is the author.
Makes sure other users can't update a task for another person.

```js
const updatedTodo = await prisma.todo.update({
    where: { id, authorId },
    data: { //stuff },
});
```

ran into an issue since where can only find `@Unique` values.

fix was to add:

```js
generator client {
  provider = "prisma-client-js"
   previewFeatures = ["extendedWhereUnique"]
}
```

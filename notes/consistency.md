validation should just be sanitization. I'll do error handling and db checks inside the end points/db calls.

CRUD - Create Read Update Delete
3/4 should already include an authorId.
Only create will not include a user id.

I have settled on letting the token have full control over the user db calls.
Security and token stealing is not a concern for me and this toy app.

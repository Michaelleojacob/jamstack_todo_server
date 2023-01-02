import express from "express";
import verifyToken from "../../middleware/verifyToken";
const projectRouter = express.Router();

// get all projects
projectRouter.get("/", verifyToken);

// get single project (with todos)
projectRouter.get("/:id", verifyToken);

// create project
projectRouter.post("/", verifyToken);

// update a single project
projectRouter.put("/:id", verifyToken);

// delete a project
projectRouter.delete("/:id", verifyToken);

export default projectRouter;

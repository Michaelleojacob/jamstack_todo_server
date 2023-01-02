import express from "express";
import {
  createProjectController,
  deleteProjectController,
  getAllprojects,
  getSpecificProject,
  updateProjectController,
} from "../../controllers/projects/projects";
import verifyToken from "../../middleware/verifyToken";
import {
  sanitizeCreateProject,
  sanitizeUpdateProject,
} from "../../validations/projects/projects";
const projectRouter = express.Router();

// get all projects
projectRouter.get("/", verifyToken, getAllprojects);

// get single project (with todos)
projectRouter.get("/:id", verifyToken, getSpecificProject);

// create project
projectRouter.post(
  "/",
  verifyToken,
  sanitizeCreateProject,
  createProjectController
);

// update a single project
projectRouter.put(
  "/:id",
  verifyToken,
  sanitizeUpdateProject,
  updateProjectController
);

// delete a project
projectRouter.delete("/:id", verifyToken, deleteProjectController);

export default projectRouter;

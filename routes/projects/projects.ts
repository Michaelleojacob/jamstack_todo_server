import express, { Response } from "express";
import verifyToken from "../../middleware/verifyToken";
import { CRequest } from "../../types/types";
import {
  createProject,
  deleteProjectAndDeleteAssociatedTasks,
  deleteProjectById,
  findCorrespondingTodos,
  findProjectById,
  getProjects,
  projectBelongsToUser,
  updateProject,
} from "../../utils/db/projects";
const projectRouter = express.Router();

// get all projects for the user
projectRouter.get("/", verifyToken, async (req: CRequest, res: Response) => {
  try {
    if (req.userData) {
      const projects = await getProjects(req.userData.id);
      return res.status(200).json({ info: "got projects", projects });
    }
  } catch (e) {
    return res.status(400).json({ info: "err getting all projects" });
  }
});

// get specific project and all corresponding todos
projectRouter.get("/:id", verifyToken, async (req: CRequest, res: Response) => {
  try {
    if (req.userData) {
      const id = Number(req.params.id);
      const projects = await findCorrespondingTodos(id);
      console.log(projects);
      return res.status(200).json({ info: "got project", projects });
    }
  } catch (e) {
    return res.status(400).json({ info: "err getting all projects" });
  }
});

// create project
projectRouter.post("/", verifyToken, async (req: CRequest, res: Response) => {
  try {
    if (req.userData) {
      const { title } = req.body;
      const newProj = await createProject({ title, authorId: req.userData.id });
      return res.status(200).json({ info: "proj created", newProj });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({ info: "err creating proj", e });
  }
});

// update project
projectRouter.put(
  "/update/:id",
  verifyToken,
  async (req: CRequest, res: Response) => {
    try {
      if (req.userData) {
        const { newTitle } = req.body;
        const id = Number(req.params.id);
        const updatedProj = await updateProject({
          newTitle,
          id,
          authorId: req.userData.id,
        });

        return res.status(200).json({ info: "updated project", updatedProj });
      }
    } catch (e) {
      return res.status(400).json({ info: "err in updateProject", e });
    }
  }
);

// delete project + keep all associated todos
projectRouter.delete(
  "/:id",
  verifyToken,
  async (req: CRequest, res: Response) => {
    try {
      if (!req.userData) throw Error("no user");
      const id = Number(req.params.id);
      const result = await projectBelongsToUser(id, req.userData.id);
      if (!result) throw Error("no project found");
      deleteProjectById(Number(req.params.id));
      return res.status(200).json({ info: "deleted project successfully" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ info: "err deleting based on id", e });
    }
  }
);

// delete project + remove all associated todos
projectRouter.delete(
  "/all/:id",
  verifyToken,
  async (req: CRequest, res: Response) => {
    try {
      if (!req.userData) throw Error("no user");
      const id = Number(req.params.id);
      const checkProject = await findProjectById(id);
      if (!checkProject) throw Error("no proj found");
      await deleteProjectAndDeleteAssociatedTasks(id, req.userData.id);
      return res
        .status(200)
        .json({ info: "deleted project and all associated todos" });
    } catch (e) {
      return res
        .status(400)
        .json({ info: "couldn't delete project and linked todos" });
    }
  }
);

export default projectRouter;

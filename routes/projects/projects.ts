import express, { Response } from "express";
import verifyToken from "../../middleware/verifyToken";
import { CRequest } from "../../types/types";
import {
  createProject,
  getProjects,
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
      const projects = await getProjects(req.userData.id);
      return res.status(200).json({ info: "got projects", projects });
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
  "/delete",
  verifyToken,
  async (req: CRequest, res: Response) => {
    try {
      return res.status(200).json({ info: "" });
    } catch (e) {
      return res.status(400).json({ info: "" });
    }
  }
);

// delete project + remove all associated todos
projectRouter.delete(
  "/delete/all",
  verifyToken,
  async (req: CRequest, res: Response) => {
    try {
      return res.status(200).json({ info: "" });
    } catch (e) {
      return res.status(400).json({ info: "" });
    }
  }
);

export default projectRouter;

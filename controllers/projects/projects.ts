import { Response, NextFunction } from "express";
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from "../../db/projects";
import { CRequest } from "../../types/types";

export const getAllprojects = async (req: CRequest, res: Response) => {
  try {
    if (!req.userData)
      return res.status(400).json({ msg: "no token", succ: false });
    const projects = await getProjects(req.userData.id);
    return res.status(200).json({ msg: "got projects", projects, succ: true });
  } catch (e) {
    console.log(e, "error in getAllProjects");
    return res
      .status(400)
      .json({ msg: "error in getAllProjects", succ: false });
  }
};

export const getSpecificProject = async (req: CRequest, res: Response) => {
  try {
    if (!req.userData)
      return res.status(400).json({ msg: "no token", succ: false });
    if (!req.params.projectId) throw Error("no projectId provided");
    const projectId = Number(req.params.projectId);
    const project = await getProject(projectId);
    return res.status(200).json({ project });
  } catch (e) {
    console.log(e, "error in getSpecificProject");
    return res.status(400).json({ msg: "error in getSpecificProject" });
  }
};

// calling this controller since the db function is already called createProject.
// can't have two createProjects
export const createProjectController = async (req: CRequest, res: Response) => {
  try {
    if (!req.userData)
      return res.status(400).json({ msg: "no token", succ: false });
    const { title } = req.body;
    const project = await createProject({ authorId: req.userData.id, title });
    return res
      .status(200)
      .json({ project, succ: true, msg: "created project" });
  } catch (e) {
    console.log(e, "error in createProjectController");
    return res
      .status(400)
      .json({ msg: "error in createProjectController", succ: false });
  }
};

// db call is called updateProject, so I added controller
export const updateProjectController = async (req: CRequest, res: Response) => {
  try {
    if (!req.userData)
      return res.status(400).json({ msg: "no token", succ: false });
    const { title }: { title: string } = req.body;
    const projectId = Number(req.params.projectId);
    const updatedProject = await updateProject({ title, projectId });
    return res
      .status(200)
      .json({ msg: "updated project", updatedProject, succ: true });
  } catch (e) {
    console.log(e, "error in updateProjectController");
    return res
      .status(400)
      .json({ msg: "error in updateProjectController", succ: false });
  }
};

export const deleteProjectController = async (req: CRequest, res: Response) => {
  try {
    if (!req.userData)
      return res.status(400).json({ msg: "no token", succ: false });
    if (!req.params.projectId) throw Error("no projectId provided");
    const id = Number(req.params.projectId);
    const result = await deleteProject(id);
    if (result)
      return res.status(200).json({ succ: true, msg: "project deleted" });
    if (!result)
      return res
        .status(400)
        .json({ msg: "error in deleteProjectController", succ: false });
  } catch (e) {
    console.log(e, "error in deleteProjectController");
    return res
      .status(400)
      .json({ msg: "error in deleteProjectController", succ: false });
  }
};

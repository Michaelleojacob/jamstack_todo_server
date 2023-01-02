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
    if (!req.userData) throw Error("no token");
    const projects = await getProjects(req.userData.id);
    return res.status(200).json({ projects });
  } catch (e) {
    console.log(e, "err in getAllProjects");
    return res.status(400).json({ msg: "err in getAllProjects" });
  }
};

export const getSpecificProject = async (req: CRequest, res: Response) => {
  try {
    if (!req.userData) throw Error("no token");
    if (!req.params.id) throw Error("no projectId provided");
    const projectId = Number(req.params.projectId);
    const project = await getProject(projectId);
    return res.status(200).json({ project });
  } catch (e) {
    console.log(e, "err in getSpecificProject");
    return res.status(400).json({ msg: "err in getSpecificProject" });
  }
};

// calling this controller since the db function is already called createProject.
// can't have two createProjects
export const createProjectController = async (req: CRequest, res: Response) => {
  try {
    if (!req.userData) throw Error("no token");
    const { title } = req.body;
    const project = await createProject({ authorId: req.userData.id, title });
    return res.status(200).json({ project });
  } catch (e) {
    console.log(e, "err in createProjectController");
    return res.status(400).json({ msg: "err in createProjectController" });
  }
};

// db call is called updateProject, so I added controller
export const updateProjectController = async (req: CRequest, res: Response) => {
  try {
    if (!req.userData) throw Error("no token");
    const { newTitle } = req.body;
    const projectId = Number(req.params.id);
    const updatedProject = await updateProject({ newTitle, projectId });
    return res.status(200).json({ updatedProject });
  } catch (e) {
    console.log(e, "err in updateProjectController");
    return res.status(400).json({ msg: "err in updateProjectController" });
  }
};

export const deleteProjectController = async (req: CRequest, res: Response) => {
  try {
    if (!req.userData) throw Error("no token");
    if (!req.params.id) throw Error("no projectId provided");
    const id = Number(req.params.id);
    const result = await deleteProject(id);
    return res.status(200).json({ result });
  } catch (e) {
    console.log(e, "err in deleteProjectController");
    return res.status(400).json({ msg: "err in deleteProjectController" });
  }
};

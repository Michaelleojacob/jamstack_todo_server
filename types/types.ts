import { Request } from "express";

export interface User {
  username: string;
  password: string;
  id: number;
}

export interface UserInfo {
  username: string;
  id: number;
}

export interface JwtPayload {
  user: User;
  iat: number;
  exp: number;
}

export interface TokenData {
  id: number;
  username: string;
  iat: number;
  exp: number;
}

export interface CRequest extends Request {
  token?: string;
  userData?: TokenData;
}

export interface Todo {
  title: string;
  desc?: string;
  notes?: string;
  prio?: "low" | "medium" | "high";
  due?: Date;
  creation?: Date;
  done?: boolean;
  projectId?: number;
  authorId: number;
}

export interface UpdateTodo {
  title?: string;
  desc?: string;
  notes?: string;
  prio?: "low" | "medium" | "high";
  due?: Date;
  creation?: Date;
  done?: boolean;
  projectId?: number;
  id: number;
}

export interface ProjectAuthorId {
  title: string;
  authorId: number;
}

export interface Project {
  title: string;
  projectId: number;
}

export interface UpdateProjectByAuthorId {
  title: string;
  projectId: number;
  authorId: number;
}

export interface UpdateprojectByProjectId {
  title: string;
  projectId: number;
}

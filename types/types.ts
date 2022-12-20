import { Request } from "express";

export interface User {
  username: string;
  password?: string;
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
  prio?: "low" | "medium" | "high";
  due?: Date;
  creation?: Date;
  done?: boolean;
  projectId?: number;
  authorId: number;
  id: number;
}

export interface Project {
  title: string;
  authorId: number;
}

export interface UpdateProject {
  newTitle: string;
  id: number;
  authorId: number;
}

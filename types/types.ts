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
  id?: number;
  username?: string;
  iat?: number;
  exp?: number;
}

export interface CRequest extends Request {
  token?: string;
  data?: TokenData;
}

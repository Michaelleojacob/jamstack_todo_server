import { Response } from "express";
import { CRequest } from "../../types/types";

const protectedEndPoint = async (req: CRequest, res: Response) => {
  try {
    if (!req.userData) throw Error("no user");
    return res
      .status(200)
      .json({ msg: "hit protected end point", user: req.userData });
  } catch (e) {
    console.log(e, "error getting protected end point");
    return res.status(400).json({ msg: "error getting protected end point" });
  }
};

export default protectedEndPoint;

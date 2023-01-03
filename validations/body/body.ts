import { body, param } from "express-validator";

const sanitizeAllInput = [body().escape(), param().escape()];

export default sanitizeAllInput;

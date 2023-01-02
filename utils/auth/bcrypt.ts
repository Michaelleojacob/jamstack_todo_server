import bcrypt from "bcrypt";

export const hashPassword = async (str: string) => {
  const salt = bcrypt.genSaltSync(+process.env.SALT!);
  return bcrypt.hashSync(str, salt);
};

export const comparePassword = async (str: string, hash: string) => {
  return bcrypt.compareSync(str, hash);
};

import bcrypt from "bcrypt";

const hashPassword = async (str: string) => {
  const salt = bcrypt.genSaltSync(+process.env.SALT!);
  return bcrypt.hashSync(str, salt);
};

const comparePassword = async (str: string, hash: string) => {
  return bcrypt.compareSync(str, hash);
};

export { hashPassword, comparePassword };

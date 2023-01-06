const checkId = (id: number) => {
  try {
    if (id === 5) {
      console.log("this worked");
    } else {
      const error = new error("lol");
      delete error.stack;
      throw Error;
    }
  } catch (error) {
    console.log(error);
  }
};

const lol = checkId(3);
console.log(lol);

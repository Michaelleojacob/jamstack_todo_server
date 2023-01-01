const checkId = (id: number) => {
  try {
    if (id === 5) {
      console.log("this worked");
    } else {
      const err = new Error("lol");
      delete err.stack;
      throw err;
    }
  } catch (err) {
    console.log(err);
  }
};

const lol = checkId(3);
console.log(lol);

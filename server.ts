import app from "./app";
const port = process.env.PORT || process.env.port || 3002;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

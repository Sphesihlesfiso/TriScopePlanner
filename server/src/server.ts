import app from "./app";
const port = parseInt(process.env.SERVER_PORT || "3000", 10);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

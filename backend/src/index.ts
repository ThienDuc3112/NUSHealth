import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hi");
});

const port = process.env.PORT ?? 3030;

app.listen(port, () => {
  console.log(`Server open at port ${port}`);
});

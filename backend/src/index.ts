console.log("Starting...");
import express from "express";
import cors from "cors";
import { userRouter } from "./router/user";
import { authRouter } from "./router/auth";

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log("========== ", req.method, " ", req.url, " ==========\n");
  console.log("req.body: ", JSON.stringify(req.body));
  console.log("\n==============================");
  next();
});

app.get("/", (req, res) => {
  res.send("Hi");
});

const port = process.env.PORT ?? 6543;

app.use("/user", userRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server open at port ${port}`);
});
//

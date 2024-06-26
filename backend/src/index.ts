console.log("Starting...");
import express from "express";
import cors from "cors";
import { userRouter } from "./router/user";
import { authRouter } from "./router/auth";
import { imageRouter } from "./router/image";
import { postRouter } from "./router/post";

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, _, next) => {
  console.log("========== ", req.method, " ", req.url, " ==========\n");
  console.log("req.body:");
  console.log(JSON.stringify(req.body, null, 2));

  console.log("\n==============================");
  next();
});

app.get("/", (_, res) => {
  res.send("Hi");
});

const port = process.env.PORT ?? 6543;

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/image", imageRouter);
app.use("/post", postRouter)

app.listen(port, () => {
  console.log(`Server open at port ${port}`);
});

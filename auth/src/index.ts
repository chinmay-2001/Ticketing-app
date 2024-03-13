import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signoutRouter } from "./routes/signout";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handlers";
import { NotFoundError } from "./errors/not-found-error";
import cookieSession from "cookie-session";
import "express-async-errors";
import mongoose from "mongoose";
const app = express();

// app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
  })
);
app.use(currentUserRouter);
app.use(signoutRouter);
app.use(signinRouter);
app.use(signupRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);
const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://chinmay:chinmay2001*@atlascluster.qla0xds.mongodb.net/auth?retryWrites=true&w=majority"
    );
    console.log("connected to mongodb");
  } catch (err) {
    console.log("err:", err);
  }
};

app.listen(3000, () => {
  console.log("listening on port 3000!");
});
start();

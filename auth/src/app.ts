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

const app = express();
const keys = ["dummy-key"];

app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    keys: keys,
    signed: false,
    secure: process.env.NODE_ENV !== "test",
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

export { app };

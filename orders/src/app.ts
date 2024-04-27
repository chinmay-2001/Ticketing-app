import express from "express";
import { json } from "body-parser";
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@chinmayticketsinno/common";
import { deleteOrderRouter } from "./routes/delete";
import { indexOrderRouter } from "./routes/index";
import { showOrderRouter } from "./routes/show";
import { newOrderRouter } from "./routes/new";

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
app.use(currentUser);
app.use(deleteOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(newOrderRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };

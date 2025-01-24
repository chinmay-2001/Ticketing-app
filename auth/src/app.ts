import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signoutRouter } from "./routes/signout";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { refreshToken } from "./routes/refreshToken";
import { errorHandler, NotFoundError } from "@ticketsappchinmay/common";
import cors from "cors";

import cookieSession from "cookie-session";
const cookieParser = require("cookie-parser");

import "express-async-errors";

const app = express();
const keys = ["dummy-key"];

app.set("trust proxy", true);
app.use(json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://ticketing.dev/");
  res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true"); // If using cookies
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
app.use(
  cors({
    origin: "https://ticketing.dev/", // Frontend URL
    credentials: true, // Allow cookies
  })
);
app.use(cookieParser());
app.use(currentUserRouter);
app.use(refreshToken);
app.use(signoutRouter);
app.use(signinRouter);
app.use(signupRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };

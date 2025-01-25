import express from "express";
import passport from "passport";
import { Request, Response } from "express";
import "express-async-errors";

const router = express.Router();
router.get(
  "/api/users/google-signin",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/api/users/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req: Request, res: Response) => {
    // Successful authentication
    res.redirect("/");
  }
);

export { router as googleLogin };

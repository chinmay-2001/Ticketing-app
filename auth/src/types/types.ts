import { Profile } from "passport-google-oauth20";
import { Express } from "express";
export interface User extends Express.User {
  email: string;
  username: string;
}

declare module "cors" {
  import { RequestHandler } from "express";
  const cors: (options?: any) => RequestHandler;
  export = cors;
}

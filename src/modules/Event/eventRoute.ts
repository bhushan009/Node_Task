import { Router } from "express";
import { Validator } from "../../validate";

const router: Router = Router();
const v: Validator = new Validator();

export const ProductRoute: Router = router;
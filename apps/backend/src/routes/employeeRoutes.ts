import { Router } from "express";
import { requireAuth } from "@clerk/express";
import employeeController from "../controllers/employeeController";

const router = Router();

router.get("/", employeeController.getDepartments);
router.post("/", requireAuth(), employeeController.createEmployee);

export default router;
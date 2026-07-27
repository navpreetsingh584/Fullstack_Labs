import { Router } from "express";
import { requireAuth } from "@clerk/express";
import organizationController from "../controllers/organizationController";

const router = Router();

router.get("/", organizationController.getMembers);
router.post("/", requireAuth(), organizationController.createMember);

export default router;
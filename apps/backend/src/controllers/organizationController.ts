import { Request, Response } from "express";
import organizationService from "../services/organizationService";

const organizationController = {
  async getMembers(req: Request, res: Response) {
    const members = await organizationService.getMembers();
    res.json(members);
  },

  async createMember(req: Request, res: Response) {
    const { firstName, lastName, role } = req.body;

    if (!firstName || !lastName || !role) {
      res.status(400).json({ error: "Missing required fields." });
      return;
    }

    const result = await organizationService.createMember(
      firstName,
      lastName,
      role
    );

    if (!result.success) {
      res.status(400).json({ errors: result.errors });
      return;
    }

    res.status(201).json(result.members);
  },
};

export default organizationController;
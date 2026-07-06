import type { Role } from "../types";
import organizationRepo from "../repositories/organizationRepo";

export interface CreateMemberResult {
  success: boolean;
  members?: Role[];
  errors?: {
    firstName?: string[];
    role?: string[];
  };
}

const organizationService = {
  async getMembers(): Promise<Role[]> {
    return organizationRepo.getMembers();
  },

  async createMember(
    firstName: string,
    lastName: string,
    role: string
  ): Promise<CreateMemberResult> {
    const errors: CreateMemberResult["errors"] = {};

    if (firstName.trim().length < 3) {
      errors.firstName = ["First name must be at least 3 characters."];
    }

    if (role.trim().length === 0) {
      errors.role = ["Role cannot be empty."];
    }

    const existingRole = await organizationRepo.getRoleByName(role.trim());
    if (existingRole) {
      errors.role = [`The role "${role}" is already occupied.`];
    }

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    const updatedMembers = await organizationRepo.createMember(
      firstName.trim(),
      lastName.trim(),
      role.trim()
    );

    return { success: true, members: updatedMembers };
  },
};

export default organizationService;
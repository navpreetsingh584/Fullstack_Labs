import type { Role } from "../interfaces/Employee";
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
    role: string,
    token: string
  ): Promise<CreateMemberResult> {
    const errors: CreateMemberResult["errors"] = {};

    if (firstName.trim().length < 3) {
      errors.firstName = ["First name must be at least 3 characters."];
    }

    if (role.trim().length === 0) {
      errors.role = ["Role cannot be empty."];
    }

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    const updatedMembers = await organizationRepo.createMember(
      firstName.trim(),
      lastName.trim(),
      role.trim(),
      token
    );

    if (!updatedMembers) {
      return {
        success: false,
        errors: { role: ["Failed to add member."] },
      };
    }

    return { success: true, members: updatedMembers };
  },
};

export default organizationService;
import { PrismaClient } from "@prisma/client";
import type { Role } from "../types";

const prisma = new PrismaClient();

const organizationRepo = {
  async getMembers(): Promise<Role[]> {
    const members = await prisma.role.findMany();
    return members.map((m) => ({
      firstName: m.firstName,
      lastName: m.lastName,
      role: m.role,
    }));
  },

  async getRoleByName(role: string): Promise<Role | undefined> {
    const member = await prisma.role.findFirst({
      where: {
        role: { equals: role, mode: "insensitive" },
      },
    });
    if (!member) return undefined;
    return {
      firstName: member.firstName,
      lastName: member.lastName,
      role: member.role,
    };
  },

  async createMember(
    firstName: string,
    lastName: string,
    role: string
  ): Promise<Role[]> {
    await prisma.role.create({
      data: { firstName, lastName, role },
    });
    return organizationRepo.getMembers();
  },
};

export default organizationRepo;
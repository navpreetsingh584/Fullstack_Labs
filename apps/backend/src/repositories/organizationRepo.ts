import { PrismaClient } from "@prisma/client";
import type { Role } from "../types";

const prisma = new PrismaClient();

const organizationRepo = {
  async getMembers(): Promise<Role[]> {
    const members = await prisma.role.findMany({
      include: { employee: true },
    });
    return members.map((m) => ({
      firstName: m.employee.firstName,
      lastName: m.employee.lastName,
      role: m.role,
    }));
  },

  async getRoleByName(role: string): Promise<Role | undefined> {
    const member = await prisma.role.findFirst({
      where: {
        role: { equals: role, mode: "insensitive" },
      },
      include: { employee: true },
    });
    if (!member) return undefined;
    return {
      firstName: member.employee.firstName,
      lastName: member.employee.lastName,
      role: member.role,
    };
  },

  async createMember(
    firstName: string,
    lastName: string,
    role: string
  ): Promise<Role[]> {
    // Find or create Executive department
    let dept = await prisma.department.findUnique({
      where: { name: "Executive" },
    });
    if (!dept) {
      dept = await prisma.department.create({
        data: { name: "Executive" },
      });
    }

    const employee = await prisma.employee.create({
      data: { firstName, lastName, departmentId: dept.id },
    });

    await prisma.role.create({
      data: { role, employeeId: employee.id },
    });

    return organizationRepo.getMembers();
  },
};

export default organizationRepo;
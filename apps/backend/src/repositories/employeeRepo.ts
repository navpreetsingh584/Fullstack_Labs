import { PrismaClient } from "@prisma/client";
import type { Department } from "../types";

const prisma = new PrismaClient();

const employeeRepo = {
  async getDepartments(): Promise<Department[]> {
    const departments = await prisma.department.findMany({
      include: { employees: true },
    });
    return departments.map((dept) => ({
      name: dept.name,
      employees: dept.employees.map((emp) => ({
        firstName: emp.firstName,
        lastName: emp.lastName,
      })),
    }));
  },

  async getDepartmentByName(name: string): Promise<Department | undefined> {
    const dept = await prisma.department.findUnique({
      where: { name },
      include: { employees: true },
    });
    if (!dept) return undefined;
    return {
      name: dept.name,
      employees: dept.employees.map((emp) => ({
        firstName: emp.firstName,
        lastName: emp.lastName,
      })),
    };
  },

  async createEmployee(
    firstName: string,
    lastName: string,
    departmentName: string
  ): Promise<Department[] | null> {
    const dept = await prisma.department.findUnique({
      where: { name: departmentName },
    });
    if (!dept) return null;

    await prisma.employee.create({
      data: { firstName, lastName, departmentId: dept.id },
    });

    return employeeRepo.getDepartments();
  },
};

export default employeeRepo;
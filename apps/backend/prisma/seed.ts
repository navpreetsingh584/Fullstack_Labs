import { PrismaClient } from "@prisma/client";
import employeesData from "../src/data/employees.json";
import organizationData from "../src/data/organization.json";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  for (const dept of employeesData) {
    const department = await prisma.department.create({
      data: {
        name: dept.name,
        employees: {
          create: dept.employees.map((emp: { firstName: string; lastName: string }) => ({
            firstName: emp.firstName,
            lastName: emp.lastName,
          })),
        },
      },
    });
    console.log(`Created department: ${department.name}`);
  }

  for (const member of organizationData) {
    const role = await prisma.role.create({
      data: {
        firstName: member.firstName,
        lastName: member.lastName,
        role: member.role,
      },
    });
    console.log(`Created role: ${role.role}`);
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

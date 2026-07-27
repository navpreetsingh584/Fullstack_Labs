import { PrismaClient } from "@prisma/client";
import employeesData from "../src/data/employees.json";
import organizationData from "../src/data/organization.json";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Seed departments and employees
  for (const dept of employeesData) {
    await prisma.department.create({
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
    console.log(`Created department: ${dept.name}`);
  }

  // Create a special department for organization members
  const orgDept = await prisma.department.create({
    data: { name: "Executive" },
  });

  // Seed roles — create employee for each org member then link role
  for (const member of organizationData) {
    const employee = await prisma.employee.create({
      data: {
        firstName: member.firstName,
        lastName: member.lastName,
        departmentId: orgDept.id,
      },
    });

    await prisma.role.create({
      data: {
        role: member.role,
        employeeId: employee.id,
      },
    });
    console.log(`Created role: ${member.role}`);
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
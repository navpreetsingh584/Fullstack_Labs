import type { Department } from "../interfaces/Employee";
import employeeRepo from "../repositories/employeeRepo";

export interface CreateEmployeeResult {
  success: boolean;
  departments?: Department[];
  errors?: {
    firstName?: string[];
    department?: string[];
  };
}

const employeeService = {
  async getDepartments(): Promise<Department[]> {
    return employeeRepo.getDepartments();
  },

  async createEmployee(
    firstName: string,
    lastName: string,
    departmentName: string,
    token: string
  ): Promise<CreateEmployeeResult> {
    const errors: CreateEmployeeResult["errors"] = {};

    if (firstName.trim().length < 3) {
      errors.firstName = ["First name must be at least 3 characters."];
    }

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    const updatedDepartments = await employeeRepo.createEmployee(
      firstName.trim(),
      lastName.trim(),
      departmentName,
      token
    );

    if (!updatedDepartments) {
      return {
        success: false,
        errors: { department: ["Failed to add employee."] },
      };
    }

    return { success: true, departments: updatedDepartments };
  },
};

export default employeeService;
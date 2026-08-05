import type { Department } from "../interfaces/Employee";

const BASE_URL = "https://fullstack-labs.onrender.com";

const employeeRepo = {
  async getDepartments(): Promise<Department[]> {
    const response = await fetch(`${BASE_URL}/employees`);
    return response.json();
  },

  async createEmployee(
    firstName: string,
    lastName: string,
    departmentName: string,
    token: string
  ): Promise<Department[] | null> {
    const response = await fetch(`${BASE_URL}/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ firstName, lastName, departmentName }),
    });

    if (!response.ok) return null;
    return response.json();
  },
};

export default employeeRepo;
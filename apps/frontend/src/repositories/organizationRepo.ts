import type { Role } from "../interfaces/Employee";

const BASE_URL = "http://localhost:4000";

const organizationRepo = {
  async getMembers(): Promise<Role[]> {
    const response = await fetch(`${BASE_URL}/organization`);
    return response.json();
  },

  async createMember(
    firstName: string,
    lastName: string,
    role: string,
    token: string
  ): Promise<Role[] | null> {
    const response = await fetch(`${BASE_URL}/organization`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ firstName, lastName, role }),
    });

    if (!response.ok) return null;
    return response.json();
  },
};

export default organizationRepo;
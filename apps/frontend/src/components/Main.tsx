import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import type { Department } from "../interfaces/Employee";
import employeeService from "../services/employeeService";
import AddEmployeeForm from "./AddEmployeeForm";

function Main() {
  const { isSignedIn, getToken } = useAuth();
  const [departmentList, setDepartmentList] = useState<Department[]>([]);

  useEffect(() => {
    employeeService.getDepartments().then(setDepartmentList);
  }, []);

  async function handleAddEmployee(
    firstName: string,
    lastName: string,
    departmentName: string
  ) {
    const token = await getToken();
    const result = await employeeService.createEmployee(
      firstName,
      lastName,
      departmentName,
      token ?? ""
    );

    if (result.success && result.departments) {
      setDepartmentList(result.departments);
    } else {
      console.error("Failed to add employee:", result.errors);
    }
  }

  return (
    <main>
      <h2>Departments</h2>
      {departmentList.map((department) => (
        <section key={department.name}>
          <h3>{department.name}</h3>
          {department.employees.map((employee) => (
            <p key={`${employee.firstName}-${employee.lastName}`}>
              {employee.firstName} {employee.lastName}
            </p>
          ))}
        </section>
      ))}

      {isSignedIn ? (
        <AddEmployeeForm
          departments={departmentList}
          onAddEmployee={handleAddEmployee}
        />
      ) : (
        <div>
          <p>Please <a href="/sign-in">log in</a> to add employees.</p>
        </div>
      )}
    </main>
  );
}

export default Main;
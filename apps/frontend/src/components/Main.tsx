import { useAuth } from "@clerk/clerk-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Department } from "../interfaces/Employee";
import employeeService from "../services/employeeService";
import AddEmployeeForm from "./AddEmployeeForm";

function Main() {
  const { isSignedIn, getToken } = useAuth();
  const queryClient = useQueryClient();

  const { data: departmentList = [], isLoading } = useQuery({
    queryKey: ["departments"],
    queryFn: () => employeeService.getDepartments(),
  });

  const mutation = useMutation({
    mutationFn: async ({
      firstName,
      lastName,
      departmentName,
    }: {
      firstName: string;
      lastName: string;
      departmentName: string;
    }) => {
      const token = await getToken();
      return employeeService.createEmployee(
        firstName,
        lastName,
        departmentName,
        token ?? ""
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });

  async function handleAddEmployee(
    firstName: string,
    lastName: string,
    departmentName: string
  ) {
    mutation.mutate({ firstName, lastName, departmentName });
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <main>
      <h2>Departments</h2>
      {departmentList.map((department: Department) => (
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
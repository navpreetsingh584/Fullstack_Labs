import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Role } from "../interfaces/Employee";
import organizationService from "../services/organizationService";
import AddRoleForm from "./AddRoleForm";

export default function Organization() {
  const { isSignedIn, getToken } = useAuth();
  const queryClient = useQueryClient();
  const [roleError, setRoleError] = useState<string[]>([]);

  const { data: members = [], isLoading } = useQuery({
    queryKey: ["members"],
    queryFn: () => organizationService.getMembers(),
  });

  const mutation = useMutation({
    mutationFn: async ({
      firstName,
      lastName,
      role,
    }: {
      firstName: string;
      lastName: string;
      role: string;
    }) => {
      const token = await getToken();
      return organizationService.createMember(
        firstName,
        lastName,
        role,
        token ?? ""
      );
    },
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["members"] });
        setRoleError([]);
      } else {
        setRoleError(result.errors?.role ?? []);
      }
    },
  });

  async function handleAddMember(
    firstName: string,
    lastName: string,
    role: string
  ) {
    mutation.mutate({ firstName, lastName, role });
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <main>
      <h2>Organization</h2>
      {members.map((member: Role) => (
        <section key={`${member.firstName}-${member.lastName}`} className="org-row">
          <span>{member.firstName} {member.lastName}</span>
          <span>{member.role}</span>
        </section>
      ))}

      {isSignedIn ? (
        <AddRoleForm onAddMember={handleAddMember} roleMessages={roleError} />
      ) : (
        <div>
          <p>Please <a href="/sign-in">log in</a> to add roles.</p>
        </div>
      )}
    </main>
  );
}
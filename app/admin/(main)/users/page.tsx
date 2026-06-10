import getUsers from "@/api/get-users";
import getUserRoles from "@/api/get-user-roles";
import getRoles from "@/api/get-roles";
import UserRolesPanel from "@/components/users/user-roles-panel";
import type { Metadata } from "next";
import AdminTableContainer from "@/components/admin/admin-table-container";
import { AdminTable, AdminHeadRow, AdminRow, AdminTh, AdminTd } from "@/components/admin/table";

export const metadata: Metadata = {
    title: "Users page",
    description: "Users page",
};

export default async function Users() {
    const [users, allRoles] = await Promise.all([getUsers(), getRoles()]);

    const usersWithRoles = await Promise.all(
        users.map(async user => ({
            ...user,
            roles: await getUserRoles(user.id),
        }))
    );

    return (
        <AdminTableContainer>
            <AdminTable>
                <thead>
                    <AdminHeadRow>
                        <AdminTh>ID</AdminTh>
                        <AdminTh>Name</AdminTh>
                        <AdminTh>Email</AdminTh>
                        <AdminTh>Roles</AdminTh>
                    </AdminHeadRow>
                </thead>
                <tbody>
                    {usersWithRoles.map(user => (
                        <AdminRow key={user.id}>
                            <AdminTd className="text-xs">{user.id}</AdminTd>
                            <AdminTd>{user.name}</AdminTd>
                            <AdminTd>{user.email}</AdminTd>
                            <AdminTd>
                                <UserRolesPanel
                                    userId={user.id}
                                    userName={user.name ?? user.email}
                                    initialRoles={user.roles}
                                    allRoles={allRoles}
                                />
                            </AdminTd>
                        </AdminRow>
                    ))}
                </tbody>
            </AdminTable>
        </AdminTableContainer>
    );
}

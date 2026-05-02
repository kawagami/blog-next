import getUsers from "@/api/get-users";
import getUserRoles from "@/api/get-user-roles";
import getRoles from "@/api/get-roles";
import DeleteButton from "@/components/users/delete-button";
import UserRolesPanel from "@/components/users/user-roles-panel";
import type { Metadata } from "next";

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
        <div className="w-full h-[calc(100svh-180px)] overflow-auto p-6">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
                <table className="w-full border-collapse border border-gray-200 dark:border-gray-700">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-800">
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-gray-700 dark:text-gray-300">ID</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-gray-700 dark:text-gray-300">Name</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-gray-700 dark:text-gray-300">Email</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-gray-700 dark:text-gray-300">Roles</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center text-gray-700 dark:text-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersWithRoles.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100 text-xs">{user.id}</td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">{user.name}</td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">{user.email}</td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                    <UserRolesPanel
                                        userId={user.id}
                                        userName={user.name ?? user.email}
                                        initialRoles={user.roles}
                                        allRoles={allRoles}
                                    />
                                </td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">
                                    <DeleteButton user={user} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

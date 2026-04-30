import getRoles from "@/api/get-roles";
import getPermissions from "@/api/get-permissions";
import RolesManager from "@/components/roles/roles-manager";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Roles Management",
    description: "Manage roles and permissions",
};

export default async function RolesPage() {
    const [roles, permissions] = await Promise.all([getRoles(), getPermissions()]);

    return (
        <div className="w-full h-[calc(100svh-180px)] overflow-auto p-6">
            <RolesManager initialRoles={roles} allPermissions={permissions} />
        </div>
    );
}

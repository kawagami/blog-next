"use server";

import { revalidatePath } from 'next/cache';
import apiRequest from "@/libs/apiRequest";
import type { Role } from "@/types";

export async function createRole(formData: FormData): Promise<void> {
    await apiRequest<Role>({
        url: `${process.env.API_URL}/roles`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: formData.get('name'),
            description: formData.get('description') || undefined,
        }),
    });
    revalidatePath('/admin/roles');
}

export async function deleteRole(id: number): Promise<void> {
    await apiRequest<void>({
        url: `${process.env.API_URL}/roles/${id}`,
        method: 'DELETE',
    });
    revalidatePath('/admin/roles');
}

export async function setRolePermissions(roleId: number, permissionIds: number[]): Promise<void> {
    await apiRequest<void>({
        url: `${process.env.API_URL}/roles/${roleId}/permissions`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ permission_ids: permissionIds }),
    });
    revalidatePath('/admin/roles');
}

export async function setUserRoles(userId: string, roleIds: number[]): Promise<void> {
    await apiRequest<void>({
        url: `${process.env.API_URL}/users/${userId}/roles`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role_ids: roleIds }),
    });
    revalidatePath('/admin/users');
}

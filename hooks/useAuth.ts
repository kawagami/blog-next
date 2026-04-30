import { useAppContext } from '@/provider/app-provider';

export function useAuth() {
    const { user, refreshUser } = useAppContext();

    function hasPermission(permission: string): boolean {
        return user?.permissions.includes(permission) ?? false;
    }

    return { user, hasPermission, refreshUser };
}

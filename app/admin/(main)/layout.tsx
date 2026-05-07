import AdminSidebar from "@/components/admin/admin-sidebar";

export default function AdminMainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex w-full h-[calc(100svh-100px)]">
            <AdminSidebar />
            <div className="flex-1 overflow-auto p-4 sm:p-6">
                {children}
            </div>
        </div>
    );
}

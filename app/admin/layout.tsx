import Breadcrumb from "@/components/breadcrumb";
import LogoutButton from "@/components/login/logout-button";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex items-center justify-between">
                <Breadcrumb
                    homeElement={'Home'}
                    separator={<span> | </span>}
                    activeClasses='text-amber-500'
                    containerClasses='flex py-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded'
                    listClasses='hover:underline mx-2 font-bold'
                    capitalizeLinks
                />
                <LogoutButton />
            </div>
            {children}
        </>
    );
}

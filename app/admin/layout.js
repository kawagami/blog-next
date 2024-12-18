import Breadcrumb from "@/components/Breadcrumb";

export default function AdminLayout({ children }) {
    return (
        <>
            <Breadcrumb
                homeElement={'Home'}
                separator={<span> | </span>}
                activeClasses='text-amber-500'
                containerClasses='flex py-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded'
                listClasses='hover:underline mx-2 font-bold'
                capitalizeLinks
            />
            {children}
        </>
    )
}
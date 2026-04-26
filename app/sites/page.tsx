import SiteComponent from "@/components/site-component";
import SitesStore from "@/data/sites-store";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "sites",
    description: "sites",
};

export default function Sites() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SitesStore.map((item, index) => (
                <SiteComponent key={index} src={item.src} href={item.href} alt={item.alt} title={item.title} contents={item.contents} />
            ))}
        </div>
    );
}

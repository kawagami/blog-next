import getImages from "@/api/get-images";
import ImageManager from "@/components/images/ImageManager";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Images page",
    description: "Images page",
};

export default async function Images() {
    const images = await getImages();
    const managedImages = images.map(img => ({ name: img.id, url: img.url }));

    return (
        <div className="w-full h-[calc(100svh-120px)] overflow-auto">
            <ImageManager initialImages={managedImages} />
        </div>
    );
}

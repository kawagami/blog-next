import getImages from "@/api/get-images";
import ImageManager from "@/components/images/ImageManager";

export const metadata = {
    title: "Images page",
    description: "Images page",
};

export default async function Images() {
    const images = await getImages();

    return (
        <div className="w-full h-[calc(100svh-180px)] overflow-auto p-6">
            <ImageManager initialImages={images} />
        </div>
    );
}

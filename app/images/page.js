import getImages from "@/api/get-images";
import ImageManager from "@/components/images/ImageManager";

export const metadata = {
    title: "Images page",
    description: "Images page",
};

export default async function Images() {
    const images = await getImages();

    return (
        <div className="w-full h-[calc(100svh-120px)] overflow-auto">
            <ImageManager initialImages={images} />
        </div>
    );
}

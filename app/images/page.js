import getFirebaseImages from "@/api/get-firebase-images";
import FirebaseFormComponent from "@/components/firebase-form";
import Image from "next/image";

export const metadata = {
    title: "Images page",
    description: "Images page",
};

export default async function Images() {
    const images = await getFirebaseImages();

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-4">Images Page</h1>
            <FirebaseFormComponent />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {images.map((image) => (
                    <div key={image.name} className="bg-white p-4 rounded shadow-md flex flex-col items-center">
                        <Image
                            width={150}
                            height={150}
                            src={image.url}
                            alt={`Image ${image.name}`}
                            className="rounded-lg mb-4 object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

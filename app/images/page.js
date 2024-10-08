import FirebaseFormComponent from "@/components/firebase-form";
import getImageUrl from '@/api/get-image-url';

export const metadata = {
    title: "this is images page",
    description: "this is images page",
};

export default async function Images() {
    const imageurl = await getImageUrl();
    return (
        <>
            {/* <h1>
                this is images page
            </h1> */}
            <FirebaseFormComponent test={imageurl} />
        </>
    )
}
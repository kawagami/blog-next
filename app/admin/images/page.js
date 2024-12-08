import getFirebaseImages from "@/api/get-firebase-images";
import FirebaseImageManager from "@/components/firebase/FirebaseImageManager";

export const metadata = {
    title: "Images page",
    description: "Images page",
};

export default async function Images() {
    // 從伺服器獲取初始圖片
    const images = await getFirebaseImages();

    return (
        <div className="container mx-auto p-6">
            {/* 將初始圖片傳遞給客戶端組件 */}
            <FirebaseImageManager initialImages={images} />
        </div>
    );
}

'use client';

import { useState, useRef } from 'react';
import uploadFirebaseImage from '@/api/upload-firebase-image';
import deleteFirebaseImage from '@/api/delete-firebase-image';
import Image from 'next/image';

export default function FirebaseImageManager({ initialImages }) {
    const [images, setImages] = useState(initialImages); // 所有圖片的狀態
    const [deletingImage, setDeletingImage] = useState(null); // 追蹤正在刪除的圖片
    const [selectedImage, setSelectedImage] = useState(null); // 本地選擇的圖片
    const [isUploading, setIsUploading] = useState(false); // 是否正在上傳
    const fileInputRef = useRef(null);

    // 處理本地圖片選擇
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    // 清除選擇的本地圖片
    const removeSelectedImage = () => {
        setSelectedImage(null);
        fileInputRef.current.value = '';
    };

    // 上傳圖片
    const handleUpload = async () => {
        if (!selectedImage) return;
        setIsUploading(true);
        const bodyContent = new FormData();
        bodyContent.append('file', selectedImage);

        try {
            const response = await uploadFirebaseImage(bodyContent);
            if (response?.url) {
                setImages((prevImages) => [
                    ...prevImages,
                    { name: response.name, url: response.url },
                ]);
                removeSelectedImage();
            }
        } catch (error) {
            console.error('上傳失敗：', error.message);
        } finally {
            setIsUploading(false);
        }
    };

    // 刪除圖片
    const handleDelete = async (fileName) => {
        setDeletingImage(fileName);
        try {
            await deleteFirebaseImage({ file_name: fileName });
            setImages((prevImages) => prevImages.filter((img) => img.name !== fileName));
        } catch (error) {
            console.error('刪除失敗：', error.message);
        } finally {
            setDeletingImage(null);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-4">Firebase Image Manager</h1>

            {/* 圖片上傳區域 */}
            {/* <div className="flex flex-col justify-center items-center pt-4">
                <input
                    ref={fileInputRef}
                    accept="image/*"
                    type="file"
                    onChange={imageChange}
                    className="mt-4"
                />

                {selectedImage && (
                    <div className="mt-4 flex flex-col items-center">
                        <img
                            src={URL.createObjectURL(selectedImage)}
                            className="max-w-full max-h-80 rounded-lg"
                            alt="Selected Thumb"
                        />
                        <button
                            onClick={removeSelectedImage}
                            className="cursor-pointer py-2 px-4 bg-red-500 text-white mt-4 rounded"
                        >
                            Remove This Image
                        </button>
                    </div>
                )}

                <button
                    className={`py-2 px-4 rounded mt-4 ${isUploading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white'
                        }`}
                    onClick={handleUpload}
                    disabled={isUploading}
                >
                    {isUploading ? '上傳中...' : '上傳圖片'}
                </button>
            </div> */}

            {/* 圖片展示與刪除區域 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {images.map((image, index) => (
                    <div
                        key={`${image.name}-${index}`} // 確保 key 唯一性
                        className="bg-white p-4 rounded shadow-md flex flex-col items-center"
                    >
                        <Image
                            width={150}
                            height={150}
                            src={image.url}
                            alt={`Image ${image.name}`}
                            className="rounded-lg mb-4 object-cover"
                        />
                        <button
                            onClick={() => handleDelete(image.name)}
                            className={`mt-2 py-1 px-4 rounded transition ${deletingImage === image.name
                                ? 'bg-gray-500 cursor-not-allowed'
                                : 'bg-red-500 hover:bg-red-600 text-white'
                                }`}
                            disabled={deletingImage === image.name}
                        >
                            {deletingImage === image.name ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

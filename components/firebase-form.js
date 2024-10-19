'use client';

import createTodo from '@/api/create-todo';
import { useState, useRef } from 'react';

export default function FirebaseFormComponent() {
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null); // 顯示本地選取的圖片
    const [uploadedImages, setUploadedImages] = useState([]); // 上傳成功後的圖片 URL 陣列
    const [isUploading, setIsUploading] = useState(false); // 用來追蹤是否正在上傳

    const imageChange = (e) => {
        // 選取圖片後顯示預覽
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const removeSelectedImage = () => {
        // 清除預覽圖
        setSelectedImage(null);
        fileInputRef.current.value = '';
    };

    const SubmitButton = async () => {
        if (!selectedImage) {
            return;
        }
        setIsUploading(true); // 開始上傳時設置為 true
        let bodyContent = new FormData();
        bodyContent.append("file", selectedImage);

        try {
            let response = await createTodo(bodyContent);

            // 假設 response 裡面有 image_url
            if (response?.image_url) {
                setUploadedImages((prevImages) => [...prevImages, response.image_url]); // 將新的圖片 URL 添加到陣列中
            }
        } catch (error) {
            console.error("上傳失敗：", error);
        } finally {
            setIsUploading(false); // 上傳完成後設置為 false
        }
    };

    return (
        <>

            <div className="flex flex-col justify-center items-center pt-12">
                <input
                    ref={fileInputRef}
                    accept="image/*"
                    type="file"
                    onChange={imageChange}
                    className="mt-4"
                />

                {selectedImage && (
                    <div className="mt-12 flex flex-col items-center">
                        <img
                            src={URL.createObjectURL(selectedImage)}
                            className="max-w-full max-h-80"
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
                    className={`py-2 px-4 rounded mt-4 ${isUploading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500'}`}
                    onClick={SubmitButton}
                    disabled={isUploading} // 上傳中時禁用按鈕
                >
                    {isUploading ? '上傳中...' : '上傳圖片'}
                </button>

                {/* 顯示已上傳的所有圖片 */}
                {uploadedImages.length > 0 && (
                    <div className="mt-12 flex flex-col items-center">
                        <p>上傳成功的圖片：</p>
                        <div className="grid grid-cols-3 gap-4">
                            {uploadedImages.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    className="max-w-full max-h-80"
                                    alt={`Uploaded Thumb ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

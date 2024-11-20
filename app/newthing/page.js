'use client'

import { useState } from 'react';

export default function Newthing() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [resizedImage, setResizedImage] = useState(null);

    // 當使用者選擇檔案時觸發
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewImage(URL.createObjectURL(file)); // 顯示本地檔案預覽
        }
    };

    // 發送圖片到 API
    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('image', selectedFile); // 將檔案放入 FormData

        try {
            const response = await fetch('https://axum.kawa.homes/image_resize', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Failed to upload image');

            const blob = await response.blob(); // 接收回傳圖片的檔案
            setResizedImage(URL.createObjectURL(blob)); // 顯示處理後的圖片
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div>
            <h1>New Thing Page</h1>

            {/* 選擇檔案 */}
            <input type="file" accept="image/*" onChange={handleFileChange} />

            {/* 本地預覽圖片 */}
            {previewImage && (
                <div>
                    <h2>Preview:</h2>
                    <img src={previewImage} alt="Preview" style={{ maxWidth: '300px', maxHeight: '300px' }} />
                </div>
            )}

            {/* 上傳按鈕 */}
            <button onClick={handleUpload} disabled={!selectedFile}>
                Upload and Resize
            </button>

            {/* 顯示 API 回傳的圖片 */}
            {resizedImage && (
                <div>
                    <h2>Resized Image:</h2>
                    <img src={resizedImage} alt="Resized" style={{ maxWidth: '300px', maxHeight: '300px' }} />
                </div>
            )}
        </div>
    );
}

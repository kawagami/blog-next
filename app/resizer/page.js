'use client'

import { useState } from 'react';

export default function Resizer() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [resizedImage, setResizedImage] = useState(null);
    const [width, setWidth] = useState(200);
    const [height, setHeight] = useState(200);
    const [format, setFormat] = useState('png');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!selectedFile || !width || !height || !format) {
            alert('請填寫所有欄位！');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch(`https://axum.kawa.homes/tools/image/${width}/${height}/${format}/resize`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Failed to upload image');

            const blob = await response.blob();
            setResizedImage(URL.createObjectURL(blob));
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div className="bg-gray-100 flex flex-col items-center py-10">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Image Resizer</h1>
            <div className="bg-white shadow-lg rounded-lg p-6 w-96">
                {/* 選擇檔案 */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Upload Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-gray-700 border rounded p-2"
                    />
                </div>

                {/* 使用者輸入寬度與高度 */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Width:</label>
                        <input
                            type="number"
                            value={width}
                            onChange={(e) => setWidth(e.target.value)}
                            placeholder="Enter width"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Height:</label>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="Enter height"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>

                {/* 使用者選擇格式 */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Format:</label>
                    <select
                        value={format}
                        onChange={(e) => setFormat(e.target.value)}
                        className="block w-full p-2 border rounded"
                    >
                        <option value="jpeg">JPEG</option>
                        <option value="png">PNG</option>
                        <option value="webp">WebP</option>
                        <option value="bmp">BMP</option>
                        <option value="gif">GIF</option>
                        <option value="ico">ICO</option>
                        <option value="tiff">TIFF</option>
                    </select>
                </div>

                {/* 上傳按鈕 */}
                <button
                    onClick={handleUpload}
                    disabled={!selectedFile}
                    className={`w-full p-2 rounded font-semibold text-white ${selectedFile ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
                        }`}
                >
                    Upload and Resize
                </button>
            </div>

            {/* 本地預覽圖片 */}
            {previewImage && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Preview:</h2>
                    <img
                        src={previewImage}
                        alt="Preview"
                        className="rounded-lg shadow-lg max-w-full h-auto"
                        style={{ maxWidth: '300px', maxHeight: '300px' }}
                    />
                </div>
            )}

            {/* 顯示 API 回傳的圖片 */}
            {resizedImage && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Resized Image:</h2>
                    <img
                        src={resizedImage}
                        alt="Resized"
                        className="rounded-lg shadow-lg max-w-full h-auto"
                        // style={{ maxWidth: '300px', maxHeight: '300px' }}
                    />
                </div>
            )}
        </div>
    );
}

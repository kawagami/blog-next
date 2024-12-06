'use client';

import { useImageManager } from '@/hooks/useImageManager';
import UploadSection from '@/components/firebase/UploadSection'
import ImageGrid from '@/components/firebase/ImageGrid'

export default function FirebaseImageManager({ initialImages }) {
    const {
        images,
        deletingImage,
        selectedImage,
        isUploading,
        copiedImage,
        fileInputRef,
        imageChange,
        removeSelectedImage,
        handleUpload,
        handleDelete,
        handleCopy,
    } = useImageManager(initialImages);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-4">Firebase Image Manager</h1>

            {/* 圖片展示 */}
            <ImageGrid
                images={images}
                deletingImage={deletingImage}
                copiedImage={copiedImage}
                onDelete={handleDelete}
                onCopy={handleCopy}
            />
        </div>
    );
}

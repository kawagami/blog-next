"use client";

import { usePathname } from 'next/navigation';
import { useImageManager } from '@/hooks/useImageManager';
import UploadSection from '@/components/firebase/UploadSection';
import ImageGrid from '@/components/firebase/ImageGrid';

export default function FirebaseImageManager({ initialImages }) {
    const pathname = usePathname();
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

            {/* 僅在 /admin/images 時顯示上傳區域 */}
            {pathname === '/admin/images' && (
                <UploadSection
                    fileInputRef={fileInputRef}
                    selectedImage={selectedImage}
                    isUploading={isUploading}
                    onImageChange={imageChange}
                    onRemoveSelectedImage={removeSelectedImage}
                    onUpload={handleUpload}
                />
            )}

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

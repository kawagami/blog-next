import { useState, useRef } from 'react';
import uploadFirebaseImage from '@/api/upload-firebase-image';
import deleteFirebaseImage from '@/api/delete-firebase-image';

export const useImageManager = (initialImages) => {
    const [images, setImages] = useState(initialImages);
    const [deletingImage, setDeletingImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [copiedImage, setCopiedImage] = useState(null);

    const fileInputRef = useRef(null);

    const imageChange = (e) => {
        if (e.target.files?.length) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const removeSelectedImage = () => {
        setSelectedImage(null);
        fileInputRef.current.value = '';
    };

    const handleUpload = async () => {
        if (!selectedImage) return;
        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', selectedImage);

            const response = await uploadFirebaseImage(formData);
            if (response?.url) {
                setImages((prev) => [...prev, { name: response.name, url: response.url }]);
                removeSelectedImage();
            }
        } catch (err) {
            console.error('Upload error:', err);
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (fileName) => {
        setDeletingImage(fileName);
        try {
            await deleteFirebaseImage({ file_name: fileName });
            setImages((prev) => prev.filter((img) => img.name !== fileName));
        } catch (err) {
            console.error('Delete error:', err);
        } finally {
            setDeletingImage(null);
        }
    };

    const handleCopy = async (url) => {
        try {
            await navigator.clipboard.writeText(url);
            setCopiedImage(url);
            setTimeout(() => setCopiedImage(null), 2000);
        } catch (err) {
            console.error('Copy error:', err);
        }
    };

    return {
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
    };
};

"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface Props {
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    selectedFiles: File[];
    isUploading: boolean;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemoveSelectedImage: () => void;
    onUpload: () => void;
}

const UploadSection = ({ fileInputRef, selectedFiles, isUploading, onImageChange, onRemoveSelectedImage, onUpload }: Props) => {
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    useEffect(() => {
        if (!selectedFiles.length) {
            setPreviewUrls([]);
            return;
        }
        const urls = selectedFiles.map(f => URL.createObjectURL(f));
        setPreviewUrls(urls);
        return () => urls.forEach(u => URL.revokeObjectURL(u));
    }, [selectedFiles]);

    return (
        <div className="flex flex-col justify-center items-center pt-4">
            <input ref={fileInputRef} accept="image/*" type="file" multiple onChange={onImageChange} className="mt-4" />
            {previewUrls.length > 0 && (
                <div className="mt-4 flex flex-col items-center gap-4">
                    <div className="flex flex-wrap justify-center gap-4">
                        {previewUrls.map((url, i) => (
                            <img key={url} src={url} className="max-w-[200px] max-h-48 rounded-lg" alt={`Selected ${i + 1}`} />
                        ))}
                    </div>
                    <button onClick={onRemoveSelectedImage} className="cursor-pointer py-2 px-4 bg-red-500 text-white rounded">
                        Remove Selected ({selectedFiles.length})
                    </button>
                </div>
            )}
            <button
                className={`flex items-center gap-1 py-2 px-4 rounded mt-4 ${isUploading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                onClick={onUpload}
                disabled={isUploading}
            >
                {isUploading && <Loader2 className="w-4 h-4 animate-spin" />}
                {isUploading ? '上傳中...' : '上傳圖片'}
            </button>
        </div>
    );
};

export default UploadSection;

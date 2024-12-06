const UploadSection = ({
    fileInputRef,
    selectedImage,
    isUploading,
    onImageChange,
    onRemoveSelectedImage,
    onUpload,
}) => (
    <div className="flex flex-col justify-center items-center pt-4">
        <input
            ref={fileInputRef}
            accept="image/*"
            type="file"
            onChange={onImageChange}
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
                    onClick={onRemoveSelectedImage}
                    className="cursor-pointer py-2 px-4 bg-red-500 text-white mt-4 rounded"
                >
                    Remove This Image
                </button>
            </div>
        )}
        <button
            className={`py-2 px-4 rounded mt-4 ${isUploading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white'
                }`}
            onClick={onUpload}
            disabled={isUploading}
        >
            {isUploading ? '上傳中...' : '上傳圖片'}
        </button>
    </div>
);

export default UploadSection;

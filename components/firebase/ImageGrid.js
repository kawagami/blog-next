import Image from 'next/image';

const ImageGrid = ({ images, deletingImage, copiedImage, onDelete, onCopy }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {images.map((image) => (
            <div key={image.name} className="bg-white p-4 rounded shadow-md flex flex-col items-center">
                <Image
                    width={150}
                    height={150}
                    src={image.url}
                    alt={`Image ${image.name}`}
                    className="rounded-lg mb-4 object-cover"
                />
                <button
                    onClick={() => onDelete(image.name)}
                    className={`mt-2 py-1 px-4 rounded transition ${deletingImage === image.name
                        ? 'bg-gray-500 cursor-not-allowed'
                        : 'bg-red-500 hover:bg-red-600 text-white'
                        }`}
                    disabled={deletingImage === image.name}
                >
                    {deletingImage === image.name ? 'Deleting...' : 'Delete'}
                </button>
                <button
                    onClick={() => onCopy(image.url)}
                    className="mt-2 py-1 px-4 rounded bg-green-500 hover:bg-green-600 text-white"
                >
                    Copy URL
                </button>
                {copiedImage === image.url && (
                    <span className="mt-2 text-sm text-green-500">URL 已複製！</span>
                )}
            </div>
        ))}
    </div>
);

export default ImageGrid;
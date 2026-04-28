"use client";

export default function ShowClientTime({ datetimeString }: { datetimeString: string }) {
    return (
        <span suppressHydrationWarning className="text-gray-500 italic">
            {new Date(datetimeString).toLocaleString('zh-TW')}
        </span>
    );
}

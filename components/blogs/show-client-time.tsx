"use client";

export default function ShowClientTime({ datetimeString }: { datetimeString: string }) {
    return (
        <span suppressHydrationWarning className="text-neutral-500 italic">
            {new Date(datetimeString).toLocaleString('zh-TW')}
        </span>
    );
}

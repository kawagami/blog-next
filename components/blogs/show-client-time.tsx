"use client";

import { useEffect, useState } from 'react';

export default function ShowClientTime({ datetimeString }: { datetimeString: string }) {
    const [localTime, setLocalTime] = useState('');

    useEffect(() => {
        const formatToLocalTime = (isoString: string) => {
            const date = new Date(isoString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        };

        setLocalTime(formatToLocalTime(datetimeString));
    }, [datetimeString]);

    return (
        <span
            data-datetime={datetimeString}
            className="text-sm text-gray-500 italic border-l-2 pl-2 border-gray-300"
        >
            {localTime || 'Loading...'}
        </span>
    );
}

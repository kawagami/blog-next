'use client';

import { useFormStatus } from 'react-dom';

export default function LoginButton() {
    const status = useFormStatus()
    return (
        <button
            className={`w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 
            ${status.pending ? 'opacity-50 cursor-not-allowed' : ''}`}
            type="submit"
            disabled={status.pending}
        >
            {status.pending ? 'Logging in...' : 'Login'}
        </button>
    )
}

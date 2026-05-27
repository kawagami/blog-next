"use client";

import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading: boolean;
}

export default function LoadingButton({ loading, children, className = '', ...props }: LoadingButtonProps) {
    return (
        <button disabled={loading} className={className} {...props}>
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {children}
        </button>
    );
}

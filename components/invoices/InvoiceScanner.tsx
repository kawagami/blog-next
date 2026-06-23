"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import type { IScannerControls } from "@zxing/browser";

interface Props {
    mode: 'qr' | 'barcode';
    onDecoded: (text: string) => void;
}

// 相機掃描；@zxing/browser 動態載入（避免進主 bundle、SSR 安全）
// qr → 左方 QR Code；barcode → 一維條碼（Code 39，多數紙本電子發票）
export default function InvoiceScanner({ mode, onDecoded }: Props) {
    const t = useTranslations('Invoices');
    const videoRef = useRef<HTMLVideoElement>(null);
    const [starting, setStarting] = useState(true);
    const [error, setError] = useState('');
    const decodedRef = useRef(false);

    useEffect(() => {
        let controls: IScannerControls | null = null;
        let cancelled = false;
        decodedRef.current = false;

        (async () => {
            try {
                const { BrowserQRCodeReader, BrowserMultiFormatOneDReader } = await import("@zxing/browser");
                const reader = mode === 'qr'
                    ? new BrowserQRCodeReader()
                    : new BrowserMultiFormatOneDReader();
                const video = videoRef.current;
                if (!video || cancelled) return;
                controls = await reader.decodeFromConstraints(
                    { video: { facingMode: 'environment' } },
                    video,
                    (result) => {
                        if (result && !decodedRef.current) {
                            decodedRef.current = true;
                            controls?.stop();
                            onDecoded(result.getText());
                        }
                    },
                );
                if (cancelled) controls.stop();
                else setStarting(false);
            } catch {
                if (!cancelled) {
                    setError(t('cameraError'));
                    setStarting(false);
                }
            }
        })();

        return () => {
            cancelled = true;
            controls?.stop();
        };
    }, [mode, onDecoded, t]);

    // 條碼用較寬的取景框（橫向），QR 用方形
    const frameClass = mode === 'barcode'
        ? 'inset-x-6 inset-y-1/3'
        : 'inset-8';

    return (
        <div className="flex flex-col gap-3">
            <div className="relative aspect-square w-full max-w-sm mx-auto rounded-xl overflow-hidden bg-neutral-900">
                <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
                {/* 取景框 */}
                <div className={`pointer-events-none absolute ${frameClass} border-2 border-white/70 rounded-lg`} />
                {starting && (
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                        <Loader2 className="animate-spin" size={28} />
                    </div>
                )}
            </div>
            {error
                ? <p className="text-red-500 text-sm text-center">{error}</p>
                : <p className="text-neutral-500 dark:text-neutral-400 text-sm text-center">{mode === 'qr' ? t('scanQrHint') : t('scanBarcodeHint')}</p>}
        </div>
    );
}

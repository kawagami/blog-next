"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { getStockHistory, type StockDayRecord } from "@/api/get-stock-history";
import type { PortfolioEntry } from "@/types";

interface Props {
    entry: PortfolioEntry;
    onClose: () => void;
}

export default function StockHistoryTable({ entry, onClose }: Props) {
    const t = useTranslations('Portfolio');
    const [records, setRecords] = useState<StockDayRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getStockHistory(entry.stock_code, entry.buy_date)
            .then(setRecords)
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, [entry.stock_code, entry.buy_date]);

    const totalCost = entry.cost_per_share * entry.shares;
    const latestClose = records.at(-1)?.close ?? null;
    const currentValue = latestClose !== null ? latestClose * entry.shares : null;
    const totalPnl = currentValue !== null ? currentValue - totalCost : null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
            <div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col mx-4"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b dark:border-gray-700">
                    <div>
                        <h2 className="font-bold text-lg">{entry.stock_code} {t('historyTitle')}</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {t('buyDate')}: {entry.buy_date} | {t('costPerShare')}: {entry.cost_per_share} | {t('shares')}: {entry.shares}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-xl leading-none px-2"
                    >
                        ✕
                    </button>
                </div>

                {/* Summary */}
                {currentValue !== null && (
                    <div className="grid grid-cols-3 gap-3 px-5 py-3 border-b dark:border-gray-700 text-sm">
                        <div>
                            <p className="text-gray-500 dark:text-gray-400">{t('totalCost')}</p>
                            <p className="font-semibold">{totalCost.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 dark:text-gray-400">{t('currentValue')}</p>
                            <p className="font-semibold">{currentValue.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 dark:text-gray-400">{t('pnl')}</p>
                            <p className={`font-semibold ${totalPnl! >= 0 ? 'text-red-500' : 'text-green-500'}`}>
                                {totalPnl! >= 0 ? '+' : ''}{totalPnl!.toLocaleString()}
                                <span className="text-xs ml-1">
                                    ({totalPnl! >= 0 ? '+' : ''}{((totalPnl! / totalCost) * 100).toFixed(2)}%)
                                </span>
                            </p>
                        </div>
                    </div>
                )}

                {/* Table */}
                <div className="overflow-y-auto flex-1">
                    {loading ? (
                        <p className="text-center py-8 text-gray-500">{t('loading')}</p>
                    ) : error ? (
                        <p className="text-center py-8 text-red-500">{t('errorLoad')}</p>
                    ) : records.length === 0 ? (
                        <p className="text-center py-8 text-gray-500">{t('noHistory')}</p>
                    ) : (
                        <table className="w-full text-sm">
                            <thead className="sticky top-0 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                                <tr>
                                    <th className="text-left px-4 py-2 font-medium text-gray-500 dark:text-gray-400">{t('date')}</th>
                                    <th className="text-right px-4 py-2 font-medium text-gray-500 dark:text-gray-400">{t('closePrice')}</th>
                                    <th className="text-right px-4 py-2 font-medium text-gray-500 dark:text-gray-400">{t('dailyChange')}</th>
                                    <th className="text-right px-4 py-2 font-medium text-gray-500 dark:text-gray-400">{t('pnl')}</th>
                                    <th className="text-right px-4 py-2 font-medium text-gray-500 dark:text-gray-400">{t('pnlPercent')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records.map(r => {
                                    const pnl = (r.close - entry.cost_per_share) * entry.shares;
                                    const pnlPct = ((r.close - entry.cost_per_share) / entry.cost_per_share) * 100;
                                    const positive = pnl >= 0;
                                    return (
                                        <tr key={r.date} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                            <td className="px-4 py-2">{r.date}</td>
                                            <td className="px-4 py-2 text-right">{r.close.toFixed(2)}</td>
                                            <td className={`px-4 py-2 text-right ${r.change > 0 ? 'text-red-500' : r.change < 0 ? 'text-green-500' : ''}`}>
                                                {r.change > 0 ? '+' : ''}{r.change.toFixed(2)}
                                            </td>
                                            <td className={`px-4 py-2 text-right font-medium ${positive ? 'text-red-500' : 'text-green-500'}`}>
                                                {positive ? '+' : ''}{pnl.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                            </td>
                                            <td className={`px-4 py-2 text-right ${positive ? 'text-red-500' : 'text-green-500'}`}>
                                                {positive ? '+' : ''}{pnlPct.toFixed(2)}%
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

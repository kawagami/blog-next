"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Plus, Pencil, Trash2, BarChart2 } from "lucide-react";
import postPortfolio from "@/api/post-portfolio";
import putPortfolio from "@/api/put-portfolio";
import deletePortfolio from "@/api/delete-portfolio";
import PortfolioForm from "@/components/portfolio/PortfolioForm";
import StockHistoryTable from "@/components/portfolio/StockHistoryTable";
import type { PortfolioEntry, PortfolioEntryInput } from "@/types";

interface Props {
    initialEntries: PortfolioEntry[];
}

type Mode =
    | { type: 'list' }
    | { type: 'add' }
    | { type: 'edit'; entry: PortfolioEntry }
    | { type: 'history'; entry: PortfolioEntry };

export default function PortfolioClient({ initialEntries }: Props) {
    const t = useTranslations('Portfolio');
    const [entries, setEntries] = useState<PortfolioEntry[]>(initialEntries);
    const [mode, setMode] = useState<Mode>({ type: 'list' });
    const [deletingId, setDeletingId] = useState<string | null>(null);

    async function handleAdd(input: PortfolioEntryInput) {
        const created = await postPortfolio(input);
        setEntries(prev => [...prev, created]);
        setMode({ type: 'list' });
    }

    async function handleEdit(entry: PortfolioEntry, input: PortfolioEntryInput) {
        const updated = await putPortfolio(entry.id, input);
        setEntries(prev => prev.map(e => e.id === entry.id ? updated : e));
        setMode({ type: 'list' });
    }

    async function handleDelete(id: string) {
        if (!confirm(t('confirmDelete'))) return;
        setDeletingId(id);
        try {
            await deletePortfolio(id);
            setEntries(prev => prev.filter(e => e.id !== id));
        } finally {
            setDeletingId(null);
        }
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Add button */}
            {mode.type === 'list' && (
                <div className="flex justify-end">
                    <button
                        onClick={() => setMode({ type: 'add' })}
                        className="flex items-center gap-2 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 text-sm"
                    >
                        <Plus size={16} />
                        {t('addEntry')}
                    </button>
                </div>
            )}

            {/* Add form */}
            {mode.type === 'add' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow border dark:border-gray-700">
                    <h2 className="font-semibold mb-4">{t('addEntry')}</h2>
                    <PortfolioForm
                        onSave={handleAdd}
                        onCancel={() => setMode({ type: 'list' })}
                    />
                </div>
            )}

            {/* Edit form */}
            {mode.type === 'edit' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow border dark:border-gray-700">
                    <h2 className="font-semibold mb-4">{t('editEntry')}</h2>
                    <PortfolioForm
                        initial={mode.entry}
                        onSave={input => handleEdit(mode.entry, input)}
                        onCancel={() => setMode({ type: 'list' })}
                    />
                </div>
            )}

            {/* Entry list */}
            {entries.length === 0 && mode.type === 'list' ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-12">{t('noEntries')}</p>
            ) : (
                <div className="flex flex-col gap-3">
                    {entries.map(entry => (
                        <div
                            key={entry.id}
                            className="bg-white dark:bg-gray-800 rounded-xl px-5 py-4 shadow border dark:border-gray-700 flex items-center justify-between gap-4"
                        >
                            <div className="flex flex-col gap-1 min-w-0">
                                <span className="font-bold text-lg">{entry.stock_code}</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {entry.buy_date} · {entry.shares.toLocaleString()} {t('shares')} · {entry.cost_per_share} / {t('shares')}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <button
                                    onClick={() => setMode({ type: 'history', entry })}
                                    title={t('viewHistory')}
                                    className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-blue-500"
                                >
                                    <BarChart2 size={16} />
                                </button>
                                <button
                                    onClick={() => setMode({ type: 'edit', entry })}
                                    title={t('editEntry')}
                                    className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <Pencil size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(entry.id)}
                                    disabled={deletingId === entry.id}
                                    title={t('deleteEntry')}
                                    className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500 disabled:opacity-50"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* History modal */}
            {mode.type === 'history' && (
                <StockHistoryTable
                    entry={mode.entry}
                    onClose={() => setMode({ type: 'list' })}
                />
            )}
        </div>
    );
}

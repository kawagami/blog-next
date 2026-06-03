"use client";

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import ThemeButton from "@/components/theme-button";
import Image from "next/image";
import loglImg from "@/assets/kawagami.svg";
import { logout } from '@/actions/auth';
import { LayoutDashboard, User, Bell, ChevronDown, X, Menu, TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from '@/components/locale-switcher';

interface HeaderProps {
    member: { id: string } | null
}

export default function Header({ member }: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isResourcesOpen, setIsResourcesOpen] = useState(false);
    const [isMemberOpen, setIsMemberOpen] = useState(false);
    const iconSize = 50;
    const t = useTranslations('Header');

    const closeAll = () => {
        setIsOpen(false);
        setIsResourcesOpen(false);
        setIsMemberOpen(false);
    };

    return (
        <>
            <header className="min-h-[50px] flex items-center justify-between px-4 relative z-50">
                <div className="flex items-center">
                    <Link href="/" className="block px-2" aria-label={t('backToHome')} onClick={closeAll}>
                        <Image src={loglImg} width={iconSize} height={iconSize} alt="KAWAGAMI" />
                    </Link>
                </div>

                {/* Desktop nav */}
                <nav className="hidden sm:flex items-center gap-4">
                    <Link href="/hackmd-notes" aria-label={t('notes')} className="block px-4 rounded hover:scale-110 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400">{t('notes')}</Link>
                    <div className="relative">
                        <button
                            className="block px-4 rounded hover:scale-110 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            aria-label={t('openToolsMenu')}
                            aria-expanded={isResourcesOpen}
                            onClick={() => setIsResourcesOpen(o => !o)}
                        >{t('tools')}</button>
                        {isResourcesOpen && (
                            <div className="absolute left-0 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-10">
                                <Link href="/tools/new-password" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-400" onClick={() => setIsResourcesOpen(false)}>{t('toolNewPassword')}</Link>
                                <Link href="/tools/convert-text" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-400" onClick={() => setIsResourcesOpen(false)}>{t('toolConvertText')}</Link>
                                <Link href="/tools/countdown" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-400" onClick={() => setIsResourcesOpen(false)}>{t('toolCountdown')}</Link>
                                <Link href="/tools/roster" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-400" onClick={() => setIsResourcesOpen(false)}>{t('toolRoster')}</Link>
                                <Link href="/tools/alarm" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-400" onClick={() => setIsResourcesOpen(false)}>{t('toolAlarm')}</Link>
                            </div>
                        )}
                    </div>
                    <Link href="/about" aria-label={t('about')} className="block px-4 rounded hover:scale-110 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400">{t('about')}</Link>
                    <LocaleSwitcher />
                    <ThemeButton />
                    {member ? (
                        <div className="relative">
                            <button
                                className="flex items-center gap-1 px-4 rounded hover:scale-110 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                aria-label={t('openMemberMenu')}
                                aria-expanded={isMemberOpen}
                                onClick={() => setIsMemberOpen(o => !o)}
                            >
                                <User size={16} />
                                <ChevronDown size={14} />
                            </button>
                            {isMemberOpen && (
                                <div className="absolute right-0 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-10 min-w-[120px]">
                                    <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-400 text-sm" onClick={() => setIsMemberOpen(false)}>
                                        <LayoutDashboard size={14} />
                                        {t('dashboard')}
                                    </Link>
                                    <Link href="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-400 text-sm" onClick={() => setIsMemberOpen(false)}>
                                        <User size={14} />
                                        {t('profile')}
                                    </Link>
                                    <Link href="/dashboard/notifications" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-400 text-sm" onClick={() => setIsMemberOpen(false)}>
                                        <Bell size={14} />
                                        {t('notifications')}
                                    </Link>
                                    <Link href="/portfolio" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-400 text-sm" onClick={() => setIsMemberOpen(false)}>
                                        <TrendingUp size={14} />
                                        {t('portfolio')}
                                    </Link>
                                    <form action={logout}>
                                        <button type="submit" className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-400 text-sm text-red-500 dark:text-red-400">
                                            {t('logout')}
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/login" className="block px-4 rounded hover:scale-110 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400">{t('login')}</Link>
                    )}
                </nav>

                {/* Mobile hamburger */}
                <button
                    className="sm:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onClick={() => setIsOpen(o => !o)}
                    aria-label={isOpen ? t('closeMenu') : t('openMenu')}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </header>

            {/* Mobile nav overlay */}
            {isOpen && (
                <>
                    <div className="sm:hidden fixed inset-0 z-30 bg-black/40" onClick={closeAll} aria-hidden="true" />
                    <nav className="sm:hidden fixed top-[50px] left-0 right-0 z-40 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700 flex flex-col p-4 gap-1">
                        <Link href="/hackmd-notes" className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={closeAll}>{t('notes')}</Link>

                        <button
                            className="flex items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full text-left"
                            aria-expanded={isResourcesOpen}
                            onClick={() => setIsResourcesOpen(o => !o)}
                        >
                            {t('tools')}
                            <ChevronDown size={14} className={`transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isResourcesOpen && (
                            <div className="ml-4 flex flex-col gap-1">
                                <Link href="/tools/new-password" className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm" onClick={closeAll}>{t('toolNewPassword')}</Link>
                                <Link href="/tools/convert-text" className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm" onClick={closeAll}>{t('toolConvertText')}</Link>
                                <Link href="/tools/countdown" className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm" onClick={closeAll}>{t('toolCountdown')}</Link>
                                <Link href="/tools/roster" className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm" onClick={closeAll}>{t('toolRoster')}</Link>
                                <Link href="/tools/alarm" className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm" onClick={closeAll}>{t('toolAlarm')}</Link>
                            </div>
                        )}

                        <Link href="/about" className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={closeAll}>{t('about')}</Link>
                        <div className="px-4 py-2">
                            <ThemeButton />
                        </div>
                        <div className="px-4 py-2">
                            <LocaleSwitcher />
                        </div>

                        {member ? (
                            <>
                                <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm" onClick={closeAll}>
                                    <LayoutDashboard size={14} />
                                    {t('dashboard')}
                                </Link>
                                <Link href="/profile" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm" onClick={closeAll}>
                                    <User size={14} />
                                    {t('profile')}
                                </Link>
                                <Link href="/dashboard/notifications" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm" onClick={closeAll}>
                                    <Bell size={14} />
                                    {t('notifications')}
                                </Link>
                                <Link href="/portfolio" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm" onClick={closeAll}>
                                    <TrendingUp size={14} />
                                    {t('portfolio')}
                                </Link>
                                <form action={logout}>
                                    <button type="submit" className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm text-red-500 dark:text-red-400">
                                        {t('logout')}
                                    </button>
                                </form>
                            </>
                        ) : (
                            <Link href="/login" className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={closeAll}>{t('login')}</Link>
                        )}
                    </nav>
                </>
            )}
        </>
    );
}

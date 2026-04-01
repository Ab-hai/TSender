'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { FaGithub } from 'react-icons/fa'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ThemeSwitch } from './ui/theme-switch-button'

export default function Header() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    return (
        <nav className=" relative px-8 py-4.5 border-b-[1px] border-zinc-100 dark:border-zinc-800 flex flex-row justify-between items-center bg-white dark:bg-gray-900 xl:min-h-[77px]">
            <div className="flex items-center gap-2.5 md:gap-6">
                <a
                    href="/"
                    className="flex items-center gap-1 text-zinc-800 dark:text-zinc-100"
                >
                    <Image
                        src="/T-Sender.svg"
                        alt="TSender"
                        width={36}
                        height={36}
                    />
                    <h1 className="font-bold text-2xl hidden md:block">
                        TSender
                    </h1>
                </a>
                <a
                    href="https://github.com/Ab-hai/TSender"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded-lg bg-zinc-900 dark:bg-zinc-700 hover:bg-zinc-800 dark:hover:bg-zinc-600 transition-colors border-2 border-zinc-600 dark:border-zinc-500 hover:border-zinc-500 cursor-alias hidden md:block"
                >
                    <FaGithub className="h-5 w-5 text-white" />
                </a>
            </div>
            <h3 className="absolute left-1/2 -translate-x-1/2 italic text-left hidden text-zinc-500 dark:text-zinc-400 lg:block">
                The most gas efficient airdrop contract on earth, built in huff
                🐎
            </h3>
            <div className="flex items-center gap-4">
                <ThemeSwitch className="cursor-pointer p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition" />
                <ConnectButton />
            </div>
        </nav>
    )
}

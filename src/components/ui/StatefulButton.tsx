'use client'

import { motion, AnimatePresence } from 'framer-motion'

type TxStep = 'idle' | 'approving' | 'sending' | 'success'

interface StatefulButtonProps {
    txStep: TxStep
    onClick: () => void
}

const stepConfig: Record<
    TxStep,
    { label: string; showSpinner: boolean; showCheck: boolean }
> = {
    idle: { label: 'Send Transaction', showSpinner: false, showCheck: false },
    approving: { label: 'Approving...', showSpinner: true, showCheck: false },
    sending: {
        label: 'Sending Airdrop...',
        showSpinner: true,
        showCheck: false,
    },
    success: { label: 'Done!', showSpinner: false, showCheck: true },
}

export function StatefulButton({ txStep, onClick }: StatefulButtonProps) {
    const { label, showSpinner, showCheck } = stepConfig[txStep]
    const isDisabled = txStep !== 'idle'

    return (
        <motion.button
            onClick={onClick}
            disabled={isDisabled}
            whileTap={!isDisabled ? { scale: 0.97 } : {}}
            className={`
                relative flex items-center justify-center gap-2 w-full
                px-6 py-2.5 rounded-lg font-semibold text-white text-sm
                shadow-md transition-colors duration-200 overflow-hidden
                ${
                    txStep === 'success'
                        ? 'bg-green-600'
                        : 'bg-blue-600 hover:bg-blue-700'
                }
                disabled:cursor-not-allowed disabled:opacity-80
            `}
        >
            {/* Shimmer overlay while loading */}
            {(txStep === 'approving' || txStep === 'sending') && (
                <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.2,
                        ease: 'linear',
                    }}
                />
            )}

            {/* Spinner */}
            {showSpinner && (
                <motion.svg
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-4 w-4 animate-spin text-white shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                    />
                </motion.svg>
            )}

            {/* Checkmark */}
            {showCheck && (
                <motion.svg
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="h-4 w-4 text-white shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                    />
                </motion.svg>
            )}

            {/* Animated label */}
            <AnimatePresence mode="wait">
                <motion.span
                    key={label}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                >
                    {label}
                </motion.span>
            </AnimatePresence>
        </motion.button>
    )
}

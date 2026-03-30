'use client'

import { InputForm } from './ui/InputField'
import { useState, useMemo } from 'react'
import { chainsToTSender, tsenderAbi, erc20Abi } from '@/constants'
import { useChainId, useConfig, useAccount, useWriteContract } from 'wagmi'
import { readContract, waitForTransactionReceipt } from '@wagmi/core'
import { calculateTotal } from '@/utils/calculateTotal/calculateTotal'

export default function AirdropForm() {
    const [tokenAddress, setTokenAddress] = useState('')
    const [recipients, setRecipients] = useState('')
    const [amounts, setAmounts] = useState('')
    const chainId = useChainId()
    const config = useConfig()
    const account = useAccount()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { data: hash, isPending, writeContractAsync } = useWriteContract()

    const total: number = useMemo(() => calculateTotal(amounts), [amounts])

    async function getApprovedAmount(
        tSenderAddress: string | null
    ): Promise<number> {
        if (!tSenderAddress) {
            alert('No address found, please use a supported chain')
            return 0
        }
        const response = await readContract(config, {
            abi: erc20Abi,
            address: tokenAddress as `0x${string}`,
            functionName: 'allowance',
            args: [account.address, tSenderAddress as `0x${string}`],
        })
        return response as number
    }

    async function handleSubmit() {
        setIsSubmitting(true)
        try {
            const tSenderAddress = chainsToTSender[chainId]['tsender']
            const approvedAmount = await getApprovedAmount(tSenderAddress)
            if (approvedAmount < total) {
                const approvalHash = await writeContractAsync({
                    abi: erc20Abi,
                    address: tokenAddress as `0x${string}`,
                    functionName: 'approve',
                    args: [tSenderAddress as `0x${string}`, BigInt(total)],
                })
                const approvalReceipt = await waitForTransactionReceipt(
                    config,
                    {
                        hash: approvalHash,
                    }
                )
                await writeContractAsync({
                    abi: tsenderAbi,
                    address: tSenderAddress as `0x${string}`,
                    functionName: 'airdropERC20',
                    args: [
                        tokenAddress,
                        recipients
                            .split(/[,\n]+/)
                            .map((addr) => addr.trim())
                            .filter((addr) => addr !== ''),
                        amounts
                            .split(/[,\n]+/)
                            .map((amt) => amt.trim())
                            .filter((amt) => amt !== ''),
                        BigInt(total),
                    ],
                })
            } else {
                await writeContractAsync({
                    abi: tsenderAbi,
                    address: tSenderAddress as `0x${string}`,
                    functionName: 'airdropERC20',
                    args: [
                        tokenAddress,
                        recipients
                            .split(/[,\n]+/)
                            .map((addr) => addr.trim())
                            .filter((addr) => addr !== ''),
                        amounts
                            .split(/[,\n]+/)
                            .map((amt) => amt.trim())
                            .filter((amt) => amt !== ''),
                        BigInt(total),
                    ],
                })
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
         <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 p-4">
        <div className="w-full max-w-2xl bg-white dark:bg-gray-950 border border-black dark:border-blue-600 rounded-2xl shadow-sm p-7 flex flex-col gap-6">
            <InputForm 
                label="Token Address"
                placeholder="0x"
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
            />
            <InputForm
                label="Recipients"
                placeholder="0x9595386..."
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                large={true}
            />
            <InputForm
                label="Amount"
                placeholder="100"
                value={amounts}
                onChange={(e) => setAmounts(e.target.value)}
                large={true}
            />
            <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-150"
            >
                {isPending && (
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                )}
                {isPending ? 'Sending...' : 'Send Transaction'}
            </button>
        </div>
    </div>
    )
}

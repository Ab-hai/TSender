"use client"

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import AirdropForm from '@/components/AirdropForm'

export default function Home() {
  const { isConnected } = useAccount()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null 

  return (
    <div>
      {isConnected ? <AirdropForm /> : <div>Please connect a wallet..</div>}
    </div>
  )
}
"use client"

import HomeContent from "@/components/HomeContetnt"
import { useAccount } from "wagmi"

export default function Home() {

 const {isConnected} = useAccount()
    
    return (
        <div>
    <div>
        { isConnected ? (
                 <div>
            <HomeContent />
        </div>
        ) : (
           
            <div>
                Please connect a wallet..
                </div>
        )
    }
    </div>
        </div>
    )
}

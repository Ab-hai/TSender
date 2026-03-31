interface DetailRowProps {
    label: string
    value: string | number
}

const DetailRow = ({ label, value }: DetailRowProps) => (
    <div className="flex justify-between items-center mt-2">
        <p className="text-sm placeholder:text-zinc-500 dark:placeholder:text-zinc-400 text-zinc-800 dark:text-zinc-300">{label}</p>
        <p className="text-sm placeholder:text-zinc-500 dark:placeholder:text-zinc-400 text-zinc-800 dark:text-zinc-300 font-semibold">{value}</p>
    </div>
)

interface TransactionDetailsProps {
    recipientCount: number
    total: number
}

const TransactionDetails = ({ recipientCount, total }: TransactionDetailsProps) => (
    <div className="bg-white dark:bg-gray-950 border border-black-300 dark:border-blue-600 rounded-lg p-6 mt-4 bg-gray-900/50">
        <p className="text-xs placeholder:text-zinc-500 dark:placeholder:text-zinc-400 text-zinc-800 dark:text-zinc-300 uppercase tracking-widest mb-4">
            Transaction Details
        </p>
        <DetailRow label="Recipients" value={recipientCount} />
        <DetailRow label="Total Amount (wei)" value={total.toString()} />
    </div>
)

export default TransactionDetails
export interface InputFormProps {
    label: string
    placeholder: string
    value?: string
    type?: string
    large?: boolean
    onChange?: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void
}

export function InputForm({
    label,
    placeholder,
    value,
    type,
    large,
    onChange,
}: InputFormProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-zinc-800 dark:text-zinc-300 font-medium text-md">
                {label}
            </label>
            {large ? (
                <textarea
                    className={` bg-white dark:bg-gray-950 py-2 px-3 border border-black-300 dark:border-blue-600 placeholder:text-zinc-500 dark:placeholder:text-zinc-400 text-zinc-900 dark:text-zinc-100 shadow-xs rounded-lg focus:ring-[4px] focus:ring-zinc-400/15 focus:outline-none h-36 align-text-top`}
                    placeholder={placeholder}
                    value={value || ''}
                    onChange={onChange}
                />
            ) : (
                <input
                    className={`bg-white dark:bg-gray-950 py-2.5 px-3 border border-black-300 dark:border-blue-600 placeholder:text-zinc-500 dark:placeholder:text-zinc-400 text-zinc-900 dark:text-zinc-100 shadow-xs rounded-lg focus:ring-[4px] focus:ring-zinc-400/15 focus:outline-none`}
                    type={type}
                    placeholder={placeholder}
                    value={value || ''}
                    onChange={onChange}
                />
            )}
        </div>
    )
}

import { Loading } from '@/components/Molecules'
import { useState } from 'react'

type ButtonProps = {
    onClick?: (e?: React.SyntheticEvent) => void
    onClickAsync?: (e?: React.SyntheticEvent) => Promise<void>
    children: React.ReactNode
    disabled?: boolean
    className?: string
}

const Base = ({ onClick, onClickAsync, children, disabled, className, ...props }: ButtonProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function handleClick(e: React.SyntheticEvent) {
        if (onClickAsync) {
            setIsLoading(true)
            await onClickAsync(e)
            setIsLoading(false)
        } else if (onClick) {
            onClick(e)
            return
        } 
        console.error('Button is missing a click handler')
    }

    return (
        <button
            {...props}
            onClick={handleClick}
            className={`py-1 px-3 rounded-md font-medium ${className} ${disabled && 'opacity-50'}`}
        >
            {isLoading ? <Loading size={20} /> : children}
        </button>
    )
}

// Classes
export const primaryClasses =
    'bg-brand-500 hover:bg-brand-600 hover:border-brand-600 focus:ring-brand-300 text-white'

export const secondaryClasses =
    'bg-brand-50 hover:bg-brand-100 border border-neutral-200 focus:ring-brand-300 text-neutral-900'

// Variants
function Primary(props: ButtonProps) {
    return <Base {...props} className={`${primaryClasses} ${props?.className}`} />
}

function Secondary(props: ButtonProps) {
    return <Base {...props} className={`${secondaryClasses} ${props?.className}`} />
}

// Default Wrapper Component
function Button(props: ButtonProps) {
    return <Primary {...props} />
}

Button.Primary = Primary
Button.Secondary = Secondary

export default Button
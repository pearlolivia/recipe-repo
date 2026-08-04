import { Loading } from '@/components/Molecules'

type ButtonProps = {
    onClick?: (e?: React.SyntheticEvent) => void
    onClickAsync?: (e?: React.SyntheticEvent) => Promise<void>
    children: React.ReactNode
    isLoading?: boolean
    disabled?: boolean
    className?: string
}

const Base = ({ onClick, onClickAsync, isLoading, children, disabled, className, ...props }: ButtonProps) => {
    async function handleClick(e: React.SyntheticEvent) {
        if (onClickAsync) {
            await onClickAsync(e)
        } else  if (onClick) {
            onClick(e)
            return
        } 
        console.error('Button is missing a click handler')
    }

    return (
        <button
            {...props}
            onClick={handleClick}
            className={`button group ${className} ${disabled && 'opacity-50'}`}
        >
            {isLoading ? <Loading size={20} /> : children}
        </button>
    )
}

// Classes
export const primaryClasses =
    'bg-brand-500 hover:bg-brand-600 hover:border-brand-600 focus:ring-brand-300 text-white'

// Variants
function Primary(props: ButtonProps) {
    return <Base {...props} className={`${primaryClasses} ${props?.className}`} />
}

// Default Wrapper Component
function Button(props: ButtonProps) {
    return <Primary {...props} />
}

Button.Primary = Primary

export default Button
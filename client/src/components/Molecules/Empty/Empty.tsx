import { IconX } from "@tabler/icons-react"
import Button from "../Button"

const Empty = ({ icon, header, subheader, buttonText, action }: {
    icon?: React.ReactNode
    header: string
    subheader?: string
    action?: () => void
    buttonText?: string
}) => {
    return (
        <div className="p-5 rounded-xl bg-neutral-50 flex flex-col items-center gap-4">
            <div className="flex w-10 h-10 rounded-full bg-neutral-200">
                {icon ? (<span className="m-auto">{icon}</span>) : (<IconX className="m-auto" />)}
            </div>
            <div>
                <p className="font-semibold">{header}</p>
                {subheader && <p className="text-sm text-neutral-700">{subheader}</p>}
            </div>
            {!!action && <Button onClick={action}>{buttonText ?? 'Add'}</Button>}
        </div>
    )
}

export default Empty
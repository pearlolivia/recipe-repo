import { useField } from "@/hooks/useField"
import { capitaliseFirstLetter } from "@/services/utils"
import { useMemo } from "react"

const Field = ({
    field,
    formValues,
    setFormValues,
    onChange,
    type,
    label
}: {
    field: string
    formValues: { [key: string]: any }
    setFormValues?: (v: { [key: string]: any }) => void
    onChange?: (v: string) => void
    //
    type: string
    label?: string
}) => {
    const { value, handleChange } = useField({ field, formValues, setFormValues, onChange })

    const fieldLabel = useMemo(() => {
        const splitName = field.replace(/([A-Z])/g, ' $1').split(" ").join(' ')
        return capitaliseFirstLetter(splitName)
    }, [field])

    return (
        <div className="flex flex-col">
            <label className="text-sm text-neutral-800">{label ?? fieldLabel}</label>
            <input type={type} value={value} onChange={(v) => handleChange(v)} className="ring-1 ring-gray-500 rounded-md my-1 p-1" />
        </div>
    )
}

export default Field
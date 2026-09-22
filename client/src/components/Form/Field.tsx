import { useField } from "@/hooks/useField"
import { capitaliseFirstLetter } from "@/services/utils"
import { useMemo } from "react"

const Field = ({
    field,
    formValues,
    setFormValues,
    onChange,
    type,
    label,
    required,
    containerClass,
    inputClass,
    placeholder
}: {
    field: string
    formValues: { [key: string]: any }
    setFormValues?: (v: { [key: string]: any }) => void
    onChange?: (v: string) => void
    //
    type: string
    label?: string
    required?: boolean
    containerClass?: string
    inputClass?: string
    placeholder?: string
}) => {
    const { value, handleChange } = useField({ field, formValues, setFormValues, onChange })

    const fieldLabel = useMemo(() => {
        const splitName = field.replace(/([A-Z])/g, ' $1').split(" ").join(' ')
        return capitaliseFirstLetter(splitName)
    }, [field])

    return (
        <div className={`flex flex-col ${containerClass}`}>
            <div>
                <label className="text-sm text-neutral-800">{label ?? fieldLabel}</label>
                {required && <span className="text-sm text-red-500">{' '}*</span>}
            </div>
            {type === 'textarea' ? (
                <textarea value={value} onChange={(v) => handleChange(v)} className={`ring-1 ring-gray-500 rounded-md my-1 p-1 ${inputClass}`} placeholder={placeholder ?? ''} />
            ) : (
                <input type={type} value={value} onChange={(v) => handleChange(v)} className={`ring-1 ring-gray-500 rounded-md my-1 py-2 px-3 ${inputClass}`} placeholder={placeholder ?? ''} />
            )}
            
        </div>
    )
}

export default Field
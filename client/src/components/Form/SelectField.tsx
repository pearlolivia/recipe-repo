import { useField } from '@/hooks/useField';
import { capitaliseFirstLetter } from '@/services/utils';
import { useMemo } from 'react';
import Select, { SingleValue } from 'react-select'

const SelectField = ({
    field,
    // formValues,
    // setFormValues,
    options,
    onChange,
    label,
    required,
    isMulti,
    inputClass,
}: {
    field: string
    // formValues: { [key: string]: any }
    // setFormValues?: (v: { [key: string]: any }) => void
    options: {[key: string]: any }[];
    onChange?: (option: SingleValue<{ [key: string]: any }>) => void
    label?: string
    required?: boolean
    isMulti?: boolean
    inputClass?: string
}) => {
    // const { value } = useField({ field, formValues, setFormValues })
    
        const fieldLabel = useMemo(() => {
            const splitName = field.replace(/([A-Z])/g, ' $1').split(" ").join(' ')
            return capitaliseFirstLetter(splitName)
        }, [field])

    return (
        <div className="flex flex-col">
            <div>
                <label className="text-sm text-neutral-800">{label ?? fieldLabel}</label>
                {required && <span className="text-sm text-red-500">{' '}*</span>}
            </div>
            <Select options={options} onChange={onChange} isMulti={isMulti} className={`w-48 ${inputClass}`} />
        </div>
    )
}

export default SelectField
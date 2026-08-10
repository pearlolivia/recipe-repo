export function useField({ field, formValues, setFormValues, onChange }: {
    field: string
    formValues: { [key: string]: any }
    setFormValues?: (v: { [key: string]: any }) => void
    onChange?: (v: string) => void
}) {
    const value = formValues?.[field]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!!onChange){
            onChange(e.target.value)
            return
        }
        setFormValues?.({
            ...formValues,
            [field]: e.target.value
        })
    }

    return { value, handleChange }
}
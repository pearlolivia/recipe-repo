export function useField({ field, formValues, setFormValues }: {
    field: string
    formValues: { [key: string]: any }
    setFormValues: (v: { [key: string]: any }) => void
}) {
    const value = formValues?.[field]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [field]: e.target.value
        })
    }

    return { value, handleChange }
}
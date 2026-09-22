import { useEffect, useState } from "react"
import { Button } from "../Molecules"
import { api, api_no_auth } from "@/services/api.service"

type FormProps<FormValuesType> = {
    endpoint: string
    id: string
    children: (
        formControl: any,
        formData: {
            formValues: { [key: string]: any },
            setFormValues: (v: { [key: string]: any }) => void
            submit: (v: FormValuesType) => Promise<void>
        }
    ) => React.ReactNode
    postSubmit?: (response: { data: any }) => void
    options?: { noAuth?: boolean }
    className?: string
    submitText?: string
}

function Form<FormValuesType>({ endpoint, id, children, postSubmit, options, className, submitText }: FormProps<FormValuesType>) {
    const [formValues, setFormValues] = useState<{ [key: string]: any }>({})
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // get and set initial values
    }, [endpoint, id])

    const handleSubmit = async (values?: FormValuesType) => {
        setError(null)
        const postData = {...(values ?? formValues), _id: id }
        let response
        if (options?.noAuth) {
            response = await api_no_auth(endpoint, { ...postData })
        } else {
            response = await api(endpoint, { ...postData })
        }
        if (response?.data?.error) {
            setError(response.data.error)
            return
        }
        postSubmit?.(response)
    }

    const formControl = (field: string) => {
        return {
            field,
            formValues,
            setFormValues
        }
    }

    // handle update of form values via various input fields
    return (
        <div className={`bg-white p-5 rounded-xl flex flex-col space-y-4 ${className}`}>
            {children(formControl, { formValues, setFormValues, submit: (values: FormValuesType) => handleSubmit(values)})}
            <div className="ml-auto flex items-center gap-2">
                {error && (<span className="text-amber-500 flex-wrap">{error}</span>)}
                <Button onClickAsync={async() => { await handleSubmit() }}>{submitText ?? 'Submit'}</Button>
            </div>
        </div>
    )
}

export default Form
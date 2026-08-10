import { useEffect, useState } from "react"
import { Button } from "../Molecules"
import { api } from "@/services/api.service"

type FormProps<FormValuesType> = {
    endpoint: string
    id: string
    children: (formControl: any, formData: {}) => React.ReactNode
}

function Form<FormValuesType>({ endpoint, id, children }: FormProps<FormValuesType>) {
    const [formValues, setFormValues] = useState<{ [key: string]: any }>({})
    const [submissionStatus, setSubmissionStatus] = useState<'success' | 'invalid' | 'error' | null>(null)

    useEffect(() => {
        // get and set initial values
    }, [endpoint, id])

    const handleSubmit = async (values?: FormValuesType) => {
        const postData = values ?? formValues
        // post request with form values
        await api(endpoint, { ...postData })
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
        <div className="bg-white p-5 rounded-xl border">
            {children(formControl, { formValues, setFormValues, submit: (values: FormValuesType) => handleSubmit(values)})}
            <Button onClickAsync={async() => { await handleSubmit() }}>Submit</Button>
        </div>
    )
}

export default Form
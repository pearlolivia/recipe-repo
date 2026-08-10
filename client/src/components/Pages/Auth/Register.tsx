import Field from '@/components/Form/Field'
import { IUser } from '../../../../../server/models/user.model'
import Form from "@/components/Form/FormNew"
import ROUTES from "@/ROUTES"

const Register = () => {
    return (
        <Form<IUser>
            endpoint={ROUTES.auth.register}
            id='new'
        >
            {(f) => (
                <Field {...f('firstName')} type='text' />
            )}
        </Form>
    )
}

export default Register
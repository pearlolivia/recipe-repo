import Field from '@/components/Form/Field'
import { IUser } from '../../../../../server/models/user.model'
import Form from "@/components/Form/Form"
import ROUTES from "@/ROUTES"
import { useNavigate } from 'react-router'
import { useAuth } from '@/hooks/useAuth'

const Register = () => {
    const navigate = useNavigate()
    const { getUser } = useAuth()

    return (
        <Form<IUser>
            endpoint={ROUTES.auth.register}
            id='new'
            options={{ noAuth: true }}
            postSubmit={async (response) => {
                const { accessToken, user } = response?.data
                // set token local storage
                if (!accessToken) {
                    throw 'There was an issue while registering your account. Please try again.'
                }
                if (!user) {
                    throw 'There was an issue while registering your account. Please try again.'
                }
                localStorage.setItem('token', JSON.stringify(accessToken))
                localStorage.setItem('cachedUser', JSON.stringify(user))
                await getUser()
                navigate('/')
            }}
        >
            {(f) => (
                <>
                    <Field {...f('firstName')} type='text' />
                    <Field {...f('username')} type='text' />
                    <Field {...f('password')} type='text' />
                </>
            )}
        </Form>
    )
}

export default Register
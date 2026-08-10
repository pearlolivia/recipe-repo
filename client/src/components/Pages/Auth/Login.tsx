import Field from '@/components/Form/Field'
import { IUser } from '../../../../../server/models/user.model'
import Form from "@/components/Form/Form"
import ROUTES from "@/ROUTES"
import { useNavigate } from 'react-router'
import { useAuth } from '@/hooks/useAuth'

const Login = () => {
    const navigate = useNavigate()
    const { getUser } = useAuth()

    return (
        <div className='m-auto space-y-6 flex-col flex'>
            <div className='space-y-4'>
                <h1 className='font-semibold text-4xl'>Sign In</h1>
                <p>No account? <span className='font-medium text-brand cursor-pointer hover:underline' onClick={() => navigate('/register')}>Register here</span></p>
            </div>
            <Form<IUser>
                endpoint={ROUTES.auth.login}
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
                className='m-auto'
                submitText='Sign In'
            >
                {(f) => (
                    <>
                        <Field {...f('username')} type='text' />
                        <Field {...f('password')} type='text' />
                    </>
                )}
            </Form>
        </div>
    )
}

export default Login
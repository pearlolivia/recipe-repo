import { ReactNode } from 'react'

const AuthLayout = ({children, mainClass}: {children: ReactNode; mainClass?: string}) => (
    <>
        <main className={`flex flex-col items-center flex-1 w-full h-screen justify-self-center bg-brand-50 ${mainClass ?? ''}`}>
            {children}
        </main>
    </>
)


export default AuthLayout
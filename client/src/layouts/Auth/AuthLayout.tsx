import { ReactNode } from 'react'

const AuthLayout = ({children, mainClass}: {children: ReactNode; mainClass?: string}) => (
    <>
        <main className={`flex flex-col items-center flex-1 w-full h-screen justify-self-center ${mainClass ?? ''}`}>
            {children}
        </main>
    </>
)


export default AuthLayout
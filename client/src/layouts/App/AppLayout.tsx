import { ReactNode } from 'react'
import { IconHome, IconBowlSpoon, IconLogout, IconUser } from '@tabler/icons-react'

import logo from '@/assets/react.svg'

import { HorizontalHeader } from '@/layouts/headers'
import { Link } from '@/layouts/helpers'

const APP_LINKS: Link[] = [
    { text: 'Dashboard', link: '/', icon: IconHome },
    { text: 'My Recipes', link: '/my-recipes', icon: IconUser },
    { text: 'New Recipe', link: '/recipe/new', icon: IconBowlSpoon },
    { text: 'Logout', link: '/logout', icon: IconLogout },
]


const AppLayout = ({children, mainClass}: {children: ReactNode; mainClass?: string}) => (
    <div className='bg-brand-50'>
        <HorizontalHeader
            logo={logo}
            links={APP_LINKS}
        />
        <main className={`flex flex-col flex-1 w-full h-screen justify-self-center py-4 md:py-8 px-8 md:px-20 ${mainClass ?? ''}`}>
            {children}
        </main>
    </div>
)


export default AppLayout
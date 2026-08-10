import { Outlet } from 'react-router'

import AppLayout from '@/layouts/App'
import { Layout } from '@/layouts/helpers'
import AuthLayout from '../Auth/AuthLayout'

const LayoutWrapper = ({ layout }: { layout: Layout }) => (
    <>
        {layout === 'app' &&(
            <AppLayout>
                <Outlet></Outlet>
            </AppLayout>
        )}
        {layout === 'auth' &&(
            <AuthLayout>
                <Outlet></Outlet>
            </AuthLayout>
        )}
    </>
)

export default LayoutWrapper
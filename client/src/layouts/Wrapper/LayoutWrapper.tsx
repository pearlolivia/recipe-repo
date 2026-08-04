import { Outlet } from 'react-router'

import AppLayout from '@/layouts/App'
import { Layout } from '@/layouts/helpers'

const LayoutWrapper = ({ layout }: { layout: Layout}) => (
    <>
        {layout === 'app' &&(
            <AppLayout>
                <Outlet></Outlet>
            </AppLayout>
        )}
        {/* {layout === 'admin' &&(
            <AdminLayout>
                <Outlet></Outlet>
            </AdminLayout>
        )} */}
    </>
)

export default LayoutWrapper
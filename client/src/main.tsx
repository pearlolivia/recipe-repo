import { lazy, Suspense, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { ToastContainer } from 'react-toastify'
import Loading from '@/components/Molecules/Loading'
import './index.css'
import Register from './components/Pages/Auth/Register.tsx'
import { AuthWrapper } from './services/wrappers.tsx'
import { AuthProvider } from './hooks/useAuth.tsx'
import Logout from './components/Pages/Auth/Logout.tsx'
import Login from './components/Pages/Auth/Login.tsx'

const App = lazy(() => import('./App.tsx'))
const LayoutWrapper = lazy(() => import('@/layouts/Wrapper'))
const NotFoundPage = lazy(() => import('@/components/Pages/NotFound'))

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StrictMode>
  {/* <ErrorBoundary componentName='Root'> */}
      <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <AuthProvider>
            <Routes>
                {/* Auth */}
                <Route path='/' element={<LayoutWrapper layout='auth' />}>
                  <Route path='/register' element={<Register />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/logout' element={<Logout />} />
                </Route>

                {/* App */}
                <Route element={<AuthWrapper />}>
                  <Route path='/' element={<LayoutWrapper layout='app' />}>
                    <Route index element={<App />} />
                  </Route>
                  </Route>
                {/* Errors */}
                <Route path='/*' element={<NotFoundPage />} />
            </Routes>
            <ToastContainer position='top-center' autoClose={1000} />
          </AuthProvider>
        </Suspense>
      </BrowserRouter>
  {/* </ErrorBoundary> */}
</StrictMode>
)

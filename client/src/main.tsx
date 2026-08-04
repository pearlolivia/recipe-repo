import { lazy, Suspense, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { ToastContainer } from 'react-toastify'
import Loading from '@/components/Molecules/Loading'
import './index.css'

const App = lazy(() => import('./App.tsx'))
const LayoutWrapper = lazy(() => import('@/layouts/Wrapper'))
const NotFoundPage = lazy(() => import('@/components/Pages/NotFound'))

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StrictMode>
  {/* <ErrorBoundary componentName='Root'> */}
      <BrowserRouter>
      <Suspense fallback={<Loading />}>
          <Routes>
              {/* App */}
                <Route path='/' element={<LayoutWrapper layout='app' />}>
                  <Route index element={<App />} />
                </Route>
              {/* Errors */}
              <Route path='/*' element={<NotFoundPage />} />
          </Routes>
          <ToastContainer position='top-center' autoClose={1000} />
        </Suspense>
      </BrowserRouter>
  {/* </ErrorBoundary> */}
</StrictMode>
)

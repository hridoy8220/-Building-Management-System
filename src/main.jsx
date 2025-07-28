import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router'
import { router } from './Root/Router.jsx'
import AuthProvider from './Auth/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> <RouterProvider router={router} /></AuthProvider>
     <ToastContainer position="top-center" />
  </StrictMode>,
)
 
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import PublicNote from './pages/PublicNote'
import './styles.css'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/p/:shareId', element: <PublicNote /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

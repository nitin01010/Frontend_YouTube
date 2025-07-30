import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import appRoute from './routes/App'
import './style/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRoute} />
  </StrictMode>,
)

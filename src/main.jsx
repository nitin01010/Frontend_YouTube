import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import appRoute from './routes/App'
import './style/index.css';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import store from './app/store';
const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={appRoute} />
        <ToastContainer />
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)

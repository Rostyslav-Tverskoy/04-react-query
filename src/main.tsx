import { StrictMode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { createRoot } from 'react-dom/client'
import './index.css'
import App from '../src/components/App/App'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();


createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
  <StrictMode>
    <App />
  </StrictMode>
  <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
)

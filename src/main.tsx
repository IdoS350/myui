import './theme/main.scss'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', padding: '2rem' }}></div>
  </StrictMode>,
)

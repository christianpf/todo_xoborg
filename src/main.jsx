import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ModalContext, ModalProvider } from './context/modal.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ModalProvider>
   <App />
  </ModalProvider>
)

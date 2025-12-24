import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // This was missing
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* This wrapper enables all navigation and fixes the 'null' error */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

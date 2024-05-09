import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import './seedcss/seedcss-base.css'
import './seedcss/seedcss-buttons.css'
import './seedcss/seedcss-components.css'
import './seedcss/seedcss-utilities.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

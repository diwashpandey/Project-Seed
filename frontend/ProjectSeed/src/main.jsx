// imports from React
import React from 'react'
import ReactDOM from 'react-dom/client'

// imports from third parties react libraries
import {router} from "./Router"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from "react-redux"

// Seed Css import
import './seedcss/seedcss-base.css'
import './seedcss/seedcss-buttons.css'
import './seedcss/seedcss-components.css'
import './seedcss/seedcss-utilities.css'

// Additional imports
import './index.css' // Disclaimer ! This tailwind must overrides other css files
import AuthenticationHadler from "./authentication/AuthProvider"
import { store } from './reduxStore/store'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
          <QueryClientProvider client={queryClient}>
              <AuthenticationHadler >
                <RouterProvider router={router} />
              </AuthenticationHadler>
          </QueryClientProvider>
      </Provider>
   </React.StrictMode>,
)

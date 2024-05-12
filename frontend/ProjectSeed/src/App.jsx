// imports from react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom"

// Components and Pages import
import Home from "./pages/Home"
import Login from "./pages/Login"

// Additional Imports
import AuthProvider from "./authentication/AuthProvider"

const router = createBrowserRouter([
  {
    "path":"",
    element: <Home />
  },
  {
    "path":"/Login",
    element: <Login />
  },
])

function App() {

  return (
    <AuthProvider >
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App

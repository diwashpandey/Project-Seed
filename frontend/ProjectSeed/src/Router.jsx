import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import BaseApp from "./BaseApp";

export const router = createBrowserRouter(
    createRoutesFromElements([
        <Route path="" element={<BaseApp />} >
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Route>
      ])
  )

// const router = createBrowserRouter([
//   {
//     "path":"",
//     element: <Home />
//   },
//   {
//     "path":"/Login",
//     element: <Login />
//   },
// ])
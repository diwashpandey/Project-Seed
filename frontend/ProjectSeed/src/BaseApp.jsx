// imports from react third party libraries
import { Outlet } from "react-router-dom"

// components import
import Header from "./components/Header/Header"


function BaseApp() {

  return (
    <>
      <Header /> 
      <Outlet /> {/* Doing this because Headers are always in every pages */}
    </>
  )
}

export default BaseApp

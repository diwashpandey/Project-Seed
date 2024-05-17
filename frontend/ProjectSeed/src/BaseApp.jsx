// imports from react third party libraries
import { Outlet } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useQuery } from "react-query"

// components import
import Header from "./components/Header/Header"

// Additional imports
import { authUserDataFetcher } from "./fetchers/AuthUserData/authUserDataFetcher"
import { useEffect } from "react"
import { setAuthUserData } from "./reduxStore/features/UserData/userDataSlice"

function BaseApp() {

  const dispatch = useDispatch()

  const { data, isSuccess } = useQuery({
    queryKey: "authUserDataQuery",
    queryFn: () => authUserDataFetcher()
  })

  useEffect(()=>{
    if (isSuccess){
      console.log("success found true", data)
      dispatch(setAuthUserData(data))
    }
  },[data])


  return (
    <>
      <Header /> 
      <Outlet /> {/* Doing this because Headers are always in every pages */}
    </>
  )
}

export default BaseApp

// imports from React
import {useEffect, useState, useContext, memo} from "react"

// Third party libraries import
import { useQuery } from "react-query"
import { useSelector, useDispatch } from "react-redux"

// Components and Pages import
import LeftRankingBox from "../components/Home/LeftBox/LeftRankingBox"
import ProfileBox from "../components/Home/RightBox/ProfileBox"
import LoginBox from "../components/Home/RightBox/LoginBox"
import LeftDummyBox from "../components/Home/LeftBox/LeftDummyBox"
import MiddleMainBox from "../components/Home/MiddleMainBox/MiddleMainBox"
import Loading from "./Loading"

// Additional Imports
import { AuthContext } from "../authentication/AuthProvider"
import { setHomeData } from "../reduxStore/features/Home/homeDataSlice"
import { HomePageAuthenticatedURL, HomePageNonAuthenticatedURL } from "../utilities/apiEndpoints";
import { fetchHomeData } from "../fetchers/Home/fetchHomeData"
import axios from "axios"
import useAxios from "../hooks/useAxios"

function Home(){
  const {isAuthenticated} = useContext(AuthContext)
  const homePageData = useSelector((state)=>state.homeDataReducer)
  const dispatch = useDispatch()

  const url = isAuthenticated ? HomePageAuthenticatedURL : HomePageNonAuthenticatedURL

  const { data, isError, isSuccess, error, isLoading } = useQuery({
    queryKey:["homeDataQuery"],
    queryFn: () => fetchHomeData(url)
  });

  useEffect(()=>{
    if (isSuccess){
      dispatch(setHomeData(data))
    }
    if(isError){
      console.log("found error", error.message)
    }
  }, [isSuccess, isError, isLoading, data])
  
  if(isLoading){
    return <Loading />
  }

  return (
    <>
          {/* Padding_top-70_px is the place for the deader */}
        <main className="flex gap-2 pt-[70px]" >

          {/* This is the left side ranks showing box */}
          <div id="ranking-box" className="hidden h-[calc(100vh-75px)] w-[70%] max-w-[22rem] flex-col gap-2 rounded-md md:flex md:w-[60%]">
            {
              homePageData ? 
              <LeftRankingBox top3Profiles={homePageData.top_3_profiles} top3Posts={homePageData.top_3_posts} />
              : <LeftDummyBox />
            }
          </div>

          {/* This the the main box where posts will be shown */}
          <section id="middle-box" className="h-[calc(100vh-75px)]  w-full rounded-md flex flex-col items-center overflow-scroll">
            <MiddleMainBox />
          </section>
          
          <div id="right-box" className="hidden h-[calc(100vh-75px)] w-[70%] max-w-96 flex-col  lg:flex">

              <div className="profile-box h-fit min-h-[21rem] mb-2 rounded-lg flex flex-col items-center relative bg-main-box">
              
              { isAuthenticated ? <ProfileBox /> : <LoginBox />}

              </div>
              <div className="profile-box h-full w-full p-2 rounded-lg flex flex-col relative bg-main-box overflow-scroll">
                  <h2>People like you</h2>
              </div>
          </div>
        </main>
    </>
    )
  }
  
  export default memo(Home)
  
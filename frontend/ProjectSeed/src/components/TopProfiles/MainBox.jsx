// Imports from react
import { useState, useEffect } from "react"

// imports from third party libraries
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import { useQuery } from "react-query"

// components import
import FilterBox from "./SubComponents/FilterBox"
import ProfileCardsContainer from "./SubComponents/ProfileCardsContainer"
import PlaceProfile from "./SubComponents/PlaceProfile"
import NotFound from "./SubComponents/NotFound"

// additional imports
import { GetTopProfilesURL } from "../../utilities/apiEndpoints"
import { topProfilesFetcher } from "../../fetchers/TopProfiles/topProfilesFetcher"
import { addTopProfiles } from "../../reduxStore/features/TopProfiles/topProfilesSlice"

function MainBox() {

    const dispatch = useDispatch()

    // Creating the URL with filters in query params
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    // Getting empty string if it's null
    const getFrom = searchParams.get('get_from') ?? ""
    const name = searchParams.get('name') ?? ""
    const skill=searchParams.get('skill') ?? ""

    const [count, setCount] = useState(25)

    // Generating the URL for backend
    let url = GetTopProfilesURL(getFrom, name, skill, count)

    // Using query to fetch the top profiles
    const { data, isError, isSuccess, isLoading } = useQuery({
        queryKey:["topProfiles", url], // putting the url here so that it refetches the data when url changes
        queryFn:()=>topProfilesFetcher(url),
        refetchOnWindowFocus: false // Optional: avoid refetch on window focus
    })
    
    // Handiling data after something happens while fetching
    useEffect(()=>{
        if (isSuccess){
          dispatch(addTopProfiles(data))
        }
      }, [isSuccess, isLoading , url])
    

  return (
    
          <div id="main-box" className="w-full max-w-[50rem] p-4 rounded-xl bg-main-box md:p-5">
              {/* <!-- Header --> */}
              <h1 className="text-lg md:text-lg mb-4">Top Peoples</h1>
              {/* <!-- Search box --> */}
              <FilterBox />

              {isSuccess ?
              <>
                {/* <!-- Place Profile Section --> */}
                {getFrom ?
                <PlaceProfile />
                : null
                }
                {/* <!-- Profile Cards Container --> */}
                <ProfileCardsContainer />
              </>
              : 
              ""}

            {isError ?
            <NotFound/> : ""}
          </div>
  )
}

export default MainBox
// Imports from react
import { useEffect } from "react"

// Third party libraries import
import { useQuery } from "react-query"
import { useDispatch } from "react-redux"
import { useLocation, useParams } from "react-router-dom"

// Additional Imports
import { topProfilesFetcher } from "../fetchers/TopProfiles/topProfilesFetcher"
import { addTopProfiles } from "../reduxStore/features/TopProfiles/topProfilesSlice"
import { GetTopProfilesURL } from "../utilities/apiEndpoints"

// Importing Components
import PlaceProfile from "../components/TopProfiles/PlaceProfile"
import PeopleLikeYouBox from "../components/TopProfiles/PeopleLikeYouBox"
import ProfileCardsContainer from "../components/TopProfiles/ProfileCardsContainer"
import SearchBox from "../components/TopProfiles/SearchBox"
import NotFound from "../components/TopProfiles/NotFound"

// This is to generate the safe and managed URL with params
  function generateUrlForTopProfiles(getFrom, name) {
  let count = 30
  // Validate parameters
  if (typeof getFrom !== 'string' || typeof name !== 'string' || !getFrom.trim() || !name.trim()) {
    return GetTopProfilesURL;
  }
  console.log("not here")
  return `${GetTopProfilesURL}?get_from=${getFrom}&name=${name}&count=${count}`;
}

function TopProfiles(){
    const dispatch = useDispatch()

    // Creating the URL with filters in query params
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const getFrom = searchParams.get('get_from');
    const name = searchParams.get('name')
    // Generating the URL for backend
    let url = generateUrlForTopProfiles(getFrom, name)

    // Using query to fetch the top profiles
    const { data, isError, isSuccess, error, isLoading } = useQuery({
        queryKey:["topProfiles", url], // putting the url here so that it refetches the data when url changes
        queryFn:()=>topProfilesFetcher(url),
        refetchOnWindowFocus: false // Optional: avoid refetch on window focus
        
    })
    
    // Handiling data after something happens while fetching
    useEffect(()=>{
        if (isSuccess){
          console.log("ma yaha xu hai")
          dispatch(addTopProfiles(data))
        }
        if(isError){
          alert("Error while fetching homepage data")
        }
      }, [isSuccess, isError, isLoading, data, url])
      console.log("is error is:", isError, "error is:", error)

    
    // Rendering the final page
    return (
      <main className="pt-[70px] flex gap-5 justify-center">

          {/* <!-- main box --> */}
          <div id="main-box" className="w-full max-w-[50rem] p-4 rounded-xl bg-main-box md:p-8">
              {/* <!-- Header --> */}
              <h1 className="text-xl md:text-3xl">Top 50 Students</h1>

              {/* <!-- Search box --> */}
              <SearchBox />

              {isSuccess ?
              <>
                {/* <!-- Place Profile Section --> */}
                <PlaceProfile />
                {/* <!-- Profile Cards Container --> */}
                <ProfileCardsContainer />
                </>
              : 
              ""}

            {isError?
            <NotFound/>:""}

          </div>
          {/* <!-- People Like You Box --> */}
          <PeopleLikeYouBox />
      </main>
    )
  }
  
export default TopProfiles
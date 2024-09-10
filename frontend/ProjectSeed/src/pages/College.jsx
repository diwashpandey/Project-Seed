// Imports from react
import { useEffect } from "react"

// Imports from third party libraries
import { useQuery } from "react-query"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

// Importing Components
import FoundationOfPage from "../components/College/FoundationOfPage"

// Importing additional things
import { setCollegeProfileData } from "../reduxStore/features/CollegeProfile/CollegeProfileSlice"
import { fetchCollegeProfileData } from "../fetchers/CollegeProfile/fetchCollegeProfileData"
import {CollegeProfileURL, CollegeProfileNonAuthURL} from "../utilities/apiEndpoints"

function College() {

  const {college_identifier} = useParams()
  const dispatch = useDispatch()
  const user = useSelector((states)=>states.userReducer)
  const url = user.isAuthenticated ? CollegeProfileURL(college_identifier) : CollegeProfileNonAuthURL(college_identifier)

  const {data, isLoading} = useQuery({
      "queryKey":['collegeData', college_identifier, user.isAuthenticated],
      /* Putting the user.isAuthenticated to refetch according to it.  !! Need to solve this
       When not puting the user.isAuthenticated it's just going with non-auth URL cause isAuthenticated is in loading process when refresh the window */
      "queryFn": ()=>fetchCollegeProfileData(url),
      enabled: !!college_identifier, // Fetch only if college_identifier is available
      refetchOnWindowFocus: false, // To prevent the unnecessary refetch
  })

  useEffect(() => {
    if (data) {
      dispatch(setCollegeProfileData(data))
    }
  }, [data])

  if (isLoading && !data){
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <main className="w-full pt-[70px]">
        <div className="min-h-96 w-full m-auto bg-main-box rounded-lg sm:w-[85%] lg:w-[70%]">
            <FoundationOfPage />
        </div>
    </main>
  )
}

export default College
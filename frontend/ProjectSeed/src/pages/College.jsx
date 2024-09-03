// Imports from react
import { useEffect } from "react"

// Imports from third party libraries
import { useQuery } from "react-query"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

// Importing Components
import MainProfileSection from "../components/College/MainProfileSection"

// Importing additional things
import { setCollegeProfileData } from "../reduxStore/features/CollegeProfile/CollegeProfileSlice"
import { fetchCollegeProfileData } from "../fetchers/CollegeProfile/fetchCollegeProfileData"

function College() {

 const {college_identifier} = useParams()

  const dispatch = useDispatch()

  const {data, isLoading, error} = useQuery({
      "queryKey":['collegeData', college_identifier],
      "queryFn": ()=>fetchCollegeProfileData(college_identifier),
      enabled: !!college_identifier, // Fetch only if college_identifier is available
      refetchOnWindowFocus: false, // To prevent the unnecessary refetch
  })

  useEffect(() => {
    if (data) {
      dispatch(setCollegeProfileData(data))
    }
  }, [data, dispatch])

  if (isLoading && !data){
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <main className="w-full pt-[70px]">
        <div className="min-h-96 w-full m-auto bg-main-box rounded-lg sm:w-[85%] lg:w-[70%]">
            <MainProfileSection />
        </div>
    </main>
  )
}

export default College
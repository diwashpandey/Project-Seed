// Imports from third party libraries
import { useParams, useLocation } from "react-router-dom"
import { useQuery } from "react-query"
import { useSelector } from "react-redux"

// Components imports
import RatingProfileCard from "../Sub-Components/RatingsSection/RatingProfileCard"

// Additional import
import { fetchCollegeRatings } from "../../../fetchers/CollegeProfile/fetchCollegeRatings"
import { GetCollegeRatingsURL, GetCollegeRatingsNonAuthURL } from "../../../utilities/apiEndpoints"
import RatingDummyLoadingCard from "../Sub-Components/RatingsSection/RatingDummyLoadingCard"


function Ratings() {

  const {college_identifier} = useParams()  
  // Creating the URL with filters in query params
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sectionName = searchParams.get('section');

  const user = useSelector((states)=>states.userReducer)
  const url = user.isAuthenticated ? GetCollegeRatingsURL(college_identifier) : GetCollegeRatingsNonAuthURL(college_identifier)

  const {data, isLoading, error} = useQuery({
    "queryKey":['collegeData', url],
    "queryFn": ()=>fetchCollegeRatings(url),
    enabled: !!college_identifier, // Fetch only if college_identifier is available
    refetchOnWindowFocus: false, // To prevent the unnecessary refetch
})

  if (!data && isLoading){
    return (
      <div className="w-full p-8 rounded-xl grid grid-cols-1 gap-4 bg-theme-lighter justify-items-center items-center xl:grid-cols-2">
        <RatingDummyLoadingCard />
        <RatingDummyLoadingCard />
        <RatingDummyLoadingCard />
        <RatingDummyLoadingCard />
        <RatingDummyLoadingCard />
        <RatingDummyLoadingCard />
      </div>
    )
  }


  return (
    <div className="w-full p-8 rounded-xl grid grid-cols-1 gap-4 bg-theme-lighter justify-items-center items-center xl:grid-cols-2">
        <>
            {data?.map((ratingData, index)=>{
                return (
                    <RatingProfileCard key={index} ratingData={ratingData} />
                )
            })}
        </>
    </div>
  )
}

export default Ratings
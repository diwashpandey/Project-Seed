// imports from third party libraries
import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { useSelector } from "react-redux"

// Additonal imports
import { fetchCollegeRatings } from "../../../../fetchers/CollegeProfile/fetchCollegeRatings"
import {GetCollegeRatingsURL, GetCollegeRatingsNonAuthURL} from "../../../../utilities/apiEndpoints"

// Importing components
import RatingProfileCard from "../RatingsSection/RatingProfileCard"
import RatingDummyLoadingCard from "../RatingsSection/RatingDummyLoadingCard"

function MiniRatingsBox() {

    const {college_identifier} = useParams()
    const user = useSelector((states)=>states.userReducer)
    const url = user.isAuthenticated ? GetCollegeRatingsURL(college_identifier, 3) : GetCollegeRatingsNonAuthURL(college_identifier, 3)

    const {data, isLoading, error} = useQuery({
        "queryKey":"college_identifier",
        "queryFn":()=>fetchCollegeRatings(url), // Getting only 3 since this is a mini box
        "refetchOnWindowFocus":false
    })

    if (isLoading){
        return (
            <>
                <RatingDummyLoadingCard />
                <RatingDummyLoadingCard />
                <RatingDummyLoadingCard />
            </>
        )
    }

    if (data){

        return (
            <>
            {data.map((ratingData, index)=>{
                return (
                    <RatingProfileCard key={index} ratingData={ratingData} />
                )
            })}
        </>
        )
    }
}

export default MiniRatingsBox
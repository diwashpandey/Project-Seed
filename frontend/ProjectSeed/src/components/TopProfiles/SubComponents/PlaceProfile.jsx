import {generatePhotoURL} from "../../../utilities/apiEndpoints"
import { useSelector } from "react-redux"

function PlaceProfile(){

    const data = useSelector((state) => state.topProfilesReducer);

    const placeData = data?.place_details

    return(
        <div id="college-or-university-profile" className="relative">

            {/* <!-- background-photo --> */}
            <img id="college-or-university-background-photo" className="h-20 w-full absolute object-cover md:h-28" src={generatePhotoURL(placeData?.background_photo)} alt="" />

            {/* <!-- College or University profile --> */}
            <div id="main-profile" className="flex flex-col items-center relative top-12 z-10 md:top-16">

                {/* <!-- College or university Profile Photo --> */}
                <img id="college-or-university-profile-photo" className="profile-photo h-14 w-14 md:h-20 md:w-20" src={generatePhotoURL(placeData?.profile_photo)} alt="" />

                {/* <!-- More Details --> */}
                <p className="mt-2 md:text-2xl">{placeData?.name}</p>
                <p className="font-light text-xs md:text-sm">{placeData?.country}, {placeData?.location}</p>
                <p className="text-theme-color text-sm font-light md:text-xl">{placeData?.students_count} Students</p>
            </div>
        </div>
    )
}

export default PlaceProfile
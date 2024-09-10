// Importing from third party libraries
import { useSelector } from "react-redux"


// Importing Components
import ProfileDowntown from "./ProfileDowntown"

// Additional Import
import { generatePhotoURL } from "../../utilities/apiEndpoints"

function FoundationOfPage() {

    const collegeProfileData = useSelector((states)=>states.CollegeProfileReducer)

    if (!collegeProfileData){
        return null
    }

  return (
    <>
        {/* Background Photo */}
        <img
        src={generatePhotoURL(collegeProfileData.background_photo)}
        alt=""
        className="h-24 w-full object-cover rounded-t-lg md:h-40"
        />

        {/* Profile Photo and Buttons Seciton */}
        <div className="w-full flex justify-between items-end relative -bottom-2">
            {/* Empty Section 1 */}
            <div></div>

            {/* Profile Photo section */}
            <div className="absolute center left-1/2 -translate-x-1/2">
                {/* Profile Photo */}
                <img
                src={generatePhotoURL(collegeProfileData.profile_photo)}
                alt=""
                className="profile-photo h-24 w-24 border-2 border-white md:h-36 md:w-36 shadow-2xl"
                />
                {/* Rise Points Box */}
                <div className="scale-75 min-w-24 px-3 py-0.5 center rounded-lg absolute -bottom-2 bg-theme-color whitespace-nowrap space-x-1 md:scale-100">
                    {/* RisePoints */}
                    <p>{collegeProfileData.rise_points} Rise Points</p>
                    {/* Rise Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-4 fill-white">
                        <g id="Rise">
                            <path className="cls-1" d="M10,.83A9.17,9.17,0,1,0,19.17,10,9.18,9.18,0,0,0,10,.83Zm3.68,9.06a1.08,1.08,0,0,1-.8.37A1.1,1.1,0,0,1,12.2,10L11.05,9v4.22a1.05,1.05,0,0,1-2.1,0V9L7.8,10a1,1,0,0,1-1.36-1.6L9.32,6a1,1,0,0,1,1.36,0l2.88,2.44A1.06,1.06,0,0,1,13.68,9.89Z"/>
                        </g>
                    </svg>
                </div>
            </div>

            {/* Buttons Section */}
            <div className="flex gap-4 mr-2">
                <div className="rise-btn">Rise</div>
                <div className="follow-btn">follow</div>
            </div>
        </div>

        <ProfileDowntown />
    </>
  )
}

export default FoundationOfPage
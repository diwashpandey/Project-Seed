// Imports from third-party libraries
import { useSelector } from "react-redux"

// Components import
import NameAndAboutUsBox from "../Sub-Components/ProfileSection/NameAndAboutUsBox"
import MoreDetailsBox from "../Sub-Components/ProfileSection/MoreDetailsBox"
import CollegeUploadsContainer from "../Sub-Components/ProfileSection/CollegeUploadsContainer"


function ProfileSection() {
    const collegeProfileData = useSelector((states)=>states.CollegeProfileReducer)

    if (!collegeProfileData){
        return null
    }

  return (
    // main Container
    <>
        {/* Profile Uper Box */}
        <div className="md:flex gap-8 mb-8">
            <NameAndAboutUsBox />{/* Box 1 -> Names and About us */}
            <MoreDetailsBox />{/* Box 2 -> University, Rankings, Courses and Ratings */}
        </div>

        {/* Box 2 -> Uploads Container */}
        <CollegeUploadsContainer />
    </>
  )
}

export default ProfileSection
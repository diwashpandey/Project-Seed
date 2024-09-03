// Importing from third party libraries
import { useParams, Link } from "react-router-dom";

// Components Imports
import ProfileSection from "./Sections/ProfileSection";

// Additional Imports
import { collegeProfileRoute } from "../../utilities/frontendRoutes";


function ProfileDowntown() {
    const {sectionName} = useParams()

    let SectionPage = ProfileSection;
    let [profileActive, studentsActive, facultiesActive, confessionsActive, ratingsActive] = ["nav-btn","nav-btn","nav-btn","nav-btn","nav-btn"]
  
    switch (sectionName){
      case "students":
        // SectionPage = SecuritySection
        studentsActive = "nav-btn-active"
        break;
      case "faculties":
        // SectionPage = PrivacySection
        facultiesActive = "nav-btn-active"
        break;
      case "confessions":
        // SectionPage = NotificationSection
        confessionsActive = "nav-btn-active"
        break;
      case "ratings":
        // SectionPage = EmailSection
        ratingsActive = "nav-btn-active"
        break;
      default:
        // SectionPage = AccountSection
        profileActive = "nav-btn-active"
    }


  return (
    <div className="w-full mt-10">
        <ul id="college-profile-navigation" className="pl-3 flex gap-0 font-light md:gap-4">
            <li><Link
                className={`${profileActive} w-14 p-1 center text-xs md:text-base md:w-20`}
                to={`${collegeProfileRoute}profile`}>Profile</Link></li>
            <li><Link
                className={`${studentsActive} w-14 p-1 center text-xs md:text-base md:w-20`}
                to={`${collegeProfileRoute}students`}>Students</Link></li>
            <li><Link
                className={`${facultiesActive} w-14 p-1 center text-xs md:text-base md:w-20`}
                to={`${collegeProfileRoute}faculties`}>Faculties</Link></li>
            <li><Link
                className={`${confessionsActive} w-14 p-1 center text-xs md:text-base md:w-20`}
                to={`${collegeProfileRoute}confessions`}>Confessions</Link></li>
            <li><Link
                className={`${ratingsActive} w-14 p-1 center text-xs md:text-base md:w-20`}
                to={`${collegeProfileRoute}ratings`}>Ratings</Link></li>
        </ul>

        <section className="">
            <SectionPage />
        </section>
    </div>
  )
}

export default ProfileDowntown
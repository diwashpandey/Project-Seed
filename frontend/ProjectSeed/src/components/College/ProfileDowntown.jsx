// Importing from third party libraries
import { useParams, Link, useLocation } from "react-router-dom";


// Components Imports
import ProfileSection from "./Sections/ProfileSection";
import MembersSection from "./Sections/MembersSection"
import StudentsSection from "./Sections/StudentsSection"
import RatingsSection from "./Sections/RatingsSection"

// Additional Imports
import { generateCollegeProfileRoute } from "../../utilities/frontendRoutes";


function ProfileDowntown() {

    // Creating the URL with filters in query params
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const sectionName = searchParams.get('section');

    // Getting the currest college_identifier name
    const {college_identifier} = useParams()

    let SectionPage = null;
    let [profileActive, studentsActive, facultiesActive, confessionsActive, ratingsActive] = ["nav-btn","nav-btn","nav-btn","nav-btn","nav-btn"]
  
    switch (sectionName){
      case "students":
        SectionPage = StudentsSection;
        studentsActive = "nav-btn-active";
        break;
      case "members":
        SectionPage = MembersSection;
        facultiesActive = "nav-btn-active";
        break;
      // case "confessions":
      //   SectionPage = ConfessionSection
      //   confessionsActive = "nav-btn-active"
      //   break;
      case "ratings":
        SectionPage = RatingsSection;
        ratingsActive = "nav-btn-active";
        break;
      default:
        SectionPage = ProfileSection;
        profileActive = "nav-btn-active";
    }


  return (
    <div className="w-full mt-10">
        <ul id="college-profile-navigation" className="pl-3 flex gap-0 font-light md:gap-4">
            <li><Link
                className={`${profileActive} w-14 p-1 center text-xs md:text-base md:w-20`}
                to={generateCollegeProfileRoute(college_identifier, "profile")}>Profile</Link></li>
            <li><Link
                className={`${studentsActive} w-14 p-1 center text-xs md:text-base md:w-20`}
                to={generateCollegeProfileRoute(college_identifier, "students")}>Students</Link></li>
            <li><Link
                className={`${facultiesActive} w-14 p-1 center text-xs md:text-base md:w-20`}
                to={generateCollegeProfileRoute(college_identifier, "members")}>Members</Link></li>
            {/* <li><Link
                className={`${confessionsActive} w-14 p-1 center text-xs md:text-base md:w-20`}
                to={generateCollegeProfileRoute("confessions")}>Confessions</Link></li> */}
            <li><Link
                className={`${ratingsActive} w-14 p-1 center text-xs md:text-base md:w-20`}
                to={generateCollegeProfileRoute(college_identifier, "ratings")}>Ratings</Link></li>
        </ul>

        <section className="w-full p-4 md:p-8">
            <SectionPage />
        </section>
    </div>
  )
}

export default ProfileDowntown
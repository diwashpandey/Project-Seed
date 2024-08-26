// Third Parties Imports
import {NavLink } from "react-router-dom"
import { useSelector } from "react-redux"

// Importing Icons
import HomeIcon from "../icons/Home"
import TopPosts from "../icons/TopPosts"
import TopProfiles from "../icons/TopProfiles"

// Additional Imports
import { topProfiles } from "../../../utilities/frontendRoutes";

function createUrlWithParams(user) {
    if (!user || !user.isAuthenticated){
      return topProfiles
    }
    if (user.data && user.data.colleges && user.data.colleges.length) {
      return `${topProfiles}?get_from=college&name=${user.data.colleges[0].name}`; // Adding the college name in the params
    } 
    if (user.data && user.data.universities && user.data.universities.length) {
      return `${topProfiles}?get_from=university&name=${user.data.universities[0].name}`; // Adding the university name in the params
    }
    return topProfiles;
  }

function Nav() {

    const user = useSelector((state)=>state.userReducer)
    const topProfilesUrl = createUrlWithParams(user)

    return(
        <nav className="h-full flex absolute bottom-0 left-[50%] translate-x-[-50%]">
            <ul className="center gap-1 sm:gap-4 md:gap-8">

                <li className="w-16 h-full">
                    <NavLink to="/" className={(e) => {
                        return ( e.isActive ? "nav-btn-active h-full w-16 p-4 center md:p-3" : "nav-btn h-full w-16 p-4 center md:p-3")
                        }}>
                    <HomeIcon /> {/* This is icon */}
                    </NavLink>
                </li>

                <li className="w-16 h-full">
                    <NavLink to={topProfilesUrl} className={(e) => {
                            return ( e.isActive ? "nav-btn-active h-full w-16 p-4 center md:p-3" : "nav-btn h-full w-16 p-4 center md:p-3")
                            }}>
                        <TopPosts /> {/* This is icon */}
                    </NavLink>
                </li>

                <li className="w-16 h-full">
                    <NavLink to="/hgfdgh" className={(e) => {
                            return ( e.isActive ? "nav-btn-active h-full w-16 p-4 center md:p-3" : "nav-btn h-full w-16 p-4 center md:p-3")
                            }}>
                        <TopProfiles /> {/* This is icon */}
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}


export default Nav
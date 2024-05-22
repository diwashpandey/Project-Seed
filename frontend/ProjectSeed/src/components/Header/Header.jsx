// Third Parties Imports
import { Link, NavLink } from "react-router-dom"
import { useSelector } from "react-redux"

// Pages and Components import
import HomeIcon from "./icons/Home"
import TopPosts from "./icons/TopPosts"
import TopProfiles from "./icons/TopProfiles"

// Additional Imports
import { generatePhotoURL } from "../../utilities/apiEndpoints"
import { loginRoute } from "../../utilities/frontendRoutes"

export default function Header(){

    return (
    <header className="h-[60px] w-full mb-2 flex justify-between items-center px-2 bg-main-box md:px-6 fixed z-10">
        <LogoAndSearch />
        <Nav />
        <ProfileSection />
    </header>
    )
}

function LogoAndSearch(){
    return(
        <div className="logo-and-search center gap-3">
            <span className="text-theme-color font-semibold">LOGO</span>
            <form action="">
                <input type="text" placeholder="Search for talents" className="hidden h-7 w-48 pl-4 border-[1px] border-orange-500 rounded-2xl bg-theme-darker text-xs md:block focus-visible:outline-none "/>
            </form>
        </div>
    )
}

function Nav(){
    return(
        <nav className="h-full flex absolute bottom-0 left-[50%] translate-x-[-50%]">
            <ul className="center gap-1 sm:gap-4 md:gap-8">
                <li className="w-16 h-full">
                    <NavLink to="/" className={(e) => {
                        return ( e.isActive ? "nav-btn-active h-full w-16 p-4 center md:p-3" : "nav-btn h-full w-16 p-4 center md:p-3")
                        }}>
                    <HomeIcon />
                    </NavLink>
                </li>
                <li className="w-16 h-full">
                    <NavLink to="/login" className={(e) => {
                            return ( e.isActive ? "nav-btn-active h-full w-16 p-4 center md:p-3" : "nav-btn h-full w-16 p-4 center md:p-3")
                            }}>
                        <TopPosts />
                    </NavLink>
                </li>
                <li className="w-16 h-full">
                    <NavLink to="/register" className={(e) => {
                            return ( e.isActive ? "nav-btn-active h-full w-16 p-4 center md:p-3" : "nav-btn h-full w-16 p-4 center md:p-3")
                            }}>
                        <TopProfiles />
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

function ProfileSection(){
    const user = useSelector((state)=> state.userReducer)


    return (
        <div className="header-profile center gap-1">
        {
            // Rendering this part according to the authentication
            user.isAuthenticated ?
            <>
                
                <a href="" className="hidden md:block">
                    <img src={user.data ? `${generatePhotoURL(user.data.profile_photo)}` : ""} alt="" className="profile-photo h-10 w-10 bg-slate-400"/>
                </a>
                <div className="ellipsis-btn h-7 w-7 center flex-col cursor-pointer rounded-full p-1 hover:bg-slate-600">
                    <div className="rounded-full h-1 w-1 m-auto bg-white"></div>
                    <div className="rounded-full h-1 w-1 m-auto bg-white"></div>
                    <div className="rounded-full h-1 w-1 m-auto bg-white"></div>
                </div>
            </> :
            // Else
            <>
                <Link className="rise-btn" to={loginRoute}>Login</Link>
            </>
        }
        </div>
    )
}
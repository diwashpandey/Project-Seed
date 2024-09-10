// Third Parties Imports
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";

// Additional Imports
import { generatePhotoURL } from "../../../utilities/apiEndpoints";
import { loginRoute, generateProfileRoute, settingsRoute } from "../../../utilities/frontendRoutes";
import handleLogout from "../../../authentication/logoutHandler"

function ProfileSection() {
  const user = useSelector((state) => state.userReducer);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="header-profile center gap-1">
      {
        user.isAuthenticated ? (
          <>
            <Link to={generateProfileRoute(user.data?.username)} className="hidden md:block">
              <img 
                src={user.data ? `${generatePhotoURL(user.data.profile_photo)}` : ""} 
                alt="" 
                className="profile-photo h-10 w-10 mr-2 bg-slate-400 rounded-full"
              />
            </Link>

            {/* DropDown */}
            <div className="relative" ref={dropdownRef}>
              <div 
                className="ellipsis-btn h-7 w-7 center flex-col cursor-pointer rounded-full p-1 hover:bg-slate-600 transition-colors"
                onClick={toggleDropdown}
              >
                <div className="rounded-full h-[0.2rem] w-[0.2rem] m-auto bg-white"></div>
                <div className="rounded-full h-[0.2rem] w-[0.2rem] m-auto bg-white"></div>
                <div className="rounded-full h-[0.2rem] w-[0.2rem] m-auto bg-white"></div>
              </div>
              
              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-theme-darker rounded-lg overflow-hidden transition-transform transform scale-100 origin-top-right shadow-xl">
                  <div className="flex flex-col">
                    <Link 
                      to={generateProfileRoute(user.data?.username)} 
                      className="dropdown-item px-4 py-2 hover:bg-[var(--main-boxes-color)]"
                    >
                      View Profile
                    </Link>
                    <Link 
                      to={`${settingsRoute}account`} 
                      className="dropdown-item px-4 py-2 hover:bg-[var(--main-boxes-color)]"
                    >
                      Settings
                    </Link>
                    
                    {/* Extra Line */}
                    <div className="w-[90%] m-auto h-[1px] mt-3 bg-black-white opacity-40"></div>

                    <button 
                      className="dropdown-item w-full px-4 py-2 hover:bg-[var(--main-boxes-color)] bg-theme-darker text-red-600 text-left"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                    {/* Add more options here as needed */}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link className="rise-btn" to={loginRoute}>Login</Link>
        )
      }
    </div>
  );
}

export default ProfileSection;

// Imports from react
import { useState } from "react"

// Imports from third party libraries
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"

// Components Import
import PostsBox from "./DowntownComponents/PostsBox"
import FollowersBox from "./DowntownComponents/FollowersBox"
import FollowingBox from "./DowntownComponents/FollowingBox"
import RisenByBox from "./DowntownComponents/RisenByBox"
import RisesBox from "./DowntownComponents/RisesBox"


export default function ProfileDowntown({user}) {

  const [section, setSection] = useState("posts")

  let content;
  let [postsActive, followingActive, followersActive, risesActive, risenByActive] = ["nav-btn","nav-btn","nav-btn","nav-btn","nav-btn"]
  if (section === "following") {
    // Render content for following section
    content = <FollowingBox username={user.username} />;
    followingActive = "nav-btn-active";

  } else if (section === "followers") {
    // Render content for followers section
    content = <FollowersBox username={user.username} />;
    followersActive = "nav-btn-active";

  } else if (section === "rises") {
    // Render content for rises section
    content = <RisesBox username={user.username} />;
    risesActive = "nav-btn-active";

  } else if (section === "risenBy") {
    // Render content for risenBy section
    content = <RisenByBox username={user.username} />;
    risenByActive = "nav-btn-active";
    
  } else {
    // Default to rendering PostsBox component
    content = <PostsBox user={user} />;
    postsActive = "nav-btn-active";
  }

  return (
    <div id="profile-downtown-section" className="bg-main-box pt-5 sm:p-8 rounded-md">
        <ul id="profile-downtown-nav" className="flex gap-3 px-2">
            <li onClick={()=>{setSection("posts")}} className={`${postsActive} center p-1 text-[0.6rem] sm:text-sm sm:p-3`}>Achievements</li>
            <li onClick={()=>{setSection("following")}} className={`${followingActive} center p-1 text-[0.6rem] sm:text-sm sm:p-3`}>Following</li>
            <li onClick={()=>{setSection("followers")}} className={`${followersActive} center p-1 text-[0.6rem] sm:text-sm sm:p-3`}>Followers</li>
            <li onClick={()=>{setSection("rises")}} className={`${risesActive} center p-1 text-[0.6rem] sm:text-sm sm:p-3`}>Rises</li>
            <li onClick={()=>{setSection("risenBy")}} className={`${risenByActive} center p-1 text-[0.6rem] sm:text-sm sm:p-3`}>Risen By</li>
        </ul>

        <div id="profile-downtown-main-container" className="bg-theme-lighter min-h-96 rounded-lg sm:px-4 py-4">
          {content}
        </div>
    </div>
  )
}

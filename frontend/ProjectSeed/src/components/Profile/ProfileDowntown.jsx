// Imports from react
import { useState } from "react"

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

  switch (section) {
    case 'following':
      followingActive = "nav-btn-active";
      content =  <FollowingBox />;
      break;
    case 'followers':
      followersActive = "nav-btn-active";
      content =  <FollowersBox />;
      break;
    case 'rises':
      risesActive = "nav-btn-active";
      content =  <RisesBox />;
      break;
    case 'risenBy':
      risenByActive = "nav-btn-active";
      content =  <RisenByBox />;
      break;
    default:
      postsActive = "nav-btn-active";
      content =  <PostsBox />;
      break;
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

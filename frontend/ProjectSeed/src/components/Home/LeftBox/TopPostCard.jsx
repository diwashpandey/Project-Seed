// imports from react
import React from 'react'

// Additional imports
import { generatePhotoURL } from "../../../utilities/apiEndpoints"

const TopPostCard = ({topPost}) => {
  return (
    <a className="top-achievement-card p-2 rounded-lg w-full block relative mb-2 cursor-pointer">
        <div className="upper-section flex gap-2">
            <img src={generatePhotoURL(topPost.user.profile_photo)} id="post-user-profile-photo" className="profile-photo h-10 w-10" />
            <div className="mb-2">
                <div className="flex items-center gap-2">
                    <div className="top-achievement-full-name text-base font-light">{topPost.user.full_name}</div>
                    <div className="top-achievement-username text-xs font-extralight">@{topPost.user.full_name}</div>
                </div>
                <p className="top-achievement-caption text-ellipsis text-xs font-light">{topPost.caption}</p>
            </div>
        </div>
        
        {/* Adding the photo if exists */}
        {
          topPost.photos[0] ? <img src={generatePhotoURL(topPost.photos[0].photo)} className="h-12 w-12 ml-16 object-cover rounded-md" /> : null
        }
        <p className="top-achievement-rise-countpy-1 px-2 border-2 border-theme-color rounded-lg text-theme-color absolute right-3 bottom-3">{topPost.rises_count} rises</p>
    </a>
  )
}

export default TopPostCard

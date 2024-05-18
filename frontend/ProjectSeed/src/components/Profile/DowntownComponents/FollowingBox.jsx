import React from 'react'

export default function FollowingBox() {
  return (
    <div id="profile-downtown-following-container" className="user_profile_downtown_sections">
      <div id="downtown-following-container-header" className="flex justify-between p-1 sm:p-4">
          <h2 className="text-lg sm:text-2xl md:text-3xl">Following</h2>
          
          {/* <!-- This feature will be added later -->
          <!-- <button className="hidden white-btn w-40 text-[0.5em] sm:text-sm sm:block">Teacher | Student</button> --> */}
          
      </div>
      <div id="downtown-following-user-cards-container" className="flex flex-col items-center">

      </div>
  </div>
  )
}

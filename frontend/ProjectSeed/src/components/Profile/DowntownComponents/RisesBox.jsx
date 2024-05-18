import DowntownProfileCard from "./DowntownProfileCards"

export default function RisesBox() {
  return (
    <div id="profile-downtown-rises-container" className="user_profile_downtown_sections">
      <div id="downtown-rises-container-header" className="flex justify-between p-1 sm:p-4">
          <h2 className="text-lg sm:text-2xl md:text-3xl">Rises</h2>
          
          {/* <!-- This feature will be added later -->
          <!-- <button class="hidden white-btn w-40 text-[0.5em] sm:text-sm sm:block">Teacher | Student</button> --> */}
          
      </div>
      <div id="downtown-rises-user-cards-container" className="flex flex-col items-center">
          <DowntownProfileCard />

      </div>
  </div>
  )
}

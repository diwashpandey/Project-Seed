// imports from third party libraries
import { useSelector } from "react-redux";

// Importing components
import ProfileCard from "./ProfileCard"

function ProfileCardsContainer() {
  let data = useSelector((state)=>state.topProfilesReducer)

  return (

    <div id="user-profiles-container" className="w-[90%] mx-auto mt-24 py-8 rounded-2xl bg-main-background grid grid-cols-1 sm:grid-cols-2">

    {/* <!-- Top Profile Cards --> */}

    {/* Doing [0] to take first thing because it's returning the array inside array, I don't know why */}
    {data?.top_profiles?.map(
      (profiles, index) => <ProfileCard key={index} data={profiles}  index={index+1} />
    )}
    {/* Adding +1 cause it starts from 0 */}

    </div>

  );
}

export default ProfileCardsContainer
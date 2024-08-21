import {generatePhotoURL} from "../../utilities/apiEndpoints"

function ProfileCard({data, index}){
    return(
        <div id="user-profile-card" className="min-h-28 w-full mb-8 flex justify-center items-center gap-2">

        {/* Here, choosing the background and text color 
            according to the position and the theme */}
        <p id="position-number"className={`h-8 w-8 ${index <= 3 ? 'bg-theme-color' : 'bg-black-white text-light-mode-opposite-color'} center rounded-full`}>
            {index}
        </p>

        {/* <!-- Main card --> */}
        <div id="card" className="min-h-24 w-[80%] p-2 rounded-lg flex relative bg-theme-darker">

            {/* <!-- RisePoints Count Box --> */}
            <div id="rise-points" className="center absolute right-0 top-0 translate-y-[-100%] bg-theme-color px-4 py-0.5
            rounded-tr-3xl rounded-tl-md">
                <span className="text-xs sm:text-base">{data.rise_points} rise points</span>
            </div>

            {/* <!-- Profile Photo --> */}
            <img src={generatePhotoURL(data.profile_photo)} alt="" className="profile-photo mx-2 h-10 w-10 sm:h-14 sm:w-14" />

            {/* <!-- User Details --> */}
            <div>
                <div id="name-and-username" className="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-4 mb-2">
                    <p id="user-full-name" className="text-sm sm:text-base md:text-lg">{data.full_name}</p>
                    <p id="user-username" className="text-xs md:text-sm font-light">@{data.username}</p>
                </div>
                <p id="user-intro" className="text-sm md:text-base">{data.intro?data.intro : "*No intro given*"}</p>
            </div>
        </div>
        </div>
    )
}

export default ProfileCard
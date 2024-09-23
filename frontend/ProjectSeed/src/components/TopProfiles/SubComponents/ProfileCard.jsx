import {generatePhotoURL} from "../../../utilities/apiEndpoints"

function ProfileCard({data, index}){
    
    // This will define the color according to the rank
    const color = index <= 3 ? 'bg-theme-color' : 'bg-black-white text-light-mode-opposite-color'

    // Giving the full space for the 1st person
    const spanClass = index === 1 ? 'col-span-2' : '';

    // Seperate Width for the top profile
    const width = index === 1 ? 'w-1/2' : 'w-[90%]'


    return(
        <div id="user-profile-card" className={`${width} mb-4 justify-self-center flex flex-col gap-1 center ${spanClass}`}>

            {/* Here, choosing the background and text color 
                according to the position and the theme */}
            <p id="position-number"className={`h-8 w-8 ${index <= 3 ? 'bg-theme-color' : 'bg-black-white text-light-mode-opposite-color'} center rounded-full`}>
                {index}
            </p>

            <div className="min-h-36 w-full p-2 rounded-lg relative bg-main-box">

                {/* Rise Points Box */}
                <div className={`${color} w-fit px-2.5 py-1 rounded-tl-xl  center absolute top-0 right-2 -translate-y-full `}>
                    <p className={`text-xs ${color}`}>
                        {data.rise_points} rise points
                    </p>
                </div>
                


                {/* Background Photo */}
                <img src={generatePhotoURL(data.profile_photo)}
                alt=""
                className="h-12 w-full object-cover rounded-t-lg"/>

                {/* Information Container */}
                <div className="flex items-end gap-1 relative bottom-2">

                    {/* Profile Photo container */}
                    <div className="h-11 w-11 p-1 center rounded-full bg-main-box">
                        <img src={generatePhotoURL(data.profile_photo)}
                        alt=""
                        className="profile-photo h-full w-full"
                        />
                    </div>

                    {/* Name and Username Container */}
                    <div>
                        <p className="text-sm h-4">{data.full_name}</p>
                        <p className="text-xs font-extralight">@{data.username}</p>
                    </div>
                </div>

                {data.intro ? 
                    <p className="font-extralight px-2">
                        {data.intro.length > 50 ? `${data.intro.slice(0, 50)}...` : data.intro}
                    </p>
                : null}
            </div>

        </div>
    )
}

export default ProfileCard

// Imports from thirdparty libraries
import { useSelector } from "react-redux"

function NameAndAboutUsBox() {
    const collegeProfileData = useSelector((states)=>states.CollegeProfileReducer)

    return (
        <div className="w-full md:w-[60%] md:max-h-52 mb-4 space-y-2 ">

            {/* Box 1.1 -> Names ,intro, counts */}
            <div className="h-auto w-[80%] m-auto p-2 rounded-xl center flex-col bg-theme-lighter md:w-auto md:p-6">
                {/* College Name */}
                <p className="text-lg md:text-xl text-center">{collegeProfileData.name}</p>
                {/* College username */}
                <p className="text-xs text-theme-color font-light mb-4 md:text-sm">@{collegeProfileData.college_identifier}</p>
                {/* College Intro */}
                <p className="mb-4 text-sm text-center md:mb-8 md:text-base">{collegeProfileData.intro}</p>
                {/* College Students Counts*/}
                <div className="bg-black-white p-1 center flex-col rounded-xl md:p-6">
                    <p className="text-light-mode-opposite-color md:text-2xl ">5k</p>
                    <p className="text-light-mode-opposite-color font-light text-xs md:text-base">Students</p>
                </div>
            </div>

            {/* Box 1.2 -> About us */}
            <div className="w-[80%] m-auto p-2 rounded-xl bg-theme-lighter md:w-auto md:p-8">
                <h2 className="text-center text-lg mb-1 md:mb-4 md:text-2xl">About Us</h2>
                <pre className="text-center font-light text-xs md:text-base whitespace-pre-wrap">
                    {collegeProfileData.about_us}
                </pre>
            </div>

        </div>
    )
}

export default NameAndAboutUsBox
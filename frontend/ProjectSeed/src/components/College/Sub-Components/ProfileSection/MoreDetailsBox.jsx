// Imports from thirdparty libraries
import { Link } from "react-router-dom"

// Importing Components
import UniversityProfileCard from "../../Sub-Components/ProfileSection/UniversityProfileCard"
import MiniRatingsBox from "./MiniRatingsBox"

function MoreDetailsBox() {
    return (
        <div className="w-full p-4 rounded-xl bg-theme-lighter">
            {/* Affiliated to Container */}
            <div className="w-full mb-4 center gap-4">
                <p className="h-6 w-16 center rounded-lg bg-black-white text-[0.6rem] font-light text-light-mode-opposite-color md:h-8 md:text-sm md:w-20">Affiliated To</p>
                <UniversityProfileCard />
            </div>

            {/* Ranking and Courses Provided Box */}
            <div className="gap-4 w-full mb-4 md:flex">
                {/* Ranking Box */}
                <div className="w-[50%] h-36 mb-2 m-auto rounded-xl center flex-col bg-main-box gap-4 md:h-48">
                    <h3 className="p-2 rounded-lg bg-theme-color text-center text-xs md:text-base">In Nepal Ranking</h3>
                    <p className="h-16 w-16 rounded-full center text-xl bg-black-white text-light-mode-opposite-color">15th</p>
                </div>
                {/* Courses Provided Box */}
                <div className="w-full rounded-xl p-4 center flex-col bg-main-box">
                    <h3 className="px-2 py-1 mb-4 text-sm rounded-lg bg-black-white text-light-mode-opposite-color md:text-base">Courses Provided</h3>
                    {/* Courses Container */}
                    <p className="mb-2 text-center text-sm font-light">Bachelors of Science in Information Technology {"(BScIt)"}</p>
                    <p className="mb-2 text-center text-sm font-light">Masters of Science in Information Technology {"(MScIt)"}</p>
                    <p className="mb-2 text-center text-sm font-light">Bachelors of in Accountant {"(BA)"}</p>
                    <p className="mb-2 text-center text-sm font-light">Bachelors in Artificial Intelligence {"(BAI)"}</p>
                    <p className="mb-2 text-center text-sm font-light">Bachelors of Science in Information Technology {"(BScIt)"}</p>
                    
                    <p className="w-full px-4 text-light font-light text-sm text-right cursor-pointer hover:underline">See more</p>
                </div>
            </div>

            {/* Ratings Qucik View Box */}
            <div className="p-4 pb-7 rounded-xl relative bg-main-box">
                <h3 className="mb-2 text-lg font-light md:text-2xl">Latest Ratings</h3>
                {/* Ratings Container */}
                <div className="h-56 w-full p-4 space-y-4 rounded-xl center flex-col bg-theme-lighter overflow-y-scroll md:h-auto">
                    <MiniRatingsBox />
                </div>
                    <Link
                    to="/"
                    className="absolute font-extralight text-sm hover:underline bottom-1 right-6"
                    >See more</Link>
            </div>
        </div>
    )
}

export default MoreDetailsBox
// importing components
import StarIcon from "../../Icons/StarIcon"

// importing additional stuffs
import {generatePhotoURL} from "../../../../utilities/apiEndpoints"

function RatingProfileCard({ratingData}) {
  return (
    <div className="w-[85%] max-w-96 h-auto pl-6 pr-4 py-2 rounded-xl flex flex-col relative bg-main-box md:w-[80%] md:pl-10">
        {/* Profile Photo Container */}
        <div className="h-12 w-12 rounded-full center absolute -left-6 top-1/2 -translate-y-1/2 bg-theme-lighter md:h-14 md:w-14">
            <img src={generatePhotoURL(ratingData.user.profile_photo)} alt="" 
            className="h-[70%] w-[70%] profile-photo"/>
        </div>

        {/* Container 2 */}
        <div className="w-full justify-between md:flex">
            {/* Name and star container */}
            <div className="flex gap-2">
                <p className="text-xs md:text-base">{ratingData.user.full_name}</p>
                <p className="text-xs font-light opacity-45 md:text-sm">rated</p>
            </div>

            {/* stars */}
            <div className="flex gap-0.5 mb-2 md:mb-0">

                {/* Here Rendering the yellow stars for the rating and gray for the rest */}
                {[...Array(5)].map((_, index) => (
                    // Render yellow stars for the rating and gray for the rest
                    <StarIcon key={index} color={index < ratingData.rating ? "fill-yellow-400" : "fill-text-color opacity-40"} />
                ))}

            </div>
        </div>

        {/* Comment */}
        <p className="h-auto text-xs font-light md:text-base">
            {ratingData.comment}
        </p>

    </div>
  )
}

export default RatingProfileCard
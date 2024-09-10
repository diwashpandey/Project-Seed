import StarIcon from "../../Icons/StarIcon"
function RatingDummyLoadingCard() {
    return (
        <div className="w-[85%] max-w-96 h-16 pl-6 pr-4 py-2 rounded-xl flex flex-col relative bg-main-box md:w-[80%] md:pl-10">
            {/* Profile Photo Container */}
            <div className="h-12 w-12 rounded-full center absolute -left-6 top-1/2 -translate-y-1/2 bg-theme-lighter md:h-14 md:w-14">
                <div src="" alt="" 
                className="h-[70%] w-[70%] profile-photo bg-gray-500  animate-pulse"/>
            </div>
    
            {/* Container 2 */}
            <div className="w-full justify-between md:flex">
                {/* Name and star container */}
                <div className="h-4 w-[40%] mb-2 rounded-sm bg-theme-lighter animate-pulse"></div>
    
                {/* stars */}
                <div className="flex gap-0.5 mb-2 md:mb-0">
                    
                    {/* Stars */}
                    {[...Array(5)].map((_, index) => (
                        <StarIcon key={index} color={"fill-text-color opacity-40 animate-pulse"} />
                    ))}
    
                </div>
            </div>
    
            {/* Comment */}
            <div className="h-4 w-[60%] rounded-sm bg-theme-lighter animate-pulse"></div>
    
        </div>
      )
}

export default RatingDummyLoadingCard
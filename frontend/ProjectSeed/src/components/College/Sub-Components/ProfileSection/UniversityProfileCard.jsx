function UniversityProfileCard() {
  return (
    <div className="h-16 w-56 rounded-2xl center gap-2 bg-main-box md:h-20 md:gap-4">
        {/* University Logo */}
        <img
        className="profile-photo h-10 w-10 md:h-12 md:w-12"
        src="https://t3.ftcdn.net/jpg/04/91/76/62/360_F_491766294_h4j7LbW2YgfbNHhq7F8GboIc1XyBSEY5.jpg"
        alt="" />
        {/* Name and Locaiton container */}
        <div>
            {/* Name */}
            <p className="text-sm md:text-base">Westcliff University</p>
            {/* Locaiton */}
            <p className="text-xs md:text-sm font-light">USA, California - 3</p>
        </div>
    </div>
  )
}

export default UniversityProfileCard
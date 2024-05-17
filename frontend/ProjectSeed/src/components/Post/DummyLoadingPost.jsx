function DummyLoadingPost() {
  return (
    <div className="dummy-post w-full max-w-xl p-2 mt-4 rounded-2xl bg-main-box">
        <div className="upper-section flex items-center relative bottom-3 pl-1 sm:bottom-4 md:pl-4">
            <div className="post-user-profile-photo-container h-[50px] w-[50px] mr-1 rounded-full center relative bottom-1 bg-main-box md:bottom-0 md:mr-2 md:h-[70px] md:w-[70px]">
                <div className="profile-photo h-[80%] w-[80%] bg-gray-400 animate-pulse"></div>
            </div>
            <div>
                <div className="h-4 w-32 mb-2 rounded-full bg-gray-400 animate-pulse"></div>
                <div className="flex">
                    <div className="h-4 w-32 mr-5 rounded-full bg-gray-400 animate-pulse"></div>
                    <div className="h-4 w-32 rounded-full bg-gray-400 animate-pulse"></div>
                </div>
            </div>
        </div>
        <div className="post-photo-section center mb-4 gap-4">
            <div className="h-80 w-80 rounded-lg object-cover sm:h-96 sm:w-96 bg-gray-400 md:h-96 md:w-96 animate-pulse"></div>
        </div>
        <div className="post-btn-section center gap-7">
            <div className="rise-btn bg-gray-400 animate-pulse"></div>
            <div className="comment-btn bg-gray-400 animate-pulse"></div>
        </div>
    </div>
  )
}
export default DummyLoadingPost
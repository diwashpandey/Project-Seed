function PeopleLikeYouBox() {

  return (
        <div id="people-like-you" className="hidden w-[60%] max-w-96 h-96 p-4 space-y-2 rounded-xl flex-col items-center bg-main-box md:flex">
            <h2 className="mb-2 self-start text-2xl">People Like You</h2>
            {/* <!-- Suggestion-user-profile-card --> */}
            <div id="suggestion-user-profile-card" className="w-[90%] pb-3 my-2 border-b-2 border-gray-600 flex">
                <img src="http://127.0.0.1:8000/media/users_profile_photos/Guitar.jpg" alt="" className="profile-photo mr-2 h-10 w-10" />
                <div className="relative w-full">
                    {/* <!-- Full Name --> */}
                    <p>Diwash Pandey</p>

                    {/* <!-- Intro --> */}
                    <div className="min-h-5 w-full mb-2">
                        <span className="font-extralight">I am diwash pandey</span>
                    </div>

                    {/* <!-- College or University, and RisePoints --> */}
                    <div className="flex gap-2">
                        <p className="py-0.5 px-2 rounded-lg text-light-mode-opposite-color text-xs font-light bg-black-white">Westcliff University</p>
                        <p className="py-0.5 px-2 rounded-lg center text-white text-xs font-light bg-theme-color">5000 Rises</p>
                    </div>

                    {/* <!-- The Follow Button --> */}
                    <button className="follow-btn h-6 absolute top-0 right-0 text-sm font-extralight">Follow</button>
                </div>
            </div>
        </div>
  );

}

export default PeopleLikeYouBox;

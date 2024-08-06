import { useQuery } from "react-query"

import { topProfilesFetcher } from "../fetchers/TopProfiles/topProfilesFetcher"

function TopProfiles(){
    return (
      <main className="pt-[70px] flex gap-5 justify-center">
          {/* <!-- main box --> */}
          <div id="main-box" className="w-full max-w-[50rem] p-4 rounded-xl bg-main-box md:p-8">

              {/* <!-- Header --> */}
              <h1 className="text-xl md:text-3xl">Top 50 Students</h1>

              {/* <!-- Search box --> */}
              <form id="search-box" className="relative flex items-center my-5" action="">
                  <img className="h-4 absolute left-1" src="./search.png" alt="" />
                  <input type="text" className="bg-theme-lighter h-8 w-96 pl-7 rounded-md focus-visible:outline-none" placeholder="Search for college or university" />
              </form>

              {/* <!-- Profile Section --> */}
              <div id="college-or-university-profile" className="relative">

                  {/* <!-- background-photo --> */}
                  <img id="college-or-university-background-photo" className="h-20 w-full absolute object-cover md:h-28" src="./p.jpg" alt="" />

                  {/* <!-- College or University profile --> */}
                  <div id="main-profile" className="flex flex-col items-center relative top-12 z-10 md:top-16">

                      {/* <!-- College or university Profile Photo --> */}
                      <img id="college-or-university-profile-photo" className="profile-photo h-14 w-14 md:h-20 md:w-20" src="./p.jpg" alt="" />

                      {/* <!-- More Details --> */}
                      <p className="mt-2 md:text-2xl">Westcliff University</p>
                      <p className="font-light text-xs md:text-sm">America, California -8</p>
                      <p className="text-theme-color text-sm font-light md:text-xl">50K Students</p>
                  </div>
              </div>

              {/* <!-- Students Cards Container --> */}
              <div id="user-profiles-container" className="w-full mt-24">


                  {/* <!-- Card --> */}
                  <div id="user-profile-card" className="min-h-28 w-full mb-8 flex justify-center items-center gap-2">
                      <p id="position-number" className="h-8 w-8 bg-theme-color center rounded-full">1</p>

                      {/* <!-- Main card --> */}
                      <div id="card" className="min-h-24 w-[80%] p-2 rounded-lg flex relative bg-theme-darker">

                          {/* <!-- RisePoints Count Box --> */}
                          <div id="rise-points" className="center absolute right-0 top-0 translate-y-[-100%] bg-theme-color px-4 py-0.5
                          rounded-tr-3xl rounded-tl-md">
                              <span className="text-xs sm:text-base">5000 rise points</span>
                          </div>

                          {/* <!-- Profile Photo --> */}
                          <img src="./p.jpg" alt="" className="profile-photo mx-2 h-10 w-10 sm:h-14 sm:w-14" />

                          {/* <!-- User Details --> */}
                          <div>
                              <div id="name-and-username" className="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-4 mb-2">
                                  <p id="user-full-name" className="text-sm sm:text-base md:text-lg">Diwash Pandey</p>
                                  <p id="user-username" className="text-xs md:text-sm font-light">@iamdiwashpandey</p>
                              </div>
                              <p id="user-intro" className="text-sm md:text-base">Hello there I am diwahs</p>
                          </div>
                      </div>
                  </div>
              </div>


          </div>

          {/* <!-- People Like You Box --> */}
          <div id="people-like-you" className="hidden w-[60%] max-w-96 h-96 p-4 space-y-2 rounded-xl flex-col items-center bg-main-box md:flex">

              <h2 className="mb-2 self-start text-2xl">People Like You</h2>

              {/* <!-- Suggestion-user-profile-card --> */}
              <div id="suggestion-user-profile-card" className="w-[90%] pb-3 my-2 border-b-2 border-gray-600 flex">
                  <img src="./p.jpg" alt="" className="profile-photo mr-2" />
                  <div className="relative w-full">

                      {/* <!-- Full Name --> */}
                      <p>Diwash Pandey</p>

                      {/* <!-- Intro --> */}
                      <div className="min-h-5 w-full mb-2">
                          <span className="font-extralight">I am diwash pandey</span>
                      </div>

                      {/* <!-- College or University, and RisePoints --> */}
                      <div className="flex gap-2">
                          <p className="py-0.5 px-2 rounded-md text-light-mode-opposite text-sm font-light bg-black-white">Westcliff University</p>
                          <p className="py-0.5 px-2 rounded-md text-white text-sm font-light bg-theme-color">5000 Rises</p>
                      </div>

                      {/* <!-- The Follow Button --> */}
                      <button className="follow-btn h-6 absolute top-0 right-0 text-sm font-extralight">Follow</button>
                  </div>
              </div>

          </div>
      </main>
    )
  }
  
export default TopProfiles
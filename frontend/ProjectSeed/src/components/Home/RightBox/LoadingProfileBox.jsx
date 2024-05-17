import React from 'react'

function LoadingProfileBox() {
  return (
    <>
        <div id="loggedin-user-profile-photo" className="w-full h-24 rounded-lg absolute z-0 bg-theme-lighter animate-pulse" />
        <div id="loggedin-user-background-photo" className="profile-photo h-16 w-16 mt-16 relative z-1 bg-theme-lighter animate-pulse" />
        <p className="loggedin-user-full-name text-2xl font-light"></p>
        <p className=""></p>
        <p className=""></p>
        <div className="flex w-full justify-between my-4">
            <div className="loggedin-user-following-count-box h-16 w-[45%] rounded-e-lg center flex-col bg-theme-lighter animate-pulse">
                <span className="text-3xl font-light text-white"></span>
                <span className="font-lgith text-xs text-white"></span>
            </div>
            <div className="loggedin-user-rise-points-box w-[45%] rounded-s-lg center flex-col bg-theme-lighter animate-pulse">
                <span className="text-3xl font-light text-white"></span>
                <span className="font-lgith text-xs text-white"></span>
            </div>
        </div>
        <a href="#" className="hollow-theme-btn w-32 h-8 mb-2 rounded-lg bg-theme-lighter border-none animate-pulse"></a>
    </>
  )
}

export default LoadingProfileBox
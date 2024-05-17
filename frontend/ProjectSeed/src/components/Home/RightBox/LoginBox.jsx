import React from 'react'

function LoginBox(){
  return (
      <div id="balancer" className="h-full w-full center flex-col gap-4">
            <h3 className="mb-4 text-theme-color text-3xl font-semibold">Login into Seed</h3>
            <div id="home-login-" className="btn-white-filled h-8 w-40 font-extralight text-lg">Login</div>
            <div id="home-sign-up-btn" className="btn-theme-filled h-8 w-40 font-extralight text-lg hover:bg-none">Sign up</div>
        </div>
  )
}

export default LoginBox

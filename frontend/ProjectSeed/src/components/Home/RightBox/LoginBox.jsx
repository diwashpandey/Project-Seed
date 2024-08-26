import { Link } from "react-router-dom"

import { loginRoute, signUpRoute } from "../../../utilities/frontendRoutes"
import { pageNameAccordingToNum } from "../../Register/pageUtilities/pageNavigationUtils"

function LoginBox(){
  return (
      <div id="balancer" className="h-full w-full center flex-col gap-4">
            <h3 className="mb-4 text-theme-color text-3xl font-semibold">Login into Seed</h3>
            <Link to={loginRoute} id="home-login-" className="btn-white-filled h-8 w-40 font-extralight text-lg">Login</Link>
            <Link to={`${signUpRoute}${pageNameAccordingToNum[1]}`} id="home-sign-up-btn" className="btn-theme-filled h-8 w-40 font-extralight text-lg hover:bg-none">Sign up</Link>
        </div>
  )
}

export default LoginBox

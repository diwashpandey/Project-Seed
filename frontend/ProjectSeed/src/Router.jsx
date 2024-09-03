import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

// importing url Names
import {homeRoute, loginRoute, profileRoute, signUpRoute, settingsRoute, collegeProfileRoute}  from "./utilities/frontendRoutes"
import {topProfilesRoute} from "./utilities/frontendRoutes"

// Pages imports
import Home from "./pages/Home";
import Login from "./pages/Login";
import BaseApp from "./BaseApp";
import Profile from "./pages/Profile";
import TopProfiles from "./pages/TopProfiles";
import SignUp from "./pages/SignUp";
import Settings from "./pages/Settings";
import College from "./pages/College";

export const router = createBrowserRouter(
    createRoutesFromElements([
        <Route path="" element={<BaseApp />} >
          <Route path={homeRoute} element={<Home />} />
          <Route path={topProfilesRoute} element={<TopProfiles />} />
          <Route path={loginRoute} element={<Login />} />
          <Route path={`${signUpRoute}:pageName`} element={<SignUp />} />
          <Route path={`${profileRoute}:username`} element={<Profile />} />
          <Route path={`${settingsRoute}:sectionName`} element={<Settings />} />
          <Route path={`${settingsRoute}:sectionName`} element={<Settings />} />
          <Route path={`${collegeProfileRoute}:college_identifier`} element={<College />} />
        </Route>
      ])
)

// const routerf = createBrowserRouter([
//   {
//     path:"",
//     element: <BaseApp />,
//     children: [
//       {
//         path:homeRoute,
//         element:<Home />
//       },
//       {
//         path:loginRoute,
//         element:<Login />
//       },
//       {
//         path:`${profileRoute}:username`,
//         element:<Profile />,
//       }
//     ]
//   }
// ])
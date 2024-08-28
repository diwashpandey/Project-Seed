import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

// importing url Names
import {homeRoute, loginRoute, profileRoute,}  from "./utilities/frontendRoutes"
import {topProfiles} from "./utilities/frontendRoutes"

// Pages imports
import Home from "./pages/Home";
import Login from "./pages/Login";
import BaseApp from "./BaseApp";
import Profile from "./pages/Profile";
import Loading from "./pages/Loading";
import TopProfiles from "./pages/TopProfiles";

export const router = createBrowserRouter(
    createRoutesFromElements([
        <Route path="" element={<BaseApp />} >
          <Route path={homeRoute} element={<Home />} />
          <Route path={topProfiles} element={<TopProfiles />} />
          <Route path={loginRoute} element={<Login />} />
          <Route path={`${profileRoute}:username`} element={<Profile />} />
          <Route path={`${settingsRoute}:sectionName`} element={<Settings />} />
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
export const homeRoute = "/"
export const loginRoute = "/login/"
export const signUpRoute = "/signup/" // :pageName <= Add this to (Params)

// Profiles Routes
export const profileRoute = "/profile/" // :username <= Add this to (Params)
export const generateProfileRoute = (username) => `${profileRoute}${username}`
export const collegeProfileRoute = "/college/" // :username <= Add this to (Params)


// Settings Routes
export const settingsRoute = "/settings/" // :option <= Add this to (Params)

// Top Profiles Routes
export const topProfilesRoute = "top-profiles/" // Add queries here: get-from & name


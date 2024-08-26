export const homeRoute = "/"
export const loginRoute = "/login/"
export const signUpRoute = "/signup/" // :pageName <= Add this to (Params)

// Profile Routes
export const profileRoute = "/profile/" // :username <= Add this to (Params)
export const generateProfileRoute = (username) => `${profileRoute}${username}`

// Settings Routes
export const settingsRoute = "/settings/" // :option <= Add this to (Params)

// Top Profiles Routes
export const topProfiles = "top-profiles/" // Add queries here: get-from & name
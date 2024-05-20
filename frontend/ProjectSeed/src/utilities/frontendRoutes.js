export const homeRoute = "/"
export const loginRoute = "login/"

// Profile Routes
export const profileRoute = "profile/" // :username <= Add this too (Params)
export const generateProfileRoute = (username) => `${profileRoute}${username}`

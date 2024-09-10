export const homeRoute = "/"
export const loginRoute = "/login/"
export const signUpRoute = "/signup/" // :pageName <= Add this to (Params)

// Profiles Routes
export const profileRoute = "/profile/" // :username <= Add this to (Params)
export const generateProfileRoute = (username) => `${profileRoute}${username}`

export const collegeProfileRoute = "/college/" // :college_identifier <= Add this to (Params)
export const generateCollegeProfileRoute = (college_identifier, sectionName="profile") => {
    return `/college/${college_identifier}?section=${sectionName}`
}


// Settings Routes
export const settingsRoute = "/settings/" // :sectionName <= Add this to (Params)
export const generateSettingsRoute = (option)=>{
    return `/settings/${option}`
}

// Top Profiles Routes
export const topProfilesRoute = "top-profiles/" // Add queries here: get-from & name


// Base URL
export const BaseURL = "http://127.0.0.1:8000";

// Tokens
export const TokenRefreshURl = `${BaseURL}/accounts/token/refresh/`;

// Photo URL Generator
export const generatePhotoURL = (photoURL) => { return `${BaseURL}${photoURL}`}

// Authentication
export const LoginURL = `${BaseURL}/accounts/login/`;
export const SignUpURL = `${BaseURL}/accounts/register/`
export const UsernameAvailabilityServiceURL = `${BaseURL}/accounts/username-availability-service/`
export const EmailAvailabilityServiceURL = `${BaseURL}/accounts/email-availability-service/`

// Homepage
export const HomePageAuthenticatedURL = "home/home-data-authenticated/"
export const HomePageNonAuthenticatedURL = "home/home-data-non-authenticated/"

// Account or Profile
export const AuthUserDataURL = `${BaseURL}/accounts/auth-user-quick-data/`
export const UserProfileURL = (username) =>{
    return `${BaseURL}/accounts/profile?username=${username}`
}
export const UserProfileNonAuthURL = (username) =>{
    return `${BaseURL}/accounts/profile-non-authenticated?username=${username}`
}
export const UserProfileDowntownURL = `${BaseURL}/accounts/downtown` // add ?username="username"&section="section"
export const UserProfileDowntownNonAuthenticatedURL = `${BaseURL}/accounts/downtown-non-authenticated` // add ?username="username"&section="section"
export const UserProfileRiseURL = `${BaseURL}/accounts/profile-rise-handler/`
export const UserProfileFollowURL = `${BaseURL}/accounts/profile-follow-handler/`
export const UserPosts = (username, offset=0, limit=10) =>{
    return `${BaseURL}/posts/get-user-posts?username=${username}&offset=${offset}&limit${limit}`
}
export const UserPostsNonAuth = (username, offset=0, limit=10) =>{
    return `${BaseURL}/posts/get-user-posts-non-auth?username=${username}&offset=${offset}&limit${limit}`
}

// Skills and Interests
export const SkillsListURL = `${BaseURL}/accounts/skills-list/`
export const InterestsListURL = `${BaseURL}/accounts/interests-list/`


// Settings 
export const UpdateFirstAndLastNameURL = `${BaseURL}/accounts/update-first-and-last-name/`
export const UpdateIntroURL = `${BaseURL}/accounts/update-intro/`
export const UpdateAboutMeURL = `${BaseURL}/accounts/update-about-me/`
export const UpdateProfilePhotoURL = `${BaseURL}/accounts/update-profile-photo/`
export const UpdateBackgroundPhotoURL = `${BaseURL}/accounts/update-background-photo/`
export const UpdateSkillsURL = `${BaseURL}/accounts/update-skills/`
export const UpdateInterestsURL = `${BaseURL}/accounts/update-interests/`
export const UpdateLocationURL = `${BaseURL}/accounts/update-location/`

// Posts
export const GetPostsURL = `${BaseURL}/recommendation/get-recommended-posts` // add ?offset= & limit=
export const GetPostsNonAuthenticatedURL = `${BaseURL}/recommendation/get-recommended-posts-non-auth` // add ?offect= & limit=
export const PostRiseRequestURL = `${BaseURL}/posts/rise-commit` // add ?offset= & limit=
export const UploadPostRequestURL = `${BaseURL}/posts/upload-post`

// Top Profiles
export const GetTopProfilesURL = "ranking/top-profiles" // add ?college=collegename&school=schoolname&count=number

// Top Posts

// College Profile
export const CollegeProfileURL = (college_identifier) => {
    return `${BaseURL}/colleges/college-profile/?college_identifier=${college_identifier}`
}
export const CollegeProfileNonAuthURL = (college_identifier)=>{
    return `${BaseURL}/colleges/college-profile-non-authenticated/?college_identifier=${college_identifier}` 
}
export const GetCollegeStudentsURL = (college_identifier, start, count) => {
    return `${BaseURL}/colleges/get-college-students/?college_identifier=${college_identifier}&start=${start}&count=${count}`
}
export const GetCollegeMembersURL = (college_identifier, start, count) => {
    return `${BaseURL}/colleges/get-college-members/?college_identifier=${college_identifier}&start=${start}&count=${count}`
}

// Ratings
export const GetCollegeRatingsURL = (college_identifier, count) => {
    return `${BaseURL}/ratings/get-college-ratings/?college_identifier=${college_identifier}&count=${count}` // add ?college_identifier= & count=
}
export const GetCollegeRatingsNonAuthURL = (college_identifier, count=10) => {
    return `${BaseURL}/ratings/get-college-ratings-non-auth/?college_identifier=${college_identifier}&count=${count}` // add ?college_identifier= & count=
}


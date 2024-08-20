// Base URL
export const BaseURL = "http://127.0.0.1:8000";

// Tokens
export const TokenRefreshURl = `${BaseURL}/accounts/token/refresh/`;

// Photo URL Generator
export const generatePhotoURL = (photoURL) => { return `${BaseURL}${photoURL}`}

// Authentication
export const LoginURL = `${BaseURL}/accounts/login/`;
export const RegisterURL = `${BaseURL}/accounts/register/`

// Homepage
export const HomePageAuthenticatedURL = "home/home-data-authenticated/"
export const HomePageNonAuthenticatedURL = "home/home-data-non-authenticated/"

// Account or Profile
export const AuthUserDataURL = `${BaseURL}/accounts/auth-user-quick-data/`
export const UserProfileURL = `${BaseURL}/accounts/profile`// add ?username="yourusername"
export const UserProfileNonAuthenticatedURL = `${BaseURL}/accounts/profile-non-authenticated`// add ?username="yourusername"
export const UserProfileDowntownURL = `${BaseURL}/accounts/downtown` // add ?username="username"&section="section"
export const UserProfileDowntownNonAuthenticatedURL = `${BaseURL}/accounts/downtown-non-authenticated` // add ?username="username"&section="section"
export const UserProfileRiseURL = `${BaseURL}/accounts/profile-rise-handler/`
export const UserProfileFollowURL = `${BaseURL}/accounts/profile-follow-handler/`

// Posts
export const GetPostsURL = `${BaseURL}/recommendation/get-recommended-posts` // add ?offset= & limit=
export const GetPostsNonAuthenticatedURL = `${BaseURL}/recommendation/get-recommended-posts-non-auth` // add ?offect= & limit=
export const PostRiseRequestURL = `${BaseURL}/posts/rise-commit` // add ?offset= & limit=

// Top Profiles
export const GetTopProfilesURL = "ranking/top-profiles" // add ?college=collegename&school=schoolname&count=number

// Top Posts

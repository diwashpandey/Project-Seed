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

// Account
export const AuthUserDataURL = `${BaseURL}/accounts/auth-user-quick-data/`

// Posts
export const GetPostsUrl = `${BaseURL}/recommendation/get-recommended-posts` // add ?offset= & limit=
export const GetPostsNonAuthenticatedUrl = `${BaseURL}/recommendation/get-recommended-posts-non-auth` // add ?offect= & limit=

// Top Profiles

// Top Posts

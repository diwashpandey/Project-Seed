// Imports from React
import { useEffect, useState } from "react";

// Imports from third-party libraries
import { useDispatch, useSelector } from "react-redux";

// Imports from local files
import { TokensHandler } from "./TokensHandler";
import { setIsAuthenticatedTrue, setUserData } from "../reduxStore/features/Authentication/userSlice";
import { userDataFetcher } from "../fetchers/userData/userDataFetcher";

/**
 * AuthenticationHandler component handles user authentication and data fetching.
 * It performs authentication check and data fetching once on mount.
 * Displays a loading indicator while processing.
 */
function AuthenticationHandler({ children }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer);
    const [isLoading, setIsLoading] = useState(true); // Track loading status
    const TH = new TokensHandler(); // Initialize once

    useEffect(() => {
        const checkAuth = async () => {
            if (!user.isAuthenticated) { // Check if user is not authenticated
                const isAuthenticated = TH.checkIfAuthenticated();
                if (isAuthenticated) {
                    dispatch(setIsAuthenticatedTrue()); // Set authentication state
                    try {
                        const userData = await userDataFetcher(); // Fetch user data
                        dispatch(setUserData(userData)); // Update user data
                    } catch (error) {
                        console.error("Error fetching user data:", error); // Log error
                    }
                }
            }
            setIsLoading(false); // Stop loading indicator
        };

        checkAuth(); // Execute authentication and data fetching
    }, [dispatch, TH, user.isAuthenticated]); // Dependency array ensures effect runs correctly

    if (isLoading) { // Show loading state
        return <div>Loading authentication...</div>;
    }

    return (
        <>
            {children} {/* Render children after authentication check */}
        </>
    );
}

export default AuthenticationHandler;

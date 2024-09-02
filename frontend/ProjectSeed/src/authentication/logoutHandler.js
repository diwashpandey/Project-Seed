import { loginRoute } from "../utilities/frontendRoutes";

function handleLogout(){
    // Remove tokens from localStorage
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  
    // Optionally, redirect the user to the login page or home page
    window.location.href = loginRoute; // Change to your login route
};

export default handleLogout
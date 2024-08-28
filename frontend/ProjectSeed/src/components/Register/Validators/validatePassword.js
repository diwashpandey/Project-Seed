export function validatePassword(newPassword, confirmPassword) {
    // Regular expressions for validation
    const minLengthRegex = /^.{8,}$/;
    const numberRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  
    // Array to hold error messages
    const validateFeedback = {errorStatus:false, errorMessage:"", errorCode:0};
            
    if (newPassword !== confirmPassword) { // Check if passwords match
        validateFeedback.errorMessage = "Passwords do not match";
    }
    else if (!minLengthRegex.test(newPassword)) {  // Check if password meets minimum length requirement
        validateFeedback.errorMessage = "Password must be at least 8 characters long";
    }
    else if (!numberRegex.test(newPassword)) {  // Check if password contains at least one number
        validateFeedback.errorMessage = "Password must contain at least one number";
    }
    else if (!specialCharRegex.test(newPassword)) {  // Check if password contains at least one special character
        validateFeedback.errorMessage = "Password must contain at least one special character";
    }
  
    // Check if there are errors
    if (validateFeedback.errorMessage.length > 0){
        validateFeedback.errorStatus = true;  // setting true if message exists
        validateFeedback.errorCode = 700
    }

    return validateFeedback;
  }
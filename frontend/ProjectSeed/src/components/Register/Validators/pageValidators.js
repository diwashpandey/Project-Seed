export function validatePageAccess(formData, pageNo) {

    let validStatus = { errorStatus:false, errorMessage: "", errorCode: 0 };  // Don't change alone cause this is same in Redux Store

    if (pageNo < 1 || pageNo > 6 || pageNo === undefined || pageNo === null) {
        validStatus.errorStatus = true;
        validStatus.errorCode = 999;
        return validStatus;
    }

    const hasNotGivenProfession = formData.profession === "";
    const hasNotGivenFirstName = formData.firstName === "";
    const hasNotGivenLastName = formData.lastName === "";
    const hasNotGivenGender = formData.gender === "";
    const hasNotGivenEmail = formData.email === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

    const hasNotGivenUsername = formData.username === "";
    const usernameAlreadyExists = formData.usernameAlreadyExists || formData.usernameAlreadyExists === null;

    const isNotValidUsername = ! formData.isValidUsername || formData.isValidUsername === null;

    const emailAlreadyExists = formData.emailAlreadyExists || formData.emailAlreadyExists === null;


    const errors = {
        profession: { errorMessage: "Please select who you are", errorCode: 100, errorStatus:true },

        firstName: { errorMessage: "Enter First Name", errorCode: 200, errorStatus:true },
        lastName: { errorMessage: "Enter Last Name", errorCode: 205, errorStatus:true },

        gender: { errorMessage: "Select your gender", errorCode: 300, errorStatus:true },

        email: { errorMessage: "Please enter a valid email", errorCode: 400, errorStatus:true },
        emailExists: { errorMessage: "Email already exists", errorCode: 405, errorStatus:true },

        username: { errorMessage: "Enter your username", errorCode: 500, errorStatus:true },
        usernameNotValid: { errorMessage: "username is not valid", errorCode: 500, errorStatus:true },

        usernameExists: { errorMessage: "Username already exists", errorCode: 505, errorStatus:true },
    };

    if (pageNo === 1) validStatus.errorStatus = false;
    else if (pageNo === 2) {
        if (hasNotGivenProfession) validStatus = {...validStatus, ...errors.profession};
    } 
    
    else if (pageNo === 3) {
        if(hasNotGivenProfession) validStatus = {...validStatus, ...errors.firstName};
        else if(hasNotGivenFirstName) validStatus = {...validStatus, ...errors.firstName};
        else if(hasNotGivenLastName) validStatus = {...validStatus, ...errors.lastName};
    } 

    else if (pageNo === 4) {
        if(hasNotGivenProfession) validStatus = {...validStatus, ...errors.firstName};
        else if(hasNotGivenFirstName) validStatus = {...validStatus, ...errors.firstName};
        else if(hasNotGivenLastName) validStatus = {...validStatus, ...errors.lastName};
        else if(hasNotGivenGender) validStatus =  {...validStatus, ...errors.gender};
    } 
    else if (pageNo === 5) {
        if(hasNotGivenProfession) validStatus = {...validStatus, ...errors.firstName};
        else if(hasNotGivenFirstName) validStatus = {...validStatus, ...errors.firstName};
        else if(hasNotGivenLastName) validStatus = {...validStatus, ...errors.lastName};
        else if(hasNotGivenGender) validStatus =  {...validStatus, ...errors.gender};
        else if (hasNotGivenEmail) validStatus = {...validStatus, ...errors.email};
        // else if (emailAlreadyExists) validStatus = {...validStatus, ...errors.emailExists};  aaile lai it's on hold
    }
    else if (pageNo === 6) {
        if(hasNotGivenProfession) validStatus = {...validStatus, ...errors.firstName};
        else if(hasNotGivenFirstName) validStatus = {...validStatus, ...errors.firstName};
        else if(hasNotGivenLastName) validStatus = {...validStatus, ...errors.lastName};
        else if(hasNotGivenGender) validStatus =  {...validStatus, ...errors.gender};
        else if(hasNotGivenEmail) validStatus = {...validStatus, ...errors.email};
        else if(hasNotGivenUsername) validStatus = {...validStatus, ...errors.username};
        else if(isNotValidUsername) validStatus={...validStatus, ...errors.usernameNotValid}
        else if(usernameAlreadyExists) validStatus = {...validStatus, ...errors.usernameExists}
    }
    else{
        validStatus.errorStatus = true
    }
    
    return validStatus;
}

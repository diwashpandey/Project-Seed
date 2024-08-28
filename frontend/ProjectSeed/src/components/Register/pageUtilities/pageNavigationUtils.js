const firstPageName = "profession"
const secondPageName = "first-and-last-name"
const thirdPageName = "gender"
const forthPageName = "email"
const fifthPageName = "username"
const sixthPageName = "password"

export const pageNumAccordingToName = {
    [firstPageName]:1,
    [secondPageName]:2,
    [thirdPageName]: 3,
    [forthPageName]:4,
    [fifthPageName]:5,
    [sixthPageName]:6
  }

export const pageNameAccordingToNum = {
    1:firstPageName,
    2:secondPageName,
    3:thirdPageName,
    4:forthPageName,
    5:fifthPageName,
    6:sixthPageName
}

export const headerTextAccordingToPages = {  
    1:"Who are you?",
    2:"Enter your name",
    3:"Choose your gender",
    4:"Enter your email",
    5:"Choose your username",
    6:"Make your password",
    7:"Your account has been created successfully"
  }  // This will be shown according to pagenumber

export const pageNoToGoAccordingToErrorCode = {
    999:pageNumAccordingToName["profession"],
    100:pageNumAccordingToName["profession"],
    200:pageNumAccordingToName["first-and-last-name"],
    205:pageNumAccordingToName["first-and-last-name"],
    300:pageNumAccordingToName["gender"],
    400:pageNumAccordingToName["email"],
    405:pageNumAccordingToName["email"],
    500:pageNumAccordingToName["username"],
    505:pageNumAccordingToName["username"]
}

export const pageNameToGoAccordingToErrorCode = {
    999:"profession",
    100:"profession",
    200:"first-and-last-name",
    205:"first-and-last-name",
    300:"gender",
    400:"email",
    405:"email",
    500:"username",
    505:"username"
}

export const getNextPageNameFromCurrentNum = (currentPageNum) => {
    return (currentPageNum < 6) ? pageNameAccordingToNum[currentPageNum + 1] : "" 
}

export const getCurrentPageNumFromName = (currentPageName) =>{
    return pageNumAccordingToName[currentPageName]
}

export const getCurrentPageNameFromNum = (currentPageNum) =>{
    return pageNameAccordingToNum[currentPageNum]
}
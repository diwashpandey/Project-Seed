// imports from react
import { useEffect, useState } from "react"

// importing from third-party libraries
import { useDispatch, useSelector } from "react-redux"
import { useMutation } from "react-query"
import { useNavigate, useParams } from "react-router-dom"

// importing components
import EnterName from "../components/Register/EnterName"
import EnterGender from "../components/Register/EnterGender"
import EnterUsername from "../components/Register/EnterUsername"
import EnterPassword from "../components/Register/EnterPassword"

// importing additional things
import fetchSignUpRequest from "../fetchers/Register/fetchSignUpRequest"
import EnterProfession from "../components/Register/EnterProfession"
import EnterEmail from "../components/Register/EnterEmail"
import { signUpRoute } from "../utilities/frontendRoutes"
import { validatePageAccess } from "../components/Register/Validators/pageValidators"
import {pageNameAccordingToNum,getCurrentPageNumFromName,
        pageNameToGoAccordingToErrorCode,headerTextAccordingToPages } from "../components/Register/pageUtilities/pageNavigationUtils"

import NextPageButton from "../components/Register/SubComponents/NextPageButton"
import { setPageNo } from "../reduxStore/features/Register/signUpPageNumSlice"
import { validatePassword } from "../components/Register/Validators/validatePassword"
import { setSignUpFormStatus, resetSignUpFormStatus } from "../reduxStore/features/Register/signUpFormFeedbackSlice"
import { resetSignUpForm } from "../reduxStore/features/Register/signUpFormSlice"

function SignUp(){

  const {pageName} = useParams()  // Gets the page name from the url params
  const formData = useSelector(state => state.signUpFormReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(()=>{
    let accessStatus = validatePageAccess(formData, getCurrentPageNumFromName(pageName))
    // Checking the previous pages has valid inputs
    if ([100, 999].includes(accessStatus.errorCode)){
      window.location.href = `${signUpRoute}${pageNameAccordingToNum[1]}` // Redirecting to first page if data is not valid
    } else if(accessStatus.errorStatus){
      navigate(`${signUpRoute}${pageNameToGoAccordingToErrorCode[accessStatus.errorCode]}`)
    }
    dispatch(setPageNo(getCurrentPageNumFromName(pageName)))
  }, [pageName, dispatch, navigate])
  
  const currentPageNo = useSelector((states)=>states.signUpPageNumReducer)
  
  const mutation = useMutation(fetchSignUpRequest, {
    onSuccess: () => {
      dispatch(setPageNo(7));
      dispatch(resetSignUpFormStatus())
      dispatch(resetSignUpForm()) // Reseting the error in the redux state when valid
    },
  });

  const handleSubmit = (e) =>{
      e.preventDefault()

      const validateFeedback = validatePassword(formData.newPassword, formData.confirmPassword)
      if (validateFeedback.errorStatus){
        dispatch(setSignUpFormStatus(validateFeedback)); // Sending error as object cause there is another object in formdata state
      } else{
        mutation.mutate(formData); // Trigger mutation on successful validation
      }
  }
  
  return (
    <>
        <main className="h-[100vh] w-full center flex-col gap-8">

          {/* Box 1 */}
          <div id="Headbox" className="center w-[28rem] flex-col gap-5 bg-main-box p-6 rounded-xl">
            <h1 className="text-theme-color font-bold text-2xl">Create new Seed Account</h1>
            <h2 className="font-extralight">{headerTextAccordingToPages[currentPageNo]}</h2>
          </div>

          {/* Box 2 */}
          <form id="register-form" className="relative" onSubmit={handleSubmit}>
            <div className="min-h-64 h-fit w-[28rem] center bg-main-box rounded-xl">

              {/* Giving boolen as the hidden prop with the help of page number */}
              {currentPageNo === 1 ? <EnterProfession /> : null}
              {currentPageNo === 2 ? <EnterName /> : null}
              {currentPageNo === 3 ? <EnterGender /> : null}
              {currentPageNo === 4 ? <EnterEmail /> : null}
              {currentPageNo === 5 ? <EnterUsername /> : null}
              {currentPageNo === 6 ? <EnterPassword /> : null}

            </div>

            {/* Returning the button
                According to the Page No */}
            {
              (currentPageNo < 6) ?
              <NextPageButton />
              :
              (mutation.isLoading)? // Putting the loading bar when user clicks sumbit
              <div className="h-4 w-4 absolute right-[2rem] bottom-[1.4rem] border-t-2 border-text-color border-solid rounded-full animate-spin"></div>
              :
              (!mutation.isSuccess)?
              <button type="submit" className=" h-8 border rounded-lg center absolute bottom-3 right-3 btn-white-hollow">
                  Submit
                </button>
              :
              null
            }
          </form>
        </main>
    </>
    )
}

export default SignUp

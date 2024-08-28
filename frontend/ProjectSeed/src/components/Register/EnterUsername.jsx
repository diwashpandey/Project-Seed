// Imports from react
import { useEffect, useState } from "react"

// Imports from third party libraries
import {useSelector, useDispatch} from "react-redux"
import { useMutation } from "react-query"

// Additional imports
import { addInSignUpForm } from "../../reduxStore/features/Register/signUpFormSlice"
import fetchUsernameAvailability from "../../fetchers/Register/fetchUsernameAvailability"
import { setSignUpFormStatus } from "../../reduxStore/features/Register/signUpFormFeedbackSlice"


function EnterUsername() {
  const formData = useSelector((states)=>states.signUpFormReducer)
  const signUpFormFeedback = useSelector((states)=>states.signUpFormFeedbackReducer)
  const dispatch = useDispatch()
  const [isTyping, setIsTyping] = useState(false); // This will be used for the loading bar
  
  // Determine if the border should be red
  const borderColor =  [500, 505].includes(signUpFormFeedback.errorCode) ? "border-red-500" : "border-transparent";

  const handleUsernameStatus = (data) =>{
      setIsTyping(false);  // To stop the loading bar after the reqeust
      dispatch(addInSignUpForm({usernameAlreadyExists:data.exists_or_not}))  // Setting availability status directly from the server response
      if (! data.exists_or_not){
        dispatch(setSignUpFormStatus({errorCode:0}))  // If username doesn't exists there should not be the error
      }
  }

  const mutation = useMutation(fetchUsernameAvailability, {
    onSuccess: (data) => handleUsernameStatus(data),
    onError: () => alert("Error occured")
    },
  );

  // Debounce input to wait 1 seconds after the user stops typing
  useEffect(() => {
    const handler = setTimeout(() => {
      if (formData.username) mutation.mutate(formData.username)
    }, 1000);

    return () => clearTimeout(handler); // We are clearing this timeout if user starts typing again before 1 seconds
  }, [formData.username]);

  return (
    <div className="h-full w-full center relative">
        {/* Controlling the Error message according to the error code in form Data */}
        {signUpFormFeedback.errorCode === 500 ||  signUpFormFeedback.errorCode === 505 ? (
          <p id="error-message" className="text-red-500 font-extralight text-sm absolute top-3">
            {signUpFormFeedback.errorMessage}
          </p>
        ) : null}
        <div className="w-full center flex-col relative">
          <input
          type="text"
          placeholder='username'
          name="username"
          className={`bg-theme-darker h-12 w-[75%] p-4 rounded-2xl font-light placeholder:font-extralight focus-visible:outline-none border ${borderColor}`}
          value={formData.username}
          onChange={(e)=>{
            dispatch(addInSignUpForm({username:e.target.value, usernameAlreadyExists:null})); // Setting the userAlreadyExists to null so that user can't go to next page while loading
            setIsTyping(true); // Indicate that typing is in progress
          }}
          required/>
          {/* Loading spinner */}
          {isTyping && (
            <div className="h-4 w-4 absolute right-[4.2rem] bottom-4 border-t-2 border-orange-500 border-solid rounded-full animate-spin"></div>
          )}

        {/* This will occur according to the status */}
        <p className={`absolute -bottom-6 text-sm font-extralight right-20 ${formData.usernameAlreadyExists?"text-red-500":"text-green-400"}`}>
          {/* This will be shown as message */}
          {formData.usernameAlreadyExists === true
            ? "Username already exists!"
            : formData.usernameAlreadyExists === false
            ? "Username available"
            : null}
          </p>
        </div>        
    </div>
  )
}

export default EnterUsername
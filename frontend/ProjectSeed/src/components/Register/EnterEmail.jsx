import {useSelector, useDispatch} from "react-redux"
import { addInSignUpForm } from "../../reduxStore/features/Register/signUpFormSlice"

function EnterEmail() {
  const formData = useSelector((states)=>states.signUpFormReducer)
  const signUpFormFeedback = useSelector((states)=>states.signUpFormFeedbackReducer)
  
  const dispatch = useDispatch()
  

  // Determine if the border should be red
  const borderColor =  signUpFormFeedback.errorCode === 400 ||  signUpFormFeedback.errorCode === 405 ? "border-red-500" : "border-transparent";

  return (
    <div className="h-full w-full center">
        {/* Controlling the Error message according to the error code in form Data */}
        {signUpFormFeedback.errorCode === 400 ||  signUpFormFeedback.errorCode === 405 ? (
          <p id="error-message" className="text-red-500 font-extralight text-sm absolute top-3">
            {signUpFormFeedback.errorMessage}
          </p>
        ) : null}

        <input
        type="text"
        placeholder='email'
        name="username"
        className={`bg-theme-darker h-12 w-[75%] p-4 rounded-2xl font-light placeholder:font-extralight focus-visible:outline-none border ${borderColor}`}
        value={formData.email}
        onChange={(e)=>{
          dispatch(addInSignUpForm({email:e.target.value}))
        }}
        required/>
    </div>
  )
}

export default EnterEmail
import { useSelector, useDispatch } from "react-redux";
import { addInSignUpForm } from "../../reduxStore/features/Register/signUpFormSlice";


function EnterName() {
  const formData = useSelector((states) => states.signUpFormReducer);
  const signUpFormFeedback = useSelector((states)=>states.signUpFormFeedbackReducer)
  const dispatch = useDispatch();

  // Determine if the border should be red in box 1
  const borderColorBox1 = signUpFormFeedback.errorCode === 200 ? "border-red-500" : "border-transparent";

  // Determine if the border should be red in box 2
  const borderColorBox2 =  signUpFormFeedback.errorCode === 205 ? "border-red-500" : "border-transparent";
  

  return (
    <div className="h-full w-full center flex-col gap-8">
      
      {/* Controlling the Error message according to the error code in form Data */}
      {signUpFormFeedback.errorCode === 200 || signUpFormFeedback.errorCode === 205 ? (
        <p id="error-message" className="text-red-500 font-extralight absolute top-3">
          {signUpFormFeedback.errorMessage}
        </p>
      ) : null} 

      {/* First Name */}
      <input
        type="text"
        placeholder="First Name"
        name="first-name"
        className={`bg-theme-darker h-12 w-[75%] p-4 rounded-2xl font-light placeholder:font-extralight focus-visible:outline-none border ${borderColorBox1}`}
        value={formData.firstName}
        onChange={(e) => {
          dispatch(addInSignUpForm({ firstName: e.target.value }));
        }}
        required
      />

      {/* Last Name */}
      <input
        type="text"
        placeholder="Last Name"
        name="last-name"
        className={`bg-theme-darker h-12 w-[75%] p-4 rounded-2xl font-light placeholder:font-extralight focus-visible:outline-none border ${borderColorBox2}`}
        value={formData.lastName}
        onChange={(e) => {
          dispatch(addInSignUpForm({ lastName: e.target.value }));
        }}
        required
      />
    </div>
  );
}

export default EnterName;

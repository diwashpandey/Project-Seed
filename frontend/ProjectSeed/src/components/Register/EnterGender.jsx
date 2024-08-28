import { useSelector, useDispatch } from "react-redux"
import { addInSignUpForm } from "../../reduxStore/features/Register/signUpFormSlice"

function Box({value1, value2, value3}){
  const dispatch = useDispatch()
  const signUpFormFeedback = useSelector((states)=>states.signUpFormFeedbackReducer)
  const signUpFormData = useSelector((states)=>states.signUpFormReducer)

    return(
        <div>
            <input type="radio"
            id={value1}
            name="gender"
            className='peer hidden'
            value={value2.toLowerCase() } // changing to lowerCase for Backend
            onChange={(e)=>{
              dispatch(addInSignUpForm({gender:e.target.value}))
            }}
            checked={value2.toLowerCase() === signUpFormData.gender} 
            required />

            <label htmlFor={value1}
            className="peer h-16 w-16 rounded-xl center flex-col bg-theme-darker cursor-pointer peer-checked:bg-white peer-checked:text-gray-900 transition-colors duration-200">
                    <p className='font-base text-2xl text-inherit'>{value2}</p>
                    <p className='font-extralight text-sm text-inherit'>{value3}</p>
            </label>
        </div>
    )
}

function EnterGender() {
  return (
    <div className="h-full w-full px-[10%] center justify-between">
        {/* Male */}
        <Box value1="male" value2="M" value3="Male"/>

        {/* Female */}
        <Box value1="female" value2="F" value3="Female"/>

        {/* Other */}
        <Box value1="other" value2="O" value3="Other"/>
    </div>
  )
}

export default EnterGender
import { useDispatch, useSelector } from "react-redux"
import { addInSignUpForm } from "../../reduxStore/features/Register/signUpFormSlice"

function Box({value1, value2, value3}){
  const dispatch = useDispatch()
  const signUpFormData = useSelector((states)=>states.signUpFormReducer)

    return(
        <div>
            <input type="radio"
            id={value1}
            name="gender"
            className='peer hidden'
            value={value1} // changing to lowerCase for Backend
            onChange={(e)=>{
              dispatch(addInSignUpForm({profession:e.target.value}))
            }}
            checked={value1 === signUpFormData.profession}
            required/>

            <label htmlFor={value1}
            className="peer h-28 w-28 rounded-xl center flex-col bg-theme-darker cursor-pointer peer-checked:bg-white peer-checked:text-gray-900 transition-colors duration-200">
                    <p className='font-extralight text-sm text-inherit'>I am a</p>
                    <p className='font-base text-2xl text-inherit'>{value2}</p>
            </label>
        </div>
    )
}

function EnterProfession() {
  return (
    <div className="h-full w-full px-[20%] center justify-between">
        {/* Teacher */}
        <Box value1="teacher" value2="Teacher"/>

        {/* Student */}
        <Box value1="student" value2="Student"/>
    </div>
  )
}

export default EnterProfession
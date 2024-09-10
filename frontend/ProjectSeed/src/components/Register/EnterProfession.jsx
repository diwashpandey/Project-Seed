import { useDispatch, useSelector } from "react-redux"
import { addInSignUpForm } from "../../reduxStore/features/Register/signUpFormSlice"

function Box({value1, value2, value3}){
  const dispatch = useDispatch()
  const signUpFormData = useSelector((states)=>states.signUpFormReducer)

    return(
        <div>
            <input type="radio"
            id={value1}
            name="profession"
            className='peer hidden'
            value={value1} // changing to lowerCase for Backend
            onChange={(e)=>{
              dispatch(addInSignUpForm({profession:e.target.value}))
            }}
            checked={value1 === signUpFormData.profession}
            required/>

            <label htmlFor={value1}
            className="peer h-28 w-28 rounded-xl center flex-col bg-theme-darker cursor-pointer peer-checked:bg-white peer-checked:text-gray-900 transition-colors duration-200">
                    <p className='font-extralight text-xs text-inherit'>I am</p>
                    <p className='font-base text-lg text-inherit'>{value2}</p>
            </label>
        </div>
    )
}

function EnterProfession() {
  return (
    <div className="h-full w-full px-[20%] py-8 center gap-4 flex-wrap ">
        {/* Teacher */}
        <Box value1="t" value2="Teacher"/>

        {/* Student */}
        <Box value1="s" value2="Student"/>

        {/* Professional */}
        <Box value1="p" value2="Professional"/>

        {/* Investor */}
        <Box value1="i" value2="Investor"/>

    </div>
  )
}

export default EnterProfession
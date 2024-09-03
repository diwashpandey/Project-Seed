import {useDispatch, useSelector} from "react-redux"
import { updateSettingsFormNumber } from "../../../reduxStore/features/Settings/settingsFormNumberSlice"

function OptionPhoto({optionTitle=null, currentValue=null, optionNumber=0, OptionForm, description}) {
  const dispatch = useDispatch()
  const activeSettingsFormNumber = useSelector((states)=>states.settingsFormNumberReducer)

  return (
    <>
      {/* The Form that this the option opens */}
      {
      activeSettingsFormNumber===optionNumber ?
      <OptionForm formTitle={optionTitle} description={description} currentValue={currentValue}/>
      :null
      }

      {/* Option */}
      <div
      onClick={()=>dispatch(updateSettingsFormNumber(optionNumber))}
      className="h-14 w-[80%] p-3 rounded-lg flex justify-between items-center bg-main-box hover:bg-[var(--secondary-boxes-color)] cursor-pointer transition-colors duration-150">
          {/* Option Title */}
          <h3 className="font-light">{optionTitle}</h3>

          {/* Pencil Icon */}
          <div className="center rounded-full btn-white-hollow border-[1px]">Change</div>
      </div>
    </>
  )
}

export default OptionPhoto
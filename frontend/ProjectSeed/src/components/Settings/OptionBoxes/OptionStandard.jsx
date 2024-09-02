import EditPencil from "../subComponents/EditPencil"
import {useDispatch, useSelector} from "react-redux"
import { updateSettingsFormNumber } from "../../../reduxStore/features/Settings/settingsFormNumberSlice"

function OptionStandard({optionTitle=null, currentValue=null, optionNumber=0, OptionForm, description}) {
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
      className="w-[80%] p-3 rounded-lg flex justify-between bg-main-box hover:bg-[var(--secondary-boxes-color)] cursor-pointer transition-colors duration-150">
          {/* Option Title and Current Value */}
          <div>
              {/* Title */}
              <h3 className="font-light">{optionTitle}</h3>
              {/* Current Value */}
              <p className="font-light text-gray-500">{currentValue?currentValue:"Not Provided"}</p>
          </div>

          {/* Pencil Icon */}
          <div className="h-9 w-9 p-2 center rounded-full ">
            <EditPencil />
          </div>
      </div>
    </>
  )
}

export default OptionStandard
import { useDispatch } from "react-redux"
import { resetSettingsFormNumber } from "../../../reduxStore/features/Settings/settingsFormNumberSlice"

function FormFoundation({children, formTitle, description, error=null}) {

  const dispatch = useDispatch()

  const handleClose = (e) =>{
    console.log("Clicked")
    e.stopPropagation()
    dispatch(resetSettingsFormNumber())
  }

  return (
    // Background Box
    <div
    className="h-[100vh] w-[100vw] center fixed top-0 right-0 z-40 bg-[rgba(0,0,0,0.41)]"
    onClick={handleClose}
    >
        {/* Main Box */}
        <div
        id="main-box"
        className=" min-w-96 p-4 pb-16 rounded-2xl relative bg-main-box"
        onClick={(e)=>e.stopPropagation()}>
          
          {/* Error Box */}
          {
            error?
            <p id="error-box" className="min-w-64 max-w-96 text-center p-2 rounded-xl absolute -top-14 left-1/2 font-light text-sm -translate-x-1/2 bg-red-600">{error}</p>
            :null
          }

          {/* header */}
          <div className="mb-3 w-full flex justify-between">
              <h2 className="text-xl font-medium">{formTitle}</h2>
              {/* Cross Box */}
              <div
              className="h-4 w-4 p-4 rounded-full center relative bg-theme-lighter cursor-pointer"
              onClick={handleClose}>
                  <div className="h-1/2 w-[1px] bg-black-white absolute rotate-45"></div>
                  <div className="h-1/2 w-[1px] bg-black-white absolute -rotate-45"></div>
              </div>
          </div>

          {/* Description */}
          <p className="max-w-80 mb-3 font-light">{description}</p>

          {children}
          
        </div>
      </div>
  )
}

export default FormFoundation
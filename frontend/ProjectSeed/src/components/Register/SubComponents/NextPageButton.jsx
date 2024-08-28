// importing from thirdparty libraries
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

// Additional imports
import ArrowThin from "../../Icons/ArrowThin"
import {validatePageAccess} from "../Validators/pageValidators"
import { getNextPageNameFromCurrentNum } from "../pageUtilities/pageNavigationUtils"
import { signUpRoute } from "../../../utilities/frontendRoutes"
import { setSignUpFormStatus } from "../../../reduxStore/features/Register/signUpFormFeedbackSlice"


function NextPageButton() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const formData = useSelector((states)=>states.signUpFormReducer)
  const currentPageNum = useSelector((states)=>states.signUpPageNumReducer)
  const nextPageNum = currentPageNum + 1
  
  const pageChangeHandler = () =>{
    const accessStatus = validatePageAccess(formData, nextPageNum)
 
    if (accessStatus.errorStatus === false){
      const nextPageName = getNextPageNameFromCurrentNum(currentPageNum)
      navigate(`${signUpRoute}${nextPageName}`)
    }
    else{
      dispatch(setSignUpFormStatus({...accessStatus}))
    }
  }
  
  return (
    <div className=" h-8 w-8 border rounded-lg center absolute bottom-3 right-3 btn-white-hollow"
              onClick={pageChangeHandler}>
                <ArrowThin />
    </div>
  )
}

export default NextPageButton
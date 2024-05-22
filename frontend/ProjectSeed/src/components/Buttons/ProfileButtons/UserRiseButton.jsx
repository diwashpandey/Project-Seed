// imports from third party libraries
import { useSelector } from "react-redux"
import { useMutation } from "react-query"

// Additional imports
import fetchProfileRiseRequest from "../../../fetchers/Profile/fetchProfileRiseRequest"

function UserRiseButton({postId, alreadyRisen=false}) {

    const user = useSelector((states) => states.userReducer)

    const mutation = useMutation({
        "mutationFn": ({commit, userId}) => fetchProfileRiseRequest(commit, userId),

        // Rising the POST RISE COUNT with the vanilla JS
        "onSuccess": (data, context)=>{
        },

        "onMutate":(context)=>{
            const btn = context.event.target

            if (context.commit == "unrise"){
            }
            else if(context.commit == "rise"){
            }
        }
    })
    
    const handleRise = (event) =>{
        event.preventDefault()

        let commit = event.target.getAttribute("data-commit")
        let postId = event.target.getAttribute("data-id")

        mutation.mutate({commit, postId, event}) // Sending the request
    }
    
  if (user.isAuthenticated){
      // if already Risen: returning Unrise Button
      if(alreadyRisen){
        return (
            <form data-commit="unrise" data-id={postId} onSubmit={handleRise}>
                <button type="submit" className="unrise-btn">
                    <span className="rise-btn-text">Unrise</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="h-4">
                        <g id="Rise">
                            <path className="cls-1" d="M10,.83A9.17,9.17,0,1,0,19.17,10,9.18,9.18,0,0,0,10,.83Zm3.68,9.06a1.08,1.08,0,0,1-.8.37A1.1,1.1,0,0,1,12.2,10L11.05,9v4.22a1.05,1.05,0,0,1-2.1,0V9L7.8,10a1,1,0,0,1-1.36-1.6L9.32,6a1,1,0,0,1,1.36,0l2.88,2.44A1.06,1.06,0,0,1,13.68,9.89Z"/>
                        </g>
                    </svg>
                </button>
            </form>
        )
      }
      return (
          <form data-commit="rise" data-id={postId} onSubmit={handleRise}>
            <button type="submit" className="rise-btn">
                <span className="rise-btn-text">Rise</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="h-4">
                    <g id="Rise">
                        <path className="cls-1" d="M10,.83A9.17,9.17,0,1,0,19.17,10,9.18,9.18,0,0,0,10,.83Zm3.68,9.06a1.08,1.08,0,0,1-.8.37A1.1,1.1,0,0,1,12.2,10L11.05,9v4.22a1.05,1.05,0,0,1-2.1,0V9L7.8,10a1,1,0,0,1-1.36-1.6L9.32,6a1,1,0,0,1,1.36,0l2.88,2.44A1.06,1.06,0,0,1,13.68,9.89Z"/>
                    </g>
                </svg>
            </button>
        </form>
      )
  }
  // If not Authenticated returning this button
  return (
      <div className="rise-btn">
          <span className="rise-btn-text">Rise</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="h-4">
              <g id="Rise">
                  <path className="cls-1" d="M10,.83A9.17,9.17,0,1,0,19.17,10,9.18,9.18,0,0,0,10,.83Zm3.68,9.06a1.08,1.08,0,0,1-.8.37A1.1,1.1,0,0,1,12.2,10L11.05,9v4.22a1.05,1.05,0,0,1-2.1,0V9L7.8,10a1,1,0,0,1-1.36-1.6L9.32,6a1,1,0,0,1,1.36,0l2.88,2.44A1.06,1.06,0,0,1,13.68,9.89Z"/>
              </g>
          </svg>
      </div>
  )
}

export default UserRiseButton



// imports from react
import { useContext } from "react"

// imports from third party libraries
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useMutation } from "react-query"

// Additional imports
import fetchProfileRiseRequest from "../../../fetchers/Profile/fetchProfileRiseRequest"
import { profileOwnerDataContext } from "../../../pages/Profile"
import { loginRoute } from "../../../utilities/frontendRoutes"

function CollegeRiseButton() {
    
    const user = useSelector((states) => states.userReducer)
    // const {collegeProfileData, setCollegeProfileData} = useContext(profileOwnerDataContext)

    const mutation = useMutation({
        "mutationFn": ({commit, username}) => fetchProfileRiseRequest(commit, username),

        // Rising the POST RISE COUNT with the vanilla JS
        "onSuccess": (data, context)=>{
            setProfileOwnerData((previousData)=>{
                return {...previousData, rise_points:data.new_rise_points}
            })
        },

        "onMutate":(context)=>{
            const btn = context.event.target

            if (context.commit == "unrise"){
                btn.querySelector("button").classList.remove("unrise-btn")
                btn.querySelector("button").classList.add("rise-btn")
                btn.setAttribute("data-commit", "rise")
                btn.querySelector(".rise-btn-text").innerHTML = "Rise"
            }
            else if(context.commit == "rise"){
                btn.querySelector("button").classList.remove("rise-btn")
                btn.querySelector("button").classList.add("unrise-btn")
                btn.setAttribute("data-commit", "unrise")
                btn.querySelector(".rise-btn-text").innerHTML = "Unrise"
            }
        }
    })
    
    const handleRise = (event) =>{
        event.preventDefault()

        let commit = event.target.getAttribute("data-commit")
        let username = event.target.getAttribute("data-username")

        mutation.mutate({commit, username, event}) // Sending the request
    }
    
  if (user.isAuthenticated){
      // if already Risen: returning Unrise Button
      if(profileOwnerData.already_risen){
        return (
            <form data-commit="unrise" data-username={profileOwnerData.username} onSubmit={handleRise}>
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
          <form data-commit="rise" data-username={profileOwnerData.username} onSubmit={handleRise}>
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
    <Link to={loginRoute} className="rise-btn">
          <span className="rise-btn-text">Rise</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="h-4">
              <g id="Rise">
                  <path className="cls-1" d="M10,.83A9.17,9.17,0,1,0,19.17,10,9.18,9.18,0,0,0,10,.83Zm3.68,9.06a1.08,1.08,0,0,1-.8.37A1.1,1.1,0,0,1,12.2,10L11.05,9v4.22a1.05,1.05,0,0,1-2.1,0V9L7.8,10a1,1,0,0,1-1.36-1.6L9.32,6a1,1,0,0,1,1.36,0l2.88,2.44A1.06,1.06,0,0,1,13.68,9.89Z"/>
              </g>
          </svg>
    </Link>
  )
}

export default CollegeRiseButton



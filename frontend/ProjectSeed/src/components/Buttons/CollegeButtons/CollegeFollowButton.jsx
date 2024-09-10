// imports from react
import { useContext } from "react"

// imports from third party libraries
import { useSelector } from "react-redux"
import { useMutation } from "react-query"
import {Link} from "react-router-dom"

// Additional imports
import fetchProfileFollowRequest from "../../../fetchers/Profile/fetchProfileFollowRequest"
import { profileOwnerDataContext } from "../../../pages/Profile"
import { loginRoute } from "../../../utilities/frontendRoutes"

function UserFollowButton() {
    
    const user = useSelector((states) => states.userReducer)
    const {collegeProfileData, setCollegeProfileData} = useContext(profileOwnerDataContext)

    const mutation = useMutation({
        "mutationFn": ({commit, username}) => fetchProfileFollowRequest(commit, username),

        // Rising the POST RISE COUNT with the vanilla JS
        "onSuccess": (data, context)=>{
            setProfileOwnerData((previousData)=>{
                return {...previousData, followers_count:data.new_followers_count}
            })
        },

        "onMutate":(context)=>{
            const btn = context.event.target

            if (context.commit == "unfollow"){
                btn.setAttribute("data-commit", "follow")
                btn.querySelector("button").innerHTML = "Follow"
            }
            else if(context.commit == "follow"){
                btn.setAttribute("data-commit", "unfollow")
                btn.querySelector("button").innerHTML = "Unfollow"
            }
        }
    })
    
    const handleFollow = (event) =>{
        event.preventDefault()

        let commit = event.target.getAttribute("data-commit")
        let username = event.target.getAttribute("data-username")

        mutation.mutate({commit, username, event}) // Sending the request
    }
    
  if (user.isAuthenticated){
      // if already Risen: returning Unrise Button
      if(profileOwnerData.already_followed){
        return (
          <form data-username={profileOwnerData.username} data-commit="unfollow" onSubmit={handleFollow}>
            <button type="submit" className='follow-btn'>Follow</button>
          </form>
        )
      }
      return (
        <form data-username={profileOwnerData.username} data-commit="follow" onSubmit={handleFollow}>
          <button type="submit" className='follow-btn'>Follow</button>
        </form>
      )
    }
    // If not Authenticated returning this button
    return (
        <Link to={loginRoute} className='follow-btn'>Follow</Link>
    )
}

export default UserFollowButton




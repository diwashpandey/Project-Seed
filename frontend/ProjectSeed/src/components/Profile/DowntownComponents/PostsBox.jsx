// Imports form Third-party libraries
import { useDispatch, useSelector } from "react-redux"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"

// Components import
import Post from "../../Post/Post/Post"
import UploadPost from "../../Post/UploadPost/UploadPost"

// Additional Imports
import { changeUploadPostActive } from "../../../reduxStore/features/Post/uploadPostActiveSlice"
import { UserPosts, UserPostsNonAuth } from "../../../utilities/apiEndpoints"
import { fetchUserPosts } from "../../../fetchers/Profile/fetchUserPosts"
import { setProfileOwnerData } from "../../../reduxStore/features/Profile/profileOwnerDataSlice"
import DummyLoadingPost from "../../Post/Post/DummyLoadingPost"

export default function PostsBox() {
    const user = useSelector((states)=>states.userReducer)
    const uploadPostActiveStatus = useSelector((states)=>states.uploadPostActiveReducer)
    const dispatch = useDispatch()

    const profileOwnerData = useSelector((states)=>states.profileOwnerDataReducer)

    const { username } = useParams();
    const url = user.isAuthenticated ? UserPosts(username) : UserPostsNonAuth(username)
  
    const {data, isLoading, isSuccess, error} = useQuery({
        queryKey : ["userFollowingProfilesQuery", url],
        queryFn: () => fetchUserPosts(url),
        refetchOnWindowFocus:false,
    })

    if(error){
        return null
    }

  return (
    <>
        {
            uploadPostActiveStatus ? 
            <UploadPost />
            : null
        }
        <div id="profile-downtown-posts-continer" className="user_profile_downtown_sections">
            <div id="downtown-posts-container-header" className="flex justify-between p-1 sm:p-4">
                <h2 className="text-lg sm:text-2xl md:text-3xl">Achievements</h2>
                {
                    // This is the Create new posts button
                    profileOwnerData.is_owner ?  
                    <button
                    className="btn-white-filled w-40 text-[0.5em] sm:text-sm sm:block"
                    onClick={()=>dispatch(changeUploadPostActive())}
                    >Create a new post</button>
                    : null
                }
                
            </div>
            <div id="downtown-posts-user-cards-container" className="flex flex-col items-center">
                {isLoading ? <LoadingBoxes /> : data?.map((post) => <Post key={post.id} post={post} />)}
            </div>
        </div>
    </>
  )
}

function LoadingBoxes(){
    return (
        <>
            <DummyLoadingPost />
            <DummyLoadingPost />
            <DummyLoadingPost />
        </>
    )
}

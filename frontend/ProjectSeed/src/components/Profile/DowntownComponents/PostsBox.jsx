import Post from "../../Post/Post/Post"
import { useContext } from "react"
import { profileOwnerDataContext } from '../../../pages/Profile'

export default function PostsBox() {
    let {profileOwnerData} = useContext(profileOwnerDataContext)
  return (
        <div id="profile-downtown-posts-continer" className="user_profile_downtown_sections">
            <div id="downtown-posts-container-header" className="flex justify-between p-1 sm:p-4">
                <h2 className="text-lg sm:text-2xl md:text-3xl">Achievements</h2>
                {
                    // This is the Create new posts button
                    profileOwnerData.is_owner ?  
                    <button className="btn-white-filled w-40 text-[0.5em] sm:text-sm sm:block">Create a new post</button>
                    : null
                }
                
            </div>
            <div id="downtown-posts-user-cards-container" className="flex flex-col items-center">
                {profileOwnerData.posts.map((post)=>{
                    return <Post key={post.id} post={post} />
                })}
            </div>
        </div>
  )
}

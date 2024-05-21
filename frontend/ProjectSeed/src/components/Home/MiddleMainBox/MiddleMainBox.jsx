// imports from react
import { useContext, useEffect, useRef } from "react"

// imports from third party
import { useQuery } from "react-query"
import { useDispatch, useSelector } from "react-redux"

// Additional imports
import { GetPostsURL, GetPostsNonAuthenticatedURL } from "../../../utilities/apiEndpoints"
import fetchPost from "../../../fetchers/Post/fetchPosts"
import { addPosts } from "../../../reduxStore/features/Post/postsSlice"
import { generatePhotoURL } from "../../../utilities/apiEndpoints"
import DummyLoadingPost from "../../Post/DummyLoadingPost"

import Post from "../../Post/Post"

export default function MiddleMainBox() {
    const isAuthenticated = useSelector((states)=>states.isAuthenticatedReducer)
    const Posts = useSelector((state)=> state.postsReducer[0])

    const dispatch = useDispatch()

    const url = isAuthenticated ? GetPostsURL : GetPostsNonAuthenticatedURL
    let { data, isSuccess, isLoading, isError } = useQuery({
        queryKey: ["fetchPosts"],
        queryFn: () =>  fetchPost(url)
    })

    useEffect(()=>{
        if (isSuccess){
            dispatch(addPosts(data))
        }
    }, [data])

  return (
    <>  
        { isAuthenticated ? <UploadPostDummy /> : null}
        
        <div id="posts-container" className="w-full flex flex-col items-center">
        {
            Posts ? Posts.map((post)=>{
                return <Post key={post.id} post={post} />
            }) : ""
        }
        </div>

        {/* This is the dummy loading post which stays in the last as an loading illusion */}
        <DummyLoadingPost />
    </>
  )
}

function UploadPostDummy(){
    const authUserData = useSelector((state)=> state.authUserDataReducer)

    return (
        <div id="upload-post-container" className="h-12 w-full max-w-xl p-2 rounded-2xl flex items-center bg-main-box sm:h-14">
            <img src={
                authUserData?.profile_photo? `${generatePhotoURL(authUserData.profile_photo)}`: ""
                } alt="pp" className="profile-photo h-8 w-8 mr-4 bg-gray-500 sm:h-10 sm:w-10" />
            <p className="text-xs font-extralight sm:text-lg">Share your new achievement</p>
            <div className="btn-container ml-auto flex gap-2  text-sm font-light">
                <div className=" h-6 p-1 w-16 rounded-full center bg-green-600  text-[10px] text-white cursor-pointer hover:bg-green-700">Add Photo</div>
                <div className="post-btn hidden h-6 w-14 p-1 center gap-1 rounded-full bg-blue-500 text-[10px] cursor-pointer hover:bg-blue-600 sm:flex">
                    <span className="text-white">Post</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="fill-white h-4 w-4">
                        <path className="cls-1" d="M9.87,9.58h-6m-.17.79-1,3c-.55,1.63-.82,2.45-.63,2.95a1.52,1.52,0,0,0,1,.89c.52.15,1.3-.21,2.87-.91l10-4.52c1.53-.69,2.29-1,2.53-1.51a1.53,1.53,0,0,0,0-1.32c-.24-.48-1-.82-2.53-1.51L5.89,2.89C4.33,2.18,3.55,1.83,3,2a1.49,1.49,0,0,0-1,.89c-.19.5.08,1.31.62,2.93l1,3.07a2.83,2.83,0,0,1,.16.56,1.21,1.21,0,0,1,0,.38A2.83,2.83,0,0,1,3.67,10.37Z"/>
                    </svg>
                </div>
            </div>
        </div>
    )
}


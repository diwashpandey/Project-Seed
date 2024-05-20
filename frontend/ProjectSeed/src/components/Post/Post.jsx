// imports from third party libraries
import { formatDistance } from "date-fns"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

// importing components
import  PostRiseButton  from "../Buttons/PostRiseButton"
import PostCommentButton from '../Buttons/PostCommentButton'

// Additional imports
import { generatePhotoURL } from '../../utilities/apiEndpoints'
import { generateProfileRoute } from "../../utilities/frontendRoutes"

function Post({post}) {
    const isAuthenticated = useSelector((states)=>states.isAuthenticatedReducer)

    return (
        <div id="post" className="post w-full max-w-xl p-2 mt-4 rounded-2xl bg-main-box">
            <div className="post-header flex items-center relative bottom-3 pl-1 sm:bottom-4 md:pl-4">
                <Link to={generateProfileRoute(post.user.username)} className="post-user-profile-photo-container h-[50px] w-[50px] mr-1 rounded-full center relative bottom-1 bg-main-box md:bottom-0 md:mr-2 md:h-[70px] md:w-[70px]">
                    <img src={generatePhotoURL(post.user.profile_photo)} alt="" className="profile-photo h-[80%] w-[80%] bg-gray-500" />
                </Link>
                <div>
                    <Link to={generateProfileRoute(post.user.username)} className="post-user-full-name font-light text-sm sm:text-lg">{ post.user.full_name }</Link>
                    <div className="sm:flex">
                        <Link to={generateProfileRoute(post.user.username)} className="post-user-username font-light text-[8px] sm:text-xs">@{ post.user.username }</Link>
                        <div className="post-uploaded-time font-light text-[8px] opacity-60 sm:ml-6 sm:text-xs">{
                        formatDistance(new Date(post.uploaded_date), new Date(), { addSuffix: true }) // Using date-fns to get the date uploaded
                        }</div>
                    </div>
                </div>
                <div className="post-rise-and-comments-count-box ml-auto flex gap-4">
                    <div className="post-rise-count w-auto font-medium">
                        <span className="text-sm text-theme-color sm:text-2xl md:text-lg xl:text-2xl">{ post.rises_count }</span>
                        <span className="text-theme-color text-[8px] sm:text-sm md:text-xs xl:text-sm"> rises</span>
                    </div>
                    <div className="post-comment-count w-auto">
                        <span className="text-sm text-blue-400 font-medium sm:text-2xl md:text-lg xl:text-2xl">{ post.comments_count }</span>
                        <span className="text-blue-400 text-[8px] font-light sm:text-sm md:text-xs xl:text-sm"> comments</span>
                    </div>
                </div>
            </div>
            <p className='pl-2 relative bottom-4 text-xs font-base md:pl-5 md:text-base'>{post.caption}</p>
            {
                post.photos[0] ?
                <div className="post-photo-section center mb-4 gap-4">
                    <img src={generatePhotoURL(post.photos[0].photo)} alt="" className="h-80 w-80 rounded-lg object-cover sm:h-96 sm:w-96 bg-white md:h-96 md:w-96" />
                </div>
                : null    
            }
            <div className="post-btn-section center gap-7">
                <PostRiseButton isAuthenticated={isAuthenticated} />
                <PostCommentButton />
            </div>
        </div>
    )
}

export default Post
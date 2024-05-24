// Imports from react
import { useContext } from 'react'

// Additional imports
import { generatePhotoURL } from '../../utilities/apiEndpoints'
import { profileOwnerDataContext } from '../../pages/Profile'
import UserRiseButton from '../Buttons/ProfileButtons/UserRiseButton'
import UserFollowButton from '../Buttons/ProfileButtons/UserFollowButton'

const MainProfile = ({children}) => {
    let {profileOwnerData} = useContext(profileOwnerDataContext)

  return (
      <div id="first-box" className='w-full'>
            <div id="main-user-profile-section" className="w-full pb-4 flex flex-col items-center relative bg-main-box mb-4" >
                {/* Background Photo */}

                <div id="top-div" className="absolute w-full flex">
                    <div id="rise-and-follow-buttons-container" className="ml-2 flex gap-4 absolute bottom-[-2.3rem]">
                        <UserRiseButton profileOwnerData={profileOwnerData} alreadyRisen={profileOwnerData.already_risen} />
                        <UserFollowButton />
                    </div>
                    <img src={generatePhotoURL(profileOwnerData.background_photo)} alt="" id="user-profile-background-photo" className="w-full h-36 rounded-lg object-cover z-0 bg-gray-700" />
                    <div id="more-button" className="flex flex-col gap-0.5 absolute bottom-[-2.3rem] right-2">
                        <div className="h-1.5 w-1.5 bg-theme- rounded-full"></div>
                        <div className="h-1.5 w-1.5 bg-theme- rounded-full"></div>
                        <div className="h-1.5 w-1.5 bg-theme- rounded-full"></div>
                    </div>
                </div>

                {/* Profile Photo */}
                
                <img src={generatePhotoURL(profileOwnerData.profile_photo)} id="user-profile-profile-photo" alt="" className="profile-photo h-24 w-24 mt-16 border-2 border-white relative z-1 bg-gray-700 sm:h-36 sm:w-36" />

                {/* Name, username & intro */}
                <h1 id="user-profile-full-name" className="text-2xl font-light">{profileOwnerData.full_name}</h1>
                <h3 id="user-profile-username" className="text-xs font-extralight mb-1 sm:text-base text-theme-color">@{profileOwnerData.username}</h3>
                <h2 id="user-profile-bio" className="text-xs max-w-48 text-center font-extralight sm:text-sm sm:max-w-80">{profileOwnerData.intro}</h2>

                {/* Rise Points box */}
                <div id="user-profile-rise-points" className="h-8 w-fit m-3 px-2 rounded-md center gap-2 cursor-default bg-theme-color">
                    <span className="text-base text-white">{profileOwnerData.rise_points} Rise Points</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-4 fill-white">
                        <g id="Rise">
                            <path className="cls-1" d="M10,.83A9.17,9.17,0,1,0,19.17,10,9.18,9.18,0,0,0,10,.83Zm3.68,9.06a1.08,1.08,0,0,1-.8.37A1.1,1.1,0,0,1,12.2,10L11.05,9v4.22a1.05,1.05,0,0,1-2.1,0V9L7.8,10a1,1,0,0,1-1.36-1.6L9.32,6a1,1,0,0,1,1.36,0l2.88,2.44A1.06,1.06,0,0,1,13.68,9.89Z"/>
                        </g>
                    </svg>
                </div>

                {/* Following and Followers count boxes */}
                <div className="mb-3 flex gap-16">
                    <div id="user-profile-followers-count" className="p-1 py-[2px] rounded-md text-light-mode-opposite-color text-xs font-extralight bg-black-white sm:text-sm">{profileOwnerData.followers_count} Followers</div>
                    <div id="user-profile-following-count" className="p-1 py-[2px] rounded-md text-light-mode-opposite-color text-xs font-extralight bg-black-white sm:text-sm">{profileOwnerData.following_count} Following</div>
                </div>

                {/* College or university details */}
                <div id="user-studies-container" className="p-2 rounded-lg flex flex-col gap-4 items-center bg-theme-lighter sm:flex-row">
                    {
                        profileOwnerData.colleges.map((college)=>{
                            return <span key =  {college.id}  className="text-xs md:text-base">{college.name}</span>
                        })
                    }
                    {
                        profileOwnerData.universities.map((university)=>{
                            return <span id={`user-profile-university-${university.id}`} key={university.id} className="text-xs md:text-base">{university.name}</span>
                        })
                    }
                    {
                        profileOwnerData.colleges.length === 0 && profileOwnerData.universities.length === 0 ?
                        <span key="noStudy" className="text-xs md:text-base">No Study Provided</span>
                        :""
                    }
                </div>
                <hr className="w-[80%] m-4" />
                <div id="user-profile-more-information-section" className="w-[80%] min-h-56 grid grid-rows-2 grid-cols-2 gap-2 sm:flex lg:w-[60%]">
                    <ul id="user-profile-skills-list" className="order-2 rounded-2xl p-4 flex flex-col items-center bg-theme-lighter text-xs sm:order-1 sm:w-[50%] sm:text-base">
                        <li className="px-3 mb-1 bg-black-white text-light-mode-opposite-color rounded-md font-light">Skills</li>
                        {
                            profileOwnerData.skills.length !== 0 ? 
                                profileOwnerData.skills.map((skill)=>{
                                    return <li key={skill.id}>{skill.name}</li>
                                })
                            : <li key={"noSkill"} className="text-center">No Skills Provided</li>
                        }
                    </ul>
                    <div id="user-profile-aboutme" className="order-1 p-4 rounded-2xl col-start-1 col-end-3 relative text-sm bg-theme-lighter sm:order-2 sm:w-full">
                        <p className="text-center text-2xl mb-2">About me</p>
                        <p className="text-center sm:text-base">
                            {profileOwnerData.about_me? profileOwnerData.about_me : "No about me Provided"}
                        </p>
                        {/* <div id="user-profile-about-seemore" className="absolute bottom-1 right-4 text-sm cursor-pointer opacity-50 hover:underline hover:opacity-100">see all</div> */}
                    </div>
                    <ul id="user-profile-interests-list" className="order-3 p-4 rounded-2xl bg-theme-lighter flex flex-col items-center text-xs sm:order-3 sm:w-[50%] sm:text-base">
                        <li className="px-3 mb-1 bg-black-white text-light-mode-opposite-color rounded-md font-light">Interests</li>
                        {
                            profileOwnerData.interests.length !== 0 ? 
                                profileOwnerData.interests.map((interest)=>{
                                    return <li key={interest.id}>{interest.name}</li>
                                })
                            : <li key={"noInterest"} className="text-center">No Interests Provided</li>
                        }
                    </ul>
                </div>
            </div>

            {/* This is the Profile Downtown */}
            {children}
        </div>
  )
}

export default MainProfile

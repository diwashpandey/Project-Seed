// imports from react

// imports from third party libraries
import { Link } from "react-router-dom"

// Pages and Components imports
import TopPostCard from "./TopPostCard"
import Top1ProfileCard from '../LeftBox/Top1ProfileCard'

// Additional imports
import Top2And3ProfileCard from "./Top2And3ProfileCard"
import { topProfilesRoute } from "../../../utilities/frontendRoutes"

function LeftRankingBox({top3Profiles, top3Posts}){
    
  return (
        <>
            <div id="top-students-box" className="h-auto w-full p-2 rounded-e-lg bg-main-box ">
                <div className="flex justify-between items-end mb-4">
                    <h1 className="text-lg">Top 3 Students</h1>
                    <Link to={topProfilesRoute} className="text-xs font-extralight">View more</Link>
                </div>
                <div id="top-1-stu-contiainer" className="center">
                    <Top1ProfileCard profile={top3Profiles[0]}/>
                </div>
                <div id="top-2-3-stu-container" className="flex justify-around">
                    {top3Profiles.slice(1, 3).map((profile) => {
                        return <Top2And3ProfileCard key={profile.username} profile={profile} />;
                    })}
                    
                </div>
            </div>
            <div id="top-posts-box" className="h-[80%] w-full p-2 bg-main-box overflow-scroll">
                <div className="flex justify-between items-end mb-4">
                    <h1 className="text-lg">Top 3 Achievements</h1>
                    <a href="" className="text-xs font-extralight">View more</a>
                </div>
                    {top3Posts.map((topPost)=>{
                        return <TopPostCard key={topPost.id} topPost={topPost} />
                    })}
            </div>
        </>
    )
}

export default LeftRankingBox

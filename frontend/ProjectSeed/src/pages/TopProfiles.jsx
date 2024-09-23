// Importing Components
import PeopleLikeYouBox from "../components/TopProfiles/PeopleLikeYouBox"
import MainBox from "../components/TopProfiles/MainBox"

function TopProfiles(){

    // Rendering the final page
    return (
      <main className="pt-[70px] flex gap-5 justify-center">

          <MainBox />
          {/* <!-- People Like You Box --> */}
          <PeopleLikeYouBox />
      </main>
    )
  }
  
export default TopProfiles
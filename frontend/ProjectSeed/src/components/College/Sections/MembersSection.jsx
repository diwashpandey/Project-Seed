// Imports from react
import { useState } from "react";

// Imports from third party libraries
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

// Components imports
import LoadingProfileCard from "../../ProfileCards/userProfileCards/LoadingProfileCard";
import ProfileCardStandard from "../../ProfileCards/userProfileCards/ProfileCardStandard"

// Additional import
import { fetchCollegeMembers } from "../../../fetchers/CollegeProfile/fetchCollegeMembers";

function MembersSection() {
  const [startIndex, setStartIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const {college_identifier} = useParams()

  const { data, error, isLoading, refetch } = useQuery({
        "queryKey":['college_members', college_identifier, startIndex],
        "queryFn": () => fetchCollegeMembers(college_identifier, startIndex, 25),
        "onSuccess": (data) => {
            setHasMore(data.has_more);
          },
          keepPreviousData: true,
          refetchOnWindowFocus:false
      }
  );


  if (isLoading && startIndex === 0) {
    return (
        <div className="min-h-56 w-full p-4 rounded-xl grid grid-cols-1 gap-4 justify-items-center bg-theme-lighter md:p-8 md:grid-cols-2">
          <LoadingProfileCard />
          <LoadingProfileCard />
          <LoadingProfileCard />
          <LoadingProfileCard />
        </div>
    )
  }

  if (!data.has_members){
    return (
        <h1>Now students found!</h1>
    )
  }

  const loadMore = () => {
      if (data.has_more) {
          setStartIndex(prevIndex => prevIndex + 25);
          refetch();  // Trigger refetch to load more students
      }
  };


  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
    <div className="min-h-56 w-full p-4 rounded-xl bg-theme-lighter md:p-8">
        <h1>Admin</h1>
        <div className="w-full p-4 rounded-xl grid grid-cols-1 gap-4 justify-items-center bg-theme-lighter md:p-8 md:grid-cols-2">
            <ProfileCardStandard user={data.admin[0]} />
        </div>
        <h1>Management</h1>
        <div className="w-full p-4 rounded-xl grid grid-cols-1 gap-4 justify-items-center bg-theme-lighter md:p-8 md:grid-cols-2">
          {data.management_team.map(member => (
              <ProfileCardStandard key={member.id} user={member} />
          ))}
        </div>
        <h1>Faculties</h1>
        <div className="w-full p-4 rounded-xl grid grid-cols-1 gap-4 justify-items-center bg-theme-lighter md:p-8 md:grid-cols-2">
          {data.teachers.map(teacher => (
              <ProfileCardStandard key={teacher.id} user={teacher} />
          ))}
        </div>
            {hasMore && (
              <button onClick={loadMore} className="btn-white-filled mt-4">
                    Load More
                </button>
            )}
      </div>
      </>
  );
}


export default MembersSection
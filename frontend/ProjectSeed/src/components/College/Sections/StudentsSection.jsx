// Importing from react
import { useState } from 'react';

// Imporing from third party libraries
import { useQuery } from "react-query"
import { useParams } from 'react-router-dom';

// Imporing Components
import ProfileCardStandard from '../../ProfileCards/userProfileCards/ProfileCardStandard';
import LoadingProfileCard from '../../ProfileCards/userProfileCards/LoadingProfileCard';

// Additional Imports
import { fetchCollegeStudents } from '../../../fetchers/CollegeProfile/fetchCollegeStudents'; // Adjust path as necessary


function StudentsSection() {
  const [startIndex, setStartIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const {college_identifier} = useParams()

  const { data, error, isLoading, refetch } = useQuery({
        "queryKey":['students', college_identifier, startIndex],
        "queryFn": () => fetchCollegeStudents(college_identifier, startIndex, 25),
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

  if (!data.has_students){
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
      <div className="min-h-56 w-full p-4 rounded-xl grid grid-cols-1 gap-4 justify-items-center bg-theme-lighter md:p-8 md:grid-cols-2">
          {data.students.map(student => (
              <ProfileCardStandard key={student.id} user={student} />
          ))}
          {hasMore && (
              <button onClick={loadMore} className="btn-white-filled mt-4">
                  Load More
              </button>
          )}
      </div>
  );
}

export default StudentsSection;
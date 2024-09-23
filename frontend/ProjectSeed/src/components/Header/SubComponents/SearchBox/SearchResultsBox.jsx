import CollegeSearchBoxProfileCard from "../../../ProfileCards/CollegeProfileCards/CollegeSearchBoxProfileCard";
import UniversitySearchBoxProfileCard from "../../../ProfileCards/UniversitySearchBoxProfileCard/UniversitySearchBoxProfileCard";
import UserSearchBoxProfileCard from "../../../ProfileCards/UserProfileCards/UserSearchBoxProfileCard";

function SearchResultsBox({ isLoading, isError, error, data, setSearchBoxActive  }) {
    if (isLoading) {
        return (
            <div className="min-h-[40vh] w-full pt-12 p-2 rounded-lg flex flex-col absolute -top-2 -left-2 -z-20 bg-theme-darker shadow-2xl transition-all">
                {/* Placeholder for loading indicator */}
                <div className="text-center">Searching...</div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-[40vh] w-full pt-12 p-2 rounded-lg flex flex-col absolute -top-2 -left-2 -z-20 bg-theme-darker shadow-2xl transition-all">
                <div className="text-center">Unexpected Application Error!</div>
            </div>
        );
    }

    const { users, colleges, universities } = data || {};

    return (
        <>
        {/* This is the full background with low opacity */}
        <div
        className='h-screen w-screen bg-black fixed top-0 right-0 -z-20 opacity-40'
        onClick={()=>setSearchBoxActive(false)}
        ></div>
        
        <div className='min-h-[40vh] w-full pt-12 p-2 rounded-lg flex flex-col absolute -top-2 -left-2 -z-20 bg-theme-darker shadow-2xl transition-all'>

            {/* This Box has been separated to give the separate space for the search input when scrolling */}
            <div className="max-h-[60vh] w-full overflow-y-scroll">
                {users?.length > 0 && (
                    <>
                        <h2>Users</h2>
                        {users.map(user => <UserSearchBoxProfileCard key={user.username} user={user} />)}
                    </>
                )}
                {colleges?.length > 0 && (
                    <>
                        <h2 className="mt-2">Colleges</h2>
                        {colleges.map(college => <CollegeSearchBoxProfileCard key={college.college_identifier} college={college} />)}
                    </>
                )}
                {universities?.length > 0 && (
                    <>
                        <h2 className="mt-2">Universities</h2>
                        {universities.map(university => <UniversitySearchBoxProfileCard key={university.university_identifier} university={university} />)}
                    </>
                )}
                {(users?.length === 0 && colleges?.length === 0 && universities?.length === 0) && (
                    <div className="text-center">No results found</div>
                )}
            </div>
        </div>
        </>
    );
}

export default SearchResultsBox;

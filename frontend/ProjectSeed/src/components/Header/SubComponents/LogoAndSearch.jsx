// components/LogoAndSearch.js

import { useState } from "react";
import { useQuery } from "react-query";
import SearchResultsBox from "./SearchBox/SearchResultsBox";
import Search from "../icons/Search";
import { searchFetcher } from "../../../fetchers/Search/searchFetcher";

function LogoAndSearch() {
    const [searchBoxActive, setSearchBoxActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const { data, error, isLoading } = useQuery(
        ['searchResults', searchQuery],
        () => searchFetcher(searchQuery),
        {
            enabled: searchBoxActive && searchQuery.length > 0,
            refetchOnWindowFocus: false,
            keepPreviousData: true
        }
    );

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="logo-and-search center gap-4">
            <span className="text-theme-color font-semibold">LOGO</span>

            <div id="search-box" className="relative w-[20rem] z-20 lg:w-[27rem]">
                <form action="" className="flex gap-1">
                    <input
                        type="text"
                        placeholder="Search for talents"
                        className={`hidden h-8 ${searchBoxActive ? "w-[80%]" : "w-[50%]"} pl-4 border-none rounded-2xl bg-theme-lighter text-xs md:block transition-all duration-300 ease-in-out focus-visible:outline-none`}
                        onFocus={() => setSearchBoxActive(true)}
                        onChange={handleChange}
                        value={searchQuery}
                    />
                    {searchBoxActive && (
                        <div className="fill-text-color h-8 w-8 rounded-xl center hover:bg-[#00000065] transition-colors">
                            <Search />
                        </div>
                    )}
                </form>
                {searchBoxActive && (
                    <SearchResultsBox
                        isLoading={isLoading}
                        error={error}
                        data={data}
                        setSearchBoxActive = {setSearchBoxActive}
                    />
                )}
            </div>
        </div>
    );
}

export default LogoAndSearch;

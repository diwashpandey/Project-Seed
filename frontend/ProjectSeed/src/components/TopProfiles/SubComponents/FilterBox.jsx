// imports from react
import { useState } from "react";

// imports form third party library
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

// Additional imports
import { topProfilesRoute } from "../../../utilities/frontendRoutes";
import { selectBoxStyle } from "../selectBoxStyle";
import { fetchSkillsList } from "../../../fetchers/TopProfiles/fetchSkillsList";

// components imports
import Select from "react-select"
import Search from "../../Icons/search";
import UniversityFilterBox from "./FilterBox/UniversityFilterBox";
import LocationFilterBox from "./FilterBox/LocationFilterBox";
import CollegeFilterBox from "./FilterBox/CollegeFilterBox";

function FilterBox() {
  const navigate = useNavigate(); // Initialize navigate
  
  // Section for the filter (College or University or Location)
  const [filterSection, setFilterSection] = useState("college")

  // Query Form
  const [form, setForm] = useState({
    get_from: filterSection, // Using the filterSection (college or unviersity or location)
    name: "",
    skill:"",
  });
  const [skillsOption , setSkillsOption] = useState([])


  // This is query for skills lists
  useQuery({
    queryKey:"skillsList",
    queryFn: fetchSkillsList,
    onSuccess:(data)=>{
      let newData = data.map((skill)=>(
        {value:skill, label:skill})
      )
      setSkillsOption(newData)
    },
    refetchOnWindowFocus:false
  })

  // This handles the Navigation of the filter
  let SectionComponent;
  let [collegeActive, universityActive, locationActive] = ["","",""]

  switch (filterSection){
    case "university":
      SectionComponent = UniversityFilterBox;
      universityActive = "bg-main-background rounded-t-lg";
      break;

    /* 
      Disabling the Option Location right now,
      We'll work on it after few more features
    */
    // case "location":
    //   SectionComponent = LocationFilterBox;
    //   locationActive = "bg-main-background rounded-t-lg";
    //   break;
    default:
      SectionComponent = CollegeFilterBox;
      collegeActive = "bg-main-background rounded-t-lg";
  }

  // This handles the sumbit
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submit behavior
    const queryParams = new URLSearchParams(form).toString(); // Convert form state to query params
    navigate(`/${topProfilesRoute}?${queryParams}`); // Navigate to the new URL with query params
  };

  return (

    <>
        <ul id="college-profile-navigation" className="flex font-light">
          <li
          className={`${collegeActive} w-16 px-0.5 py-1.5 center text-xs cursor-pointer md:text-xs`}
          onClick = {()=>{setFilterSection("college")}}
          >College</li>
          <li
          className={`${universityActive} w-16 px-0.5 py-1.5 center text-xs cursor-pointer md:text-xs`}
          onClick = {()=>{setFilterSection("university")}}
          >University</li>
              
          {/* Disabling the Option Location right now,
          We'll work on it after few more features */}
          {/* <li
          className={`${locationActive} w-16 px-0.5 py-1.5 center text-xs cursor-pointer md:text-xs`}
          onClick = {()=>{setFilterSection("location")}}
          >Location</li> */}

        </ul>

      <form id="search-box" className="mb-4 relative flex flex-col items-start gap-3 z-20" onSubmit={handleSubmit}>

        <div className="h-32 w-full px-16 center rounded-se-2xl rounded-b-2xl bg-main-background relative gap-4">
          {/* Select option according to the section */}
          <SectionComponent form={form} setForm={setForm}/>

          {/* Select for skill */}
        <Select 
          options = {skillsOption}
          styles={selectBoxStyle()}
          placeholder="Select Skill"
          onChange={(selectedOption) => setForm({ ...form, skill: selectedOption.value })} // Update form state
          />
          <button
            type="submit"
            className="ml-1 p-2 center rounded-md cursor-pointer right-2 bg-theme-darker"
            >
            <Search />
          </button>
        </div>
      </form>
    </>
  );
}

export default FilterBox;



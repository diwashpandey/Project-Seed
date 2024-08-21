import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import Search from "../Icons/search";

// Additional imports
import { topProfiles } from "../../utilities/frontendRoutes";

function SearchBox() {
  const [form, setForm] = useState({
    get_from: "college",
    name: ""
  });

  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submit behavior

    const queryParams = new URLSearchParams(form).toString(); // Convert form state to query params
    navigate(`/${topProfiles}?${queryParams}`); // Navigate to the new URL with query params
  };

  return (
    <form id="search-box" className="relative flex flex-col items-start my-5 gap-3" onSubmit={handleSubmit}>
      <ul className="grid gap-1 grid-cols-2">
        <li>
          <input
            type="radio"
            id="college-radio"
            name="get_from"
            value="college"
            className="hidden peer"
            required
            defaultChecked
            onChange={(e) => setForm({ ...form, get_from: e.target.value })}
          />
          <label
            htmlFor="college-radio"
            className="inline-flex items-center justify-between p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-orange-500 peer-checked:border-orange-600 peer-checked:text-orange-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <p>College</p>
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="university-radio"
            name="get_from"
            value="university"
            className="hidden peer"
            required
            onChange={(e) => setForm({ ...form, get_from: e.target.value })}
          />
          <label
            htmlFor="university-radio"
            className="inline-flex items-center justify-between p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-orange-500 peer-checked:border-orange-600 peer-checked:text-orange-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <p>University</p>
          </label>
        </li>
      </ul>

      <div className="relative flex">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="bg-theme-lighter h-8 pl-4 w-60 rounded-md focus-visible:outline-none sm:w-96 md:w-96"
          placeholder="Search for college or university"
        />
        <button
          type="submit"
          className="ml-1 h-8 w-8 center rounded-md cursor-pointer right-2 bg-theme-darker"
        >
          <Search />
        </button>
      </div>
    </form>
  );
}

export default SearchBox;

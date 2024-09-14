import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "react-query";
import Creatable from 'react-select/creatable';
import FormFoundation from "../../FormFoundations/FormFoundation";
import { resetSettingsFormNumber } from "../../../../reduxStore/features/Settings/settingsFormNumberSlice";
import { updateSkillsFetcher } from "../../../../fetchers/Settings/ProfileSection/updateSkillsFetcher";
import { fetchSkillsList } from "../../../../fetchers/Settings/ProfileSection/fetchSkillsLists";

function UpdateSkillsForm({ formTitle, description }) {
    // Fetch current user's skills from Redux store
    const user = useSelector((states) => states.userReducer);
    
    // Initialize selectedSkills state with the user's existing skills (if any)
    const initialSkills = (user.data?.skills || []).map(skill => ({
        value: skill.name,
        label: skill.name
    }));
    const [selectedSkills, setSelectedSkills] = useState(initialSkills); // State for selected skills
    const [errorMessage, setErrorMessage] = useState(""); // Error message for form submission
    const [skillOptions, setSkillOptions] = useState([]); // List of all available skills fetched from the backend

    const dispatch = useDispatch(); // To dispatch Redux actions

    // Fetch available skills using react-query, which are options users can choose from
    const { data: skillsData, error: skillsError } = useQuery({
        queryKey: 'skillsList',
        queryFn: fetchSkillsList, // Fetch skills from backend
        onSuccess: (data) => {
            const options = data.map(skill => ({
                value: skill.name,
                label: skill.name
            }));
            setSkillOptions(options); // Update available skill options on success
        },
        onError: () => {
            setErrorMessage("Error fetching skills list."); // Handle fetch errors
        }
    });

    // Mutation for handling form submission (skill updates)
    const mutation = useMutation(updateSkillsFetcher, {
        onSuccess: () => {
            dispatch(resetSettingsFormNumber()); // Reset form state after successful submission
        },
        onError: () => {
            setErrorMessage("There was an issue processing your request."); // Handle submission errors
        },
    });

    // Function to handle changes in selected skills (when user selects or removes a skill)
    const handleChange = (selected) => {
        setSelectedSkills(selected); // Update state with the selected skills
    };

    // Function to handle creation of new skills (when user types in a new skill not in the list)
    const handleCreate = (inputValue) => {
        const newSkill = {
            value: inputValue,
            label: inputValue
        };

        // Add new skill to both selected skills and available options
        setSkillOptions(prevOptions => [...prevOptions, newSkill]);
        setSelectedSkills(prevSkills => [...prevSkills, newSkill]);
    };

    // Function to handle form submission
    const submitHandler = (e) => {
        e.preventDefault(); // Prevent default form submission
        setErrorMessage(""); // Clear previous error messages

        if (selectedSkills.length === 0) {
            setErrorMessage("Please select at least one skill."); // Show error if no skill selected
            return;
        }

        const skillValues = selectedSkills.map(skill => skill.value); // Extract only the skill values (not labels)

        mutation.mutate({ skills: skillValues }); // Submit the selected skills to the backend
    };

    // Filter out selected skills from the available options, so they don't show up again
    const availableOptions = skillOptions.filter(
        option => !selectedSkills.some(selected => selected.value === option.value)
    );

    return (
        <FormFoundation
            formTitle={formTitle} // Title of the form
            description={description} // Description of the form
            error={errorMessage} // Error message (if any)
        >
            <form onSubmit={submitHandler} className="pb-14 pt-4 w-[26rem]">
                <Creatable
                    isMulti // Allow selecting multiple options
                    value={selectedSkills} // Currently selected skills
                    onChange={handleChange} // Handle skill selection changes
                    onCreateOption={handleCreate} // Handle creating new skills
                    options={availableOptions}  // Display only available (non-selected) options
                    placeholder="Select or add your skills" // Placeholder text
                    className="w-full"
                    classNamePrefix="react-select" // CSS class prefix for styling
                    styles={selectStyle()} // Apply custom styles defined in the selectStyle function
                />

                <button
                    type="submit"
                    className="btn-white-filled mt-4 float-right"
                    disabled={mutation.isLoading} // Disable button if mutation is in progress
                >
                    Save
                </button>
            </form>
        </FormFoundation>
    );
}

export default UpdateSkillsForm;

// Custom styling for the react-select component
function selectStyle() {
    const customStyles = {
        container: (provided) => ({
            ...provided,
            width: '100%',
        }),
        control: (provided) => ({
            ...provided,
            backgroundColor: 'var(--lighter-or-lower-color)',
            border: 'none',
            boxShadow: 'none',
            borderRadius: '0.75rem',
            '&:hover': {
                border: 'none',
            },
            '&:focus': {
                outline: 'none',
            },
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: 'var(--lighter-or-lower-color)',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }),
        menuList: (provided) => ({
            ...provided,
            padding: '0',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? 'var(--main-boxes-color)' : 'var(--lighter-or-lower-color)',
            color: 'var(--theme-text-color)',
            fontWeight: '200',
            '&:hover': {
                backgroundColor: 'var(--main-boxes-color)',
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'var(--theme-text-color)',
            fontWeight: '200',
        }),
        placeholder: (provided) => ({
            ...provided,
            color: 'var(--theme-text-color)',
            fontWeight: '200',
        }),
    };

    return customStyles; // Return custom styles for react-select
}

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "react-query";
import Creatable from 'react-select/creatable';
import FormFoundation from "../../FormFoundations/FormFoundation";
import { resetSettingsFormNumber } from "../../../../reduxStore/features/Settings/settingsFormNumberSlice";
import { updateInterestsFetcher } from "../../../../fetchers/Settings/ProfileSection/updateInterestsFetcher";
import { fetchInterestsList } from "../../../../fetchers/Settings/ProfileSection/fetchInterestsList";

function UpdateInterestsForm({ formTitle, description }){
    // Fetch current user's interests from Redux store
    const user = useSelector((states) => states.userReducer);

    // Initialize selectedInterests state with the user's existing interests (if any)
    const initialInterests = (user.data?.interests || []).map(interest => ({
        value: interest.name,
        label: interest.name
    }));
    const [selectedInterests, setSelectedInterests] = useState(initialInterests); // State for selected interests
    const [errorMessage, setErrorMessage] = useState(""); // Error message for form submission
    const [interestOptions, setInterestOptions] = useState([]); // List of all available interests fetched from the backend

    const dispatch = useDispatch(); // To dispatch Redux actions

    // Fetch available interests using react-query, which are options users can choose from
    const { data: interestsData, error: interestsError } = useQuery({
        queryKey: 'interestsList',
        queryFn: fetchInterestsList, // Fetch interests from backend
        onSuccess: (data) => {
            const options = data.map(interest => ({
                value: interest.name,
                label: interest.name
            }));
            setInterestOptions(options); // Update available interest options on success
        },
        onError: () => {
            setErrorMessage("Error fetching interests list."); // Handle fetch errors
        }
    });

    // Mutation for handling form submission (interest updates)
    const mutation = useMutation(updateInterestsFetcher, {
        onSuccess: () => {
            dispatch(resetSettingsFormNumber()); // Reset form state after successful submission
        },
        onError: () => {
            setErrorMessage("There was an issue processing your request."); // Handle submission errors
        },
    });

    // Function to handle changes in selected interests (when user selects or removes an interest)
    const handleChange = (selected) => {
        setSelectedInterests(selected); // Update state with the selected interests
    };

    // Function to handle creation of new interests (when user types in a new interest not in the list)
    const handleCreate = (inputValue) => {
        const newInterest = {
            value: inputValue,
            label: inputValue
        };

        // Add new interest to both selected interests and available options
        setInterestOptions(prevOptions => [...prevOptions, newInterest]);
        setSelectedInterests(prevInterests => [...prevInterests, newInterest]);
    };

    // Function to handle form submission
    const submitHandler = (e) => {
        e.preventDefault(); // Prevent default form submission
        setErrorMessage(""); // Clear previous error messages

        if (selectedInterests.length === 0) {
            setErrorMessage("Please select at least one interest."); // Show error if no interest selected
            return;
        }

        const interestValues = selectedInterests.map(interest => interest.value); // Extract only the interest values (not labels)

        mutation.mutate({ interests: interestValues }); // Submit the selected interests to the backend
    };

    // Filter out selected interests from the available options, so they don't show up again
    const availableOptions = interestOptions.filter(
        option => !selectedInterests.some(selected => selected.value === option.value)
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
                    value={selectedInterests} // Currently selected interests
                    onChange={handleChange} // Handle interest selection changes
                    onCreateOption={handleCreate} // Handle creating new interests
                    options={availableOptions}  // Display only available (non-selected) options
                    placeholder="Select or add your interests" // Placeholder text
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

export default UpdateInterestsForm;

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

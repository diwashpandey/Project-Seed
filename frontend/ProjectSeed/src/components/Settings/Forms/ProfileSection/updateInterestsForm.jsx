import { useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "react-query";
import Select from "react-select";
import FormFoundation from "../../FormFoundations/FormFoundation";
import { resetSettingsFormNumber } from "../../../../reduxStore/features/Settings/settingsFormNumberSlice";
import { updateInterestsFetcher } from "../../../../fetchers/Settings/ProfileSection/updateInterestsFetcher";

const interestOptions = [
    { value: "gaming", label: "Gaming" },
    { value: "coding", label: "Coding" },
    { value: "reading", label: "Reading" },
    { value: "traveling", label: "Traveling" },
    { value: "music", label: "Music" },
    // Add more interests as needed
];

function UpdateInterestsForm({ formTitle, description, initialInterests }) {
    const [selectedInterests, setSelectedInterests] = useState(initialInterests || []);
    const [errorMessage, setErrorMessage] = useState("");

    const dispatch = useDispatch();

    const mutation = useMutation(updateInterestsFetcher, {
        onSuccess: () => {
            dispatch(resetSettingsFormNumber());
            console.log("Interests updated successfully");
        },
        onError: () => {
            setErrorMessage("There was an issue processing your request.");
        },
    });

    const submitHandler = (e) => {
        e.preventDefault();
        setErrorMessage(""); // Clear previous errors

        if (selectedInterests.length === 0) {
            setErrorMessage("Please select at least one interest.");
            return;
        }

        const interestValues = selectedInterests.map(interest => interest.value);

        mutation.mutate({ interests: interestValues });
    };

    return (
        <FormFoundation
            formTitle={formTitle}
            description={description}
            error={errorMessage}
        >
            <form onSubmit={submitHandler} className="pb-14 pt-4 w-[26rem]">
                <Select
                    isMulti
                    value={selectedInterests}
                    onChange={setSelectedInterests}
                    options={interestOptions}
                    placeholder="Select your interests"
                    className="w-full"
                    classNamePrefix="react-select"
                    styles={selectStyle()}
                />

                <button
                    type="submit"
                    className="btn-white-filled mt-4 float-right"
                    disabled={mutation.isLoading}
                >
                    Save
                </button>
            </form>
        </FormFoundation>
    );
}

export default UpdateInterestsForm;

function selectStyle(){
    const customStyles = {
      container: (provided) => ({
        ...provided,
        width: '100%', // Set width to 100%
      }),
      control: (provided) => ({
        ...provided,
        backgroundColor: 'var(--lighter-or-lower-color)', // Clean background
        border: 'none', // Remove border
        boxShadow: 'none', // Remove shadow
        borderRadius: '0.75rem', // Rounded-xl equivalent
        '&:hover': {
          border: 'none', // Remove border on hover
        },
        '&:focus': {
          outline: 'none', // Remove focus outline
        },
      }),
      menu: (provided) => ({
        ...provided,
        backgroundColor: 'var(--lighter-or-lower-color)', // Dropdown background
        borderRadius: '0.75rem', // Rounded-xl equivalent
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }),
      menuList: (provided) => ({
        ...provided,
        padding: '0',
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? 'var(--main-boxes-color)' : 'var(--lighter-or-lower-color)', // bg-main-box on hover
        color: 'var(--theme-text-color)', // Text color
        fontWeight: '200', // font-extralight
        '&:hover': {
          backgroundColor: 'var(--main-boxes-color)', // bg-main-box on hover
        },
      }),
      singleValue: (provided) => ({
        ...provided,
        color: 'var(--theme-text-color)', // Text color for selected value
        fontWeight: '200', // font-extralight
      }),
      placeholder: (provided) => ({
        ...provided,
        color: 'var(--theme-text-color)', // Text color for placeholder
        fontWeight: '200', // font-extralight
      }),
    };
  
    return customStyles;
}

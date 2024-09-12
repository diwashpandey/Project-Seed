import { useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "react-query";
import Select from "react-select";
import FormFoundation from "../../FormFoundations/FormFoundation";
import { updateLocationFetcher } from "../../../../fetchers/Settings/ProfileSection/updateLocationFetcher";
import { resetSettingsFormNumber } from "../../../../reduxStore/features/Settings/settingsFormNumberSlice";

const countryOptions = [
    { value: "nepal", label: "Nepal" },
    { value: "india", label: "India" },
    { value: "usa", label: "USA" },
    { value: "uk", label: "UK" },
    // Add more countries as needed
];

function UpdateLocationForm({ formTitle, description, currentLocation }) {
    const [selectedCountry, setSelectedCountry] = useState(currentLocation?.country || "");
    const [state, setState] = useState(currentLocation?.state || "");
    const [city, setCity] = useState(currentLocation?.city || "");
    const [errorMessage, setErrorMessage] = useState("");

    const dispatch = useDispatch();

    const mutation = useMutation(updateLocationFetcher, {
        onSuccess: () => {
            dispatch(resetSettingsFormNumber());
        },
        onError: () => {
            setErrorMessage("There was an issue processing your request.");
        },
    });

    const submitHandler = (e) => {
        e.preventDefault();
        setErrorMessage(""); // Clear previous errors

        if (!selectedCountry || !state || !city) {
            setErrorMessage("All fields are required.");
            return;
        }

        mutation.mutate({ country: selectedCountry, state, city });
    };

    return (
        <FormFoundation
            formTitle={formTitle}
            description={description}
            error={errorMessage}
        >
            <form onSubmit={submitHandler} className="flex flex-col">
                <Select
                    value={{ label: selectedCountry, value: selectedCountry }}
                    onChange={(option) => setSelectedCountry(option?.value || "")}
                    options={countryOptions}
                    placeholder="Select your country"
                    className="w-full mb-4"
                    classNamePrefix="react-select"
                    styles={selectStyle()}
                />

                <div className="flex space-x-4 mb-4">
                    <input
                        type="text"
                        placeholder="State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="bg-theme-lighter w-full h-14 p-4 rounded-2xl font-light placeholder:font-extralight focus-visible:outline-none"
                        required
                    />
                    <input
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="bg-theme-lighter w-full h-14 p-4 rounded-2xl font-light placeholder:font-extralight focus-visible:outline-none"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn-white-filled"
                    disabled={mutation.isLoading}
                >
                    Save
                </button>
            </form>
        </FormFoundation>
    );
}

export default UpdateLocationForm;

function selectStyle() {
    return {
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
}

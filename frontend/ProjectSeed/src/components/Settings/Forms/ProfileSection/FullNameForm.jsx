import { useDispatch, useSelector } from "react-redux"
import { resetSettingsFormNumber } from "../../../../reduxStore/features/Settings/settingsFormNumberSlice"
import { useState } from "react";
import { useMutation } from "react-query";
import FormFoundation from "../../FormFoundations/FormFoundation";
import { updateFirstAndLastNameFetcher } from "../../../../fetchers/Settings/ProfileSection/updateFirstAndLastNameFetcher";
import { updateUserData } from "../../../../reduxStore/features/Authentication/userSlice";

function FullNameForm({ formTitle, description }) {
  const user = useSelector((states)=>states.userReducer)
  const [firstName, setFirstName] = useState(user.data?.first_name || "");
  const [lastName, setLastName] = useState(user.data?.last_name || "");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch()

  const mutation = useMutation(updateFirstAndLastNameFetcher, {
    onSuccess: () => {
      dispatch(updateUserData({
        "first_name":firstName,
        "last_name":lastName,
        "full_name": `${firstName} ${lastName}`}))
      dispatch(resetSettingsFormNumber())
    },
    onError: (error) => {
      setErrorMessage("There was some problem !!");
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors

    if (!firstName || !lastName) {
      setErrorMessage("Full Name Should Be Entered");
      return;
    }
    mutation.mutate({ firstName, lastName });
  };

  return (
    <FormFoundation 
      formTitle={formTitle} 
      description={description} 
      error={errorMessage} // Pass error to FormFoundation
    >
      <form onSubmit={submitHandler} className="flex flex-col">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          maxLength={24}
          className="bg-theme-lighter h-12 w-full mb-5 p-4 rounded-2xl font-light placeholder:font-extralight focus-visible:outline-none"
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          maxLength={24}
          className="bg-theme-lighter h-12 w-full p-4 rounded-2xl font-light placeholder:font-extralight focus-visible:outline-none"
          required
        />

        <button
          type="submit"
          className="btn-white-filled absolute bottom-3 right-3"
          disabled={mutation.isLoading}
        >
          Save
        </button>
      </form>
    </FormFoundation>
  );
}

export default FullNameForm;

import { useState } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import FormFoundation from "../../FormFoundations/FormFoundation";
import { updateIntroURLFetcher } from "../../../../fetchers/Settings/ProfileSection/updateIntroFetcher";
import { resetSettingsFormNumber } from "../../../../reduxStore/features/Settings/settingsFormNumberSlice";
import { updateUserData } from "../../../../reduxStore/features/Authentication/userSlice";

function UpdateIntroForm({ formTitle, description, currentValue }) {
  const [intro, setIntro] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const mutation = useMutation(updateIntroURLFetcher, {
    onSuccess: () => {
      dispatch(updateUserData({"intro":intro}))
      dispatch(resetSettingsFormNumber());
    },
    onError: (error) => {
      setErrorMessage(error.message || "There was some problem !!");
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors

    if (!intro.trim()) {
      setErrorMessage("Intro should not be empty");
      return;
    }

    mutation.mutate(intro);
  };

  return (
    <FormFoundation 
      formTitle={formTitle} 
      description={description} 
      error={errorMessage} 
    >
      <form onSubmit={submitHandler} className="flex flex-col">
        <textarea
          placeholder="Enter your new intro..."
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          maxLength={100}
          className="bg-theme-lighter h-24 w-full mb-5 p-4 rounded-2xl font-light resize-none placeholder:font-extralight focus-visible:outline-none"
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

export default UpdateIntroForm;

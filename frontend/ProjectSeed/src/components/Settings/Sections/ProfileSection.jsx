import FullNameForm from "../Forms/ProfileSection/FullNameForm"
import UpdateIntroForm from "../Forms/ProfileSection/UpdateIntroForm"
import OptionStandard from "../OptionBoxes/OptionStandard"
import { useSelector } from "react-redux"

function ProfileSection() {

  const user = useSelector((states)=>states.userReducer)

  const Options = [
    {
        "optionTitle": "Full Name",
        "description": "Set or change your display name",
        "currentValue": user.data?.full_name,  // remove the question mark later
        "optionNumber": 2.1,
        "OptionForm": FullNameForm
    },
    {
        "optionTitle": "Profile Picture",
        "description": "Upload or change your profile image",
        "currentValue": user.data?.profile_photo,  // remove the question mark later
        "optionNumber": 2.2,
        "OptionForm": ()=>null
    },
    {
        "optionTitle": "Intro",
        "description": "Write a short intro about yourself",
        "currentValue": user.data?.intro,  // remove the question mark later
        "optionNumber": 2.3,
        "OptionForm": UpdateIntroForm
    },
    {
        "optionTitle": "About me",
        "description": "Write something that explains you",
        "currentValue": user.data?.about_me,  // remove the question mark later
        "optionNumber": 2.3,
        "OptionForm": ()=>null
    },
    {
        "optionTitle": "Location",
        "description": "Update your location details",
        "currentValue": user.data?.location,  // remove the question mark later
        "optionNumber": 2.4,
        "OptionForm": ()=>null
    },
    {
        "optionTitle": "Website",
        "description": "Add a personal website or blog link",
        "currentValue": "user.data?.website",  // remove the question mark later
        "optionNumber": 2.5,
        "OptionForm": ()=>null
    },
    {
        "optionTitle": "Interests",
        "description": "List your interests for better social interactions",
        "currentValue": "user.data?.interests",  // remove the question mark later
        "optionNumber": 2.6,
        "OptionForm": ()=>null
    },
    {
        "optionTitle": "Visibility",
        "description": "Control who can see your profile",
        "currentValue": "user.data?.visibility",  // remove the question mark later
        "optionNumber": 2.7,
        "OptionForm": ()=>null
    }
  ]

  return (
    <>
      {Options.map((option, index) => (
        <OptionStandard 
          key={index}

          optionTitle={option.optionTitle} 
          description={option.description}
          currentValue={option.currentValue}
          optionNumber={option.optionNumber}
          OptionForm={option.OptionForm}
        />
      ))}
    </>
  )
}

export default ProfileSection
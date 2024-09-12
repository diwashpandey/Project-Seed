import FullNameForm from "../Forms/ProfileSection/FullNameForm"
import UpdateAboutMeForm from "../Forms/ProfileSection/UpdateAboutMeForm"
import UpdateBackgroundPhotoForm from "../Forms/ProfileSection/UpdateBackgroundPhotoForm"
import UpdateIntroForm from "../Forms/ProfileSection/UpdateIntroForm"
import UpdateProfilePhotoForm from "../Forms/ProfileSection/UpdateProfilePhotoForm"
import OptionBoxHandler from "../OptionBoxes/OptionBoxHandler"
import { useSelector } from "react-redux"
import UpdateSkillsForm from "../Forms/ProfileSection/UpdateSkillsForm"
import UpdateInterestsForm from "../Forms/ProfileSection/updateInterestsForm"
import UpdateLocationForm from "../Forms/ProfileSection/UpdateLocationForm"

function ProfileSection() {

  const user = useSelector((states)=>states.userReducer)

  const Options = [
    {
      "type": "header",
      "title":"Basic info"
    },
    {
      "type": "option",
      "optionTitle": "Full Name",
      "description": "Set or change your display name",
      "currentValue": user.data?.full_name,  // remove the question mark later
      "optionNumber": 2.1,
      "optionType":"standard",
      "OptionForm": FullNameForm
    },
    {
      "type": "option",
      "optionTitle": "Intro",
      "description": "Write a short intro about yourself",
      "currentValue": user.data?.intro,  // remove the question mark later
      "optionNumber": 2.2,
      "optionType":"standard",
      "OptionForm": UpdateIntroForm
    },
    {
      "type": "option",
      "optionTitle": "About me",
      "description": "Write something that explains you",
      "currentValue": user.data?.about_me?.slice(0,30),  // remove the question mark later
      "optionNumber": 2.3,
      "optionType":"standard",
      "OptionForm": UpdateAboutMeForm
    },
    {
      "type": "header",
      "title":"Photos"
    },
    {
      "type": "option",
      "optionTitle": "Profile Picture",
      "description": "Make it easier for people to recognize you",
      "currentValue": user.data?.profile_photo,  // remove the question mark later
      "optionNumber": 2.4,
      "optionType":"photo",
      "OptionForm": UpdateProfilePhotoForm
    },
    {
      "type": "option",
      "optionTitle": "Background Picture",
      "description": "Add something more stuffs about you",
      "currentValue": user.data?.background_photo,  // remove the question mark later
      "optionNumber": 2.5,
      "optionType":"photo",
      "OptionForm": UpdateBackgroundPhotoForm
    },
    {
      "type": "Header",
      "title":"Skills and Interests"
    },
    {
      "type": "option",
      "optionTitle": "Skills",
      "description": "List your skills for better social interactions",
      "currentValue": "user.data?.skills",  // remove the question mark later
      "optionNumber": 2.7,
      "optionType":"select",
      "OptionForm": UpdateSkillsForm
    },
    {
      "type": "option",
      "optionTitle": "Interests",
      "description": "List your interests for better social interactions",
      "currentValue": "user.data?.interests",  // remove the question mark later
      "optionNumber": 2.8,
      "optionType":"select",
      "OptionForm": UpdateInterestsForm
    },
    {
      "type": "Header",
      "title":"Extra Informations"
    },
    {
      "type": "option",
      "optionTitle": "Location",
      "description": "Update your location details",
      "currentValue": user.data?.location,  // remove the question mark later
      "optionNumber": 2.9,
      "optionType":"standard",
      "OptionForm": UpdateLocationForm
    },
    {
      "type": "option",
      "optionTitle": "Website",
      "description": "Add a personal website or blog link",
      "currentValue": "user.data?.website",  // remove the question mark later
      "optionNumber": 2.10,
      "optionType":"standard",
      "OptionForm": ()=>null
    },
  ]

  return (
    <>
      {Options.map((option, index) => {
          return <OptionBoxHandler option={option} key={index} />
      })} 
    </>
  )
}

export default ProfileSection
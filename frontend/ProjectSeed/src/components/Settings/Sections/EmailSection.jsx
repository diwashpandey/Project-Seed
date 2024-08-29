import UsernameForm from "../Forms/AccountSection/UsernameForm"
import EmailForm from "../Forms/AccountSection/EmailForm"
import OptionStandard from "../OptionBoxes/OptionStandard"
import { useSelector } from "react-redux"

function EmailSection() {
  const user = useSelector((states)=>states.userReducer)

  const Options =  [
    {
        "optionTitle": "Email Address",
        "description": "Update or change your email address",
        "currentValue": "user.data?.emailAddress",  // remove the question mark later
        "optionNumber": 6.1,
        "OptionForm": "EmailAddressForm"
    },
    {
        "optionTitle": "Email Frequency",
        "description": "Set how often you receive emails",
        "currentValue": "user.data?.emailFrequency",  // remove the question mark later
        "optionNumber": 6.2,
        "OptionForm": "EmailFrequencyForm"
    },
    {
        "optionTitle": "Email Content Preferences",
        "description": "Choose what kind of content you want to receive",
        "currentValue": "user.data?.emailContentPreferences",  // remove the question mark later
        "optionNumber": 6.3,
        "OptionForm": "EmailContentPreferencesForm"
    },
    {
        "optionTitle": "Unsubscribe Options",
        "description": "Easily unsubscribe from unwanted emails",
        "currentValue": null,
        "optionNumber": 6.4,
        "OptionForm": "() => null"
    },
    {
        "optionTitle": "Email Notification Settings",
        "description": "Fine-tune your email notification preferences",
        "currentValue": "user.data?.emailNotificationSettings",  // remove the question mark later
        "optionNumber": 6.5,
        "OptionForm": "EmailNotificationSettingsForm"
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

export default EmailSection
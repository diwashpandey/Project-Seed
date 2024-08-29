import UsernameForm from "../Forms/AccountSection/UsernameForm"
import EmailForm from "../Forms/AccountSection/EmailForm"
import OptionStandard from "../OptionBoxes/OptionStandard"
import { useSelector } from "react-redux"

function SecuritySection() {
  const user = useSelector((states)=>states.userReducer)
  const Options =  [
          {
              "optionTitle": "Two-Factor Authentication (2FA)",
              "description": "Enable extra security for your account",
              "currentValue": "user.data?.twoFactorAuth",  // remove the question mark later
              "optionNumber": 3.1,
              "OptionForm": "TwoFactorAuthForm"
          },
          {
              "optionTitle": "Login Activity",
              "description": "View recent login history and activity",
              "currentValue": null,
              "optionNumber": 3.2,
              "OptionForm": "() => null"
          },
          {
              "optionTitle": "Security Questions",
              "description": "Set up or change security questions for account recovery",
              "currentValue": "user.data?.securityQuestions",  // remove the question mark later
              "optionNumber": 3.3,
              "OptionForm": "SecurityQuestionsForm"
          },
          {
              "optionTitle": "Change Password",
              "description": "Update your password regularly",
              "currentValue": null,
              "optionNumber": 3.4,
              "OptionForm": "ChangePasswordForm"
          },
          {
              "optionTitle": "Recent Devices",
              "description": "See devices that recently accessed your account",
              "currentValue": null,
              "optionNumber": 3.5,
              "OptionForm": () => null
          },
          {
              "optionTitle": "Trusted Devices",
              "description": "Manage devices trusted to access your account",
              "currentValue": null,
              "optionNumber": 3.6,
              "OptionForm": () => null
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

export default SecuritySection
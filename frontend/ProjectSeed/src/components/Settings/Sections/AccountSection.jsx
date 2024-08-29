import UsernameForm from "../Forms/AccountSection/UsernameForm"
import EmailForm from "../Forms/AccountSection/EmailForm"
import OptionStandard from "../OptionBoxes/OptionStandard"
import { useSelector } from "react-redux"

function AccountSection() {
  const user = useSelector((states)=>states.userReducer)

  const Options =  [
        {
            "optionTitle": "Username",
            "description": "Change or update your username",
            "currentValue":user.data?.username,  // remove the question mark later
            "optionNumber":1.1,
            "OptionForm":UsernameForm // Passing the function without calling to prevent the multiple rerenders
        },
        {
            "optionTitle": "Email",
            "description": "Manage the email linked to your account",
            "currentValue":user.data?.email,  // remove the question mark later
            "optionNumber":1.2,
            "OptionForm":EmailForm
        },
        {
            "optionTitle": "Linked Accounts",
            "description": "Connect or disconnect accounts like Google or Facebook",
            "currentValue":null,
            "optionNumber":1.3,
            "OptionForm":()=>null
        },
        {
            "optionTitle": "Deactivate Account",
            "description": "Temporarily deactivate your account",
            "optionNumber":1.4,
            "OptionForm":()=>null
        },
        {
            "optionTitle": "Delete Account",
            "description": "Permanently delete your account",
            "optionNumber":1.5,
            "OptionForm":()=>null
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

export default AccountSection
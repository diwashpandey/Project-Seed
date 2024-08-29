import UsernameForm from "../Forms/AccountSection/UsernameForm"
import EmailForm from "../Forms/AccountSection/EmailForm"
import OptionStandard from "../OptionBoxes/OptionStandard"
import { useSelector } from "react-redux"

function NotificationSection() {
  const user = useSelector((states)=>states.userReducer)

  const Options =  [
        {
            "optionTitle": "Push Notifications",
            "description": "Manage notifications sent to your device",
            "currentValue": "user.data?.pushNotifications",  // remove the question mark later
            "optionNumber": 5.1,
            "OptionForm": "PushNotificationsForm"
        },
        {
            "optionTitle": "Email Notifications",
            "description": "Control which notifications you receive via email",
            "currentValue": "user.data?.emailNotifications",  // remove the question mark later
            "optionNumber": 5.2,
            "OptionForm": "EmailNotificationsForm"
        },
        {
            "optionTitle": "SMS Notifications",
            "description": "Set up text message notifications",
            "currentValue": "user.data?.smsNotifications",  // remove the question mark later
            "optionNumber": 5.3,
            "OptionForm": "SMSNotificationsForm"
        },
        {
            "optionTitle": "Notification Sound",
            "description": "Choose a sound for notifications",
            "currentValue": "user.data?.notificationSound",  // remove the question mark later
            "optionNumber": 5.4,
            "OptionForm": "NotificationSoundForm"
        },
        {
            "optionTitle": "Notification Schedule (Do Not Disturb)",
            "description": "Schedule quiet hours for notifications",
            "currentValue": "user.data?.notificationSchedule",  // remove the question mark later
            "optionNumber": 5.5,
            "OptionForm": "NotificationScheduleForm"
        },
        {
            "optionTitle": "Notification Preferences",
            "description": "Customize notifications for likes, comments, follows, etc.",
            "currentValue": "user.data?.notificationPreferences",  // remove the question mark later
            "optionNumber": 5.6,
            "OptionForm": "NotificationPreferencesForm"
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

export default NotificationSection
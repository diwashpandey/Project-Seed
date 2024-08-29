import UsernameForm from "../Forms/AccountSection/UsernameForm"
import EmailForm from "../Forms/AccountSection/EmailForm"
import OptionStandard from "../OptionBoxes/OptionStandard"
import { useSelector } from "react-redux"

function PrivacySection() {
  const user = useSelector((states)=>states.userReducer)

  const Options =  [
          {
              "optionTitle": "Profile Visibility",
              "description": "Decide who can see your profile",
              "currentValue": "user.data?.profileVisibility",  // remove the question mark later
              "optionNumber": 4.1,
              "OptionForm": "ProfileVisibilityForm"
          },
          {
              "optionTitle": "Who Can Send Friend Requests",
              "description": "Set who can send you friend requests",
              "currentValue": "user.data?.friendRequestSetting",  // remove the question mark later
              "optionNumber": 4.2,
              "OptionForm": "FriendRequestSettingForm"
          },
          {
              "optionTitle": "Who Can See Your Friends List",
              "description": "Control visibility of your friends list",
              "currentValue": "user.data?.friendsListVisibility",  // remove the question mark later
              "optionNumber": 4.3,
              "OptionForm": "FriendsListVisibilityForm"
          },
          {
              "optionTitle": "Who Can Comment on Your Posts",
              "description": "Manage who can comment on your posts",
              "currentValue": "user.data?.commentSetting",  // remove the question mark later
              "optionNumber": 4.4,
              "OptionForm": "CommentSettingForm"
          },
          {
              "optionTitle": "Blocked Users",
              "description": "View and manage blocked users",
              "currentValue": null,
              "optionNumber": 4.5,
              "OptionForm": "() => null"
          },
          {
              "optionTitle": "Data Sharing Preferences",
              "description": "Control how your data is shared with others",
              "currentValue": "user.data?.dataSharingPreferences",  // remove the question mark later
              "optionNumber": 4.6,
              "OptionForm": "DataSharingPreferencesForm"
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

export default PrivacySection
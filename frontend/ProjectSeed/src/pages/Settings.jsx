// imports from React

// imports from third party libraries
import { useParams, Link } from "react-router-dom"

// Components Import
import AccountSection from "../components/Settings/Sections/AccountSection"
import ProfileSection from "../components/Settings/Sections/ProfileSection"
import SecuritySection from "../components/Settings/Sections/SecuritySection"
import PrivacySection from "../components/Settings/Sections/PrivacySection"
import NotificationSection from "../components/Settings/Sections/NotificationSection"
import EmailSection from "../components/Settings/Sections/EmailSection"

// Additional Import
import { settingsRoute } from "../utilities/frontendRoutes"

function Settings() {
  const {sectionName} = useParams()

  let SectionPage = null;
  let [accountActive, profileActive, securityActive, privacyActive, notificationActive, emailActive] = ["nav-btn","nav-btn","nav-btn","nav-btn","nav-btn","nav-btn"]

  switch (sectionName){
    case "profile":
      SectionPage = ProfileSection
      profileActive = "nav-btn-active"
      break;
    case "security":
      SectionPage = SecuritySection
      securityActive = "nav-btn-active"
      break;
    case "privacy":
      SectionPage = PrivacySection
      privacyActive = "nav-btn-active"
      break;
    case "notification":
      SectionPage = NotificationSection
      notificationActive = "nav-btn-active"
      break;
    case "email":
      SectionPage = EmailSection
      emailActive = "nav-btn-active"
      break;
    default:
      SectionPage = AccountSection
      accountActive = "nav-btn-active"
  }

  return (
      <>
        <main className=" min-h-[100vh] pt-[70px] px-2" >
          
            <div id="main-container" className="h-full w-full px-48 py-12 rounded-t-lg bg-main-box">
                <h1 className="text-4xl mb-8">Settings</h1>
                <ul id="settings-navigation" className="pl-3 flex gap-4 font-light">
                    <li><Link
                       className={`${accountActive} w-20 p-1 center`}
                       to={`${settingsRoute}account`}>Account</Link></li>
                    <li><Link
                       className={`${profileActive} w-20 p-1 center`}
                       to={`${settingsRoute}profile`}>Profile</Link></li>
                    <li><Link
                       className={`${securityActive} w-20 p-1 center`}
                       to={`${settingsRoute}security`}>Security</Link></li>
                    <li><Link
                       className={`${privacyActive} w-20 p-1 center`}
                       to={`${settingsRoute}privacy`}>Privacy</Link></li>
                    <li><Link
                       className={`${notificationActive} w-20 p-1 center`}
                       to={`${settingsRoute}notification`}>Notification</Link></li>
                    <li><Link
                       className={`${emailActive} w-20 p-1 center`}
                       to={`${settingsRoute}email`}>Email</Link></li>
                </ul>
                <section className="bg-main-background min-h-96 w-full p-8 pt-10 flex flex-col rounded-lg items-center gap-2">
                    <SectionPage />
                </section>
            </div>
        </main>
      </>
    )
}

export default Settings
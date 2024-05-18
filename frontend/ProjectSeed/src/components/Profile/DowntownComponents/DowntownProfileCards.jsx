import { generatePhotoURL } from "../../../utilities/apiEndpoints"

export default function DowntownProfileCards({user}) {
  return (
    <div className="flex">
      <img src={generatePhotoURL(user.profile_photo)} alt="" />
      
    </div>
  )
}

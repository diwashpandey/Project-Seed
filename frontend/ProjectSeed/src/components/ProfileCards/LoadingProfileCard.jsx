export default function LoadingProfileCard() {
  return (
    <div className="w-64 p-2 border border-gray-700 rounded-lg flex items-center animate-pulse sm:w-full md:h-16">
      <div className="profile-photo bg-gray-400 h-8 w-8 mr-2 md:h-12 md:w-12" />
      <div className="flex flex-col gap-2">
        <p className=" bg-gray-400 h-2 w-16 rounded-lg"></p>
        <p className=" bg-gray-400 h-2 w-16 rounded-lg"></p>
      </div>
    </div>
  )
}

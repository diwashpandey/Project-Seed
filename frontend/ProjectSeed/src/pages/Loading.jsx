const Loading = () => {
  return (
    <div className="h-screen w-screen bg-main-background center flex-col">
      <p>Loading...</p>
      <h1 className='font-extralight text-theme-color text-6xl'>Project Seed</h1>

      {/* Rotating bar */}
      <div className="flex justify-center items-center mt-10">
        <div className="rounded-full border-t-4 border-orange-600 h-12 w-12 animate-spin"></div>
      </div>
    </div>
  )
}

export default Loading

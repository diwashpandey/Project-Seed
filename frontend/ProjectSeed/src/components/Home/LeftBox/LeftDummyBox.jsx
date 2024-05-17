import React from 'react'

function LeftDummyBox () {
  return (
    <>
        <div id="top-students-box" className="h-auto w-full p-2 bg-main-box ">
            <div className="mb-4 flex flex-col gap-2 items-center">
                <h1 className="text-lg self-start">Top 3 Students</h1>
                <div className='h-28 w-44 bg-gray-400 rounded-2xl animate-pulse'></div>
                <div className='h-20 w-full flex justify-between gap-2'>
                    <div className='h-full w-full bg-gray-400 rounded-2xl animate-pulse'></div>
                    <div className='h-full w-full bg-gray-400 rounded-2xl animate-pulse'></div>
                </div>
            </div>
            <div id="top-1-stu-contiainer" className="center">
                
            </div>
            <div id="top-2-3-stu-container" className="flex justify-around">
            </div>
        </div>
        <div id="top-posts-box" className="h-[80%] w-full p-2 bg-main-box overflow-scroll">
            <div className=" items-end mb-4">
                <h1 className="text-lg mb-2">Top 3 Achievements</h1>
                <div className='h-20 w-full mb-4 bg-gray-400 rounded-2xl animate-pulse'></div>
                <div className='h-20 w-full mb-4 bg-gray-400 rounded-2xl animate-pulse'></div>
                <div className='h-20 w-full mb-4 bg-gray-400 rounded-2xl animate-pulse'></div>
            </div>
        </div>
    </>
  )
}

export default LeftDummyBox

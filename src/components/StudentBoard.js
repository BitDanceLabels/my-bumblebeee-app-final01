import React from 'react'

function StudentBoard({ id, url, name, classname, gender }) {
    return (
        <div className='flex md:flex-col gap-4 md:gap-0 items-center space-y-3 w-full rounded-lg shadow-lg md:rounded-none md:shadow-none md:w-5/6 h-full mx-auto shadow-style p-6 bg-white'>
            <span>{id}</span>
            <img src={url} alt="" className='w-24 h-24 md:w-40 md:h-40 rounded-full object-center object-cover' />
            <div className='flex flex-col w-[18%] md:w-full'>
                <span className="text-center font-bold md:text-xl">{name}</span>
                <span className='color-gray-400 text-center'>{classname}</span>
            </div>
            <div className='hidden md:block'>
                <strong>About</strong>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi eveniet, enim delectus similique totam error cumque quas possimus numquam ea illum obcaecati facilis aut expedita quaerat illo. Sed, unde dolore.</p>
            </div>
            <div className='md:grid md:grid-cols-12'>
                <div className="flex gap-2 md:col-span-6">
                    <strong>Age</strong>
                    <p>17</p>
                </div>
                <div className="flex gap-2 md:col-span-6">
                    <strong>Gender</strong>
                    <p>{gender}</p>
                </div>

            </div>

        </div>
    )
}

export default StudentBoard
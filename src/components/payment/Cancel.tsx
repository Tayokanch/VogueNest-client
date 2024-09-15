import React from 'react'
import { NavLink } from 'react-router-dom'
import unsuccesfulImage from '../../assets/unsuccessful.png'

const Cancel = () => {
  return (
    <div className="w-full">
      <div className="flex justify-center gap-4">
        <div className="flex flex-col gap-5 justify-center">
          <h2 className="text-5xl font-bold">Payment Unsuccessful</h2>
          <NavLink
            to={'/'}
            className="bg-black w-[200px] text-white py-2 px-5 text-center border border-orange-500 rounded-2xl hover:bg-slate-700 hover:transition-all"
          >
            Try again
          </NavLink>
        </div>
        <div>
          <img src={unsuccesfulImage} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Cancel
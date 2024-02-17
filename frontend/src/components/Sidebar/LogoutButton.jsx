import React from 'react'
import {BiLogOut} from 'react-icons/bi';
import useLogout from '../../hooks/useLogout';
const LogoutButton = () => {
  const {logout,loading} = useLogout();
  return (
    <div className='mt-auto flex items-center'>
      {loading ? (<span className='loading loading-spinner'></span>) : (<BiLogOut className='w-8 h-8 text-white cursor-pointer' onClick={logout}/>)}
      <button className='cursor-pointer'>
        <img className='w-7 ml-5' src='jhins.svg' alt=''/>
      </button>
    </div>
  )
}

export default LogoutButton
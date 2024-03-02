import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin';
const Login = () => {
    const { loading, login } = useLogin();
    const [ userName, setUserName ] = useState('');
    const [ password,setPassword ] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(userName,password);
    }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 '>
            <h1 className='text-3xl font-semibold text-center text-gray-300'>
                Login
                <span className='text-orange-300'> Moaz Tello Chat App</span>    
            </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text '>
                            Username
                        </span>
                    </label>
                    <input onChange={(e) => setUserName(e.target.value)} value={userName} type='text' className='w-full input input-bordered h-10' placeholder='Enter Username'/>
                </div>
                <div>
                    <label className='label'>
                        <span className='text-base label-text '>
                            Password
                        </span>
                    </label>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type='password' className='w-full input input-bordered h-10' placeholder='Enter Password'/>
                </div>
                <Link to='/signup' className='text-sm hover:underline hover:text-orange-100 mt-2 inline-block'>
                    {"Don't"} have an account?
                </Link>
                <div>
                    <button onClick={handleSubmit} disabled={loading} className='btn btn-block btn-sm mt-2'>
                        {loading ? <span className='loading loading-spinner'></span> : 'Login'}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
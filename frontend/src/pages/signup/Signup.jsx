import React, { useState } from 'react'
import Gender from './Gender'
import { Link } from 'react-router-dom';
import useSignup from '../../hooks/useSignup';
const Signup = () => {
    const [ inputs,setInputs ] = useState({
        fullName:'',
        userName:'',
        password:'',
        confirmPassword:'',
        gender:'',

    });
    const { loading, signup } = useSignup();
    const handleCheckBoxChange = (gender) => {
        setInputs({...inputs,gender})

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs);
    }
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className='text-3xl font-semibold text-center text-gray-300'>
                SignUp
                <span className='text-orange-300'> Moaz Tello Chat App</span>    
            </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text '>
                            Fullname
                        </span>
                    </label>
                    <input value={inputs.fullName} onChange={(e) => setInputs({...inputs,fullName:e.target.value})} type='text' className='w-full input input-bordered h-10' placeholder='Enter Fullname'/>
                </div>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text '>
                            Username
                        </span>
                    </label>
                    <input value={inputs.userName} onChange={(e) => setInputs({...inputs,userName:e.target.value})} type='text' className='w-full input input-bordered h-10' placeholder='Enter Username'/>
                </div>
                <div>
                    <label className='label'>
                        <span className='text-base label-text '>
                            Password
                        </span>
                    </label>
                    <input value={inputs.password} onChange={(e) => setInputs({...inputs,password:e.target.value})} type='password' className='w-full input input-bordered h-10' placeholder='Enter Password'/>
                </div>
                <div>
                    <label className='label'>
                        <span className='text-base label-text '>
                            Confirm Password
                        </span>
                    </label>
                    <input value={inputs.confirmPassword} onChange={(e) => setInputs({...inputs,confirmPassword:e.target.value})} type='password' className='w-full input input-bordered h-10' placeholder='Enter Confirm Password'/>
                </div>
                <Gender onCheckBoxChange={handleCheckBoxChange} selectedGender={inputs.gender}/>
                <Link to='/login' className='text-sm hover:underline hover:text-orange-100 mt-2 inline-block'>
                    Already have an account?
                </Link>
                <div>
                    <button disabled={loading} type='submit' className='btn btn-block btn-sm mt-2'>
                        {loading ? <span className='loading loading-spinner'></span> : 'Sign Up'}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup
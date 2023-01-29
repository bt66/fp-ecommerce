import React, { useRef, useState } from 'react'
import axios from "axios";
import { Notifications } from 'react-push-notification';
import addNotification from 'react-push-notification';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

function SignUp() {
    const navigate = useNavigate();
    const loadingRef = useRef();
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: ""
    })
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setUserData((prevProps) => ({
            ...prevProps,
            [name]: value
        }))
    }

    const handleSubmit = (event) => {
        loadingRef.current.classList.remove('hidden')
        event.preventDefault();
        console.log(userData);
        
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/signup`, 
        userData,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp => {
            console.log(resp)
            loadingRef.current.classList.add('hidden')
            addNotification({
                title: 'Success',
                subtitle: 'Register success',
                message: 'You will be redirect to login page ...',
                theme: 'darkgreen',
                native: false // when using native, your OS will handle theming.
            })
            setTimeout((()=> {
                navigate('/login');
            }), 2000);
        })).catch((error) => {
            loadingRef.current.classList.add('hidden')
            addNotification({
                title: 'Error',
                subtitle: "Register Error",
                message: '!!!!',
                theme: 'red',
                native: false // when using native, your OS will handle theming.
            });
        })
    }

    return (
        <div className='bg-black absolute w-full h-full'>
            <div ref={loadingRef} className="hidden">
                <Loading />
            </div>
            <div className='flex absolute right-0 z-10'>
                <div>
                    {/* <div className='w-10 h-10 bg-green-400'></div> */}
                    <Notifications />
                </div>
            </div>
            <div className='flex flex-col justify-center items-center h-full'>
                <h2 className='text-center font-bold text-primary-color text-xl my-8 sm:text-2xl lg-text-4xl'>CREATE YOUR ACCOUNT</h2>
                <div className='bg-grey rounded-lg w-11/12 max-w-md p-2 sm:p-10 md:p-14'>
                    <div className='w-full h-full'>
                        <form className=''>
                            <div className='flex flex-col justify-center items-center sm:flex-row sm:justify-around'>
                                <input 
                                    type="text" 
                                    name="firstName"
                                    value={userData.firstName}
                                    onChange={handleInputChange}
                                    placeholder='First Name'
                                    className='px-3 mt-4 py-2 rounded-full w-11/12 sm:w-2/5'/>
                                <input 
                                    type="text"
                                    value={userData.lastName}
                                    onChange={handleInputChange}
                                    name="lastName" 
                                    placeholder='Last Name' 
                                    className='px-3 mt-4 py-2 rounded-full w-11/12 sm:w-2/5'/>
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                <input 
                                    type="text" 
                                    name="userName" 
                                    placeholder='Username'
                                    value={userData.userName}
                                    onChange={handleInputChange}
                                    className='px-3 mt-4 py-2 rounded-full w-11/12'/>
                                <input 
                                    type="email" 
                                    name="email" 
                                    placeholder='Email Address' 
                                    value={userData.email}
                                    onChange={handleInputChange}
                                    className='px-3 mt-4 py-2 rounded-full w-11/12'/>
                                <input 
                                    type="password" 
                                    name="password" 
                                    placeholder='Password' 
                                    value={userData.password}
                                    onChange={handleInputChange}
                                    className='px-3 mt-4 py-2 rounded-full w-11/12'/>
                                    <Link to="/login">
                                        <h2 className='mt-5 text-white'>Already have account? <span className='text-primary-color'>Login</span></h2>
                                    </Link>
                                <input 
                                    type="submit" 
                                    value="Submit" 
                                    onClick={handleSubmit}
                                    className='bg-primary-color text-black  px-3 py-2 w-1/2 rounded mt-9'></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default SignUp
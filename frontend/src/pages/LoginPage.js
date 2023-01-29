import React, { useEffect, useRef, useState }  from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Notifications } from 'react-push-notification';
import addNotification from 'react-push-notification';
import Loading from '../components/Loading';


function LoginPage() {
    
    const navigate = useNavigate();
    const loadingRef = useRef();

    const [userData, setUserData] = useState({
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
        event.preventDefault();
        console.log(userData)
        loadingRef.current.classList.remove('hidden')
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, {
            email: `${userData.email}`,
            password: `${userData.password}`
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp => {
            loadingRef.current.classList.add('hidden')
            console.log(resp.data)
            localStorage.setItem('token', resp.data.token);
            localStorage.setItem('username', resp.data.body.username);
            console.log(resp.data.body.username)
            addNotification({
                title: 'Success',
                subtitle: 'Login Success',
                message: 'You will be redirect to Dashboard ...',
                theme: 'darkgreen',
                native: false // when using native, your OS will handle theming.
            })
            setTimeout((()=> {
                if(resp.data.body.role == "admin") {
                    navigate('/admin')
                }else {
                    navigate('/userDashboard');
                }
            }), 1000);
        })).catch((error) => {
            loadingRef.current.classList.add('hidden')
            addNotification({
                title: 'Error',
                subtitle: "Login error",
                message: 'Incorect Email or Password',
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

            <Notifications />
            <div className='flex flex-col justify-center items-center h-full'>
                <h2 className='text-center font-bold text-primary-color text-xl sm:text-2xl lg-text-4xl'>CREATE. MONETIZE. REPEAT.</h2>
                <h3 className='text-center font-bold text-white text-sm mb-7'>Log in to your account to start your first release!</h3>
                <div className='bg-grey rounded-lg w-11/12 max-w-md p-2 sm:p-10 md:p-14'>
                    <div className='w-full h-full'>
                        <form className=''>
                            <div className='flex flex-col justify-center items-center'>
                                <input 
                                    type="email" 
                                    name="email" 
                                    placeholder='Email' 
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
                                <p className='text-white mt-6'>Don't have account? Register <Link to={'/SignUp'}><span><u>here</u></span></Link></p>
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

export default LoginPage
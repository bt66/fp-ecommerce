import React, { useEffect, useState } from 'react';
import LogoSubmitMusik from '../assets/LOGO.svg'
import { BiMenu,BiPlus } from "react-icons/bi";
import { BsBroadcast } from "react-icons/bs";
import MicrophoneLogo from "../assets/Microphone.svg"
import SirrenLogo from "../assets/Siren.svg"
import PlaylistLogo from "../assets/Playlist.svg"
import DiscLogo from "../assets/Disc.svg"
import { Link, useNavigate } from 'react-router-dom';
import { HiLogout } from "react-icons/hi";
import { MdPayment } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";

function Sidebar() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem("token")
        navigate("/")
    }
    return (
        <div className={`${open ? "w-72" : "w-20" } h-screen p-2 sticky top-0`}>
            <div className={`${open ? "w-70" : "w-19" } relative h-full bg-base-grey rounded-xl`}>
                <div className='flex justify-center hover:bg-third-grey'>
                    <img src={LogoSubmitMusik} className="py-6 px-2 "></img>
                </div>

                <div className='flex mt-6 justify-center'>
                    <Link to="/userDashboard">
                        <div className='rounded-md m-1 p-1 hover:bg-third-grey'>
                            <BsBroadcast color="white" size="50px"/>
                        </div>
                    </Link>
                </div>
                <div className='flex bottom-0'>
                    <Link to="/newRelease">
                        <div className='rounded-md m-1 p-1 hover:bg-third-grey'>
                            <BiPlus color="white" size="50px"/>
                        </div>
                    </Link>
                </div>
                <div className='flex bottom-0'>
                    <Link to="/payment">
                        <div className='rounded-md m-1 p-1 hover:bg-third-grey'>
                            <MdPayment color="white" size="50px"/>
                        </div>
                    </Link>
                </div>
                
                <div className='absolute bottom-3 w-full' onClick={handleLogout}>
                    <div className='w-full flex justify-center'>
                        <div className='rounded-md m-1 p-1 hover:bg-third-grey'>
                            <HiLogout color="red" size="50px"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>   
    )
}

export default Sidebar
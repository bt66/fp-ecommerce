import React, { useEffect, useState } from 'react';
import SidebarAdmin from '../../components/SidebarAdmin';
import LogoSubmitMusik from "../../assets/LOGO.svg"
import { BiMenu,BiPlus } from "react-icons/bi";
import { BsBroadcast } from "react-icons/bs";
import MicrophoneLogo from "../../assets/Microphone.svg"
import SirrenLogo from "../../assets/Siren.svg"
import PlaylistLogo from "../../assets/Playlist.svg"
import DiscLogo from "../../assets/Disc.svg"
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';
import { Notifications } from 'react-push-notification';
import addNotification from 'react-push-notification';
import { HiLogout } from "react-icons/hi";
import { MdPayment} from "react-icons/md";

// import component
import UpdateModal from '../../components/UpdateModal';
import { useRef } from 'react';

export const DataContext = React.createContext();

function AdminPage() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [modalIndex, setModalIndex] = useState(1);

    const [fetched, setFeched] = useState(false);
    const[data, setData] = useState([]);
    const updateModalRef = useRef();

    const [updateData, setUpdateData] = useState({
        _id: "",
        plan : "",
        releaseType : "",
        songType: "",
        title: "",
        artistName: "",
        featuringArtistName: "",
        trackList: "",
        primaryGenre: "",
        secondaryGenre: "",
        productionYear: "",
        language: "",
        explicitContent: "",
        tracks: [],
        artWorkFile: ""
    });

    useEffect(() => {
        var config = {
            method: 'get',
            url: `${process.env.REACT_APP_BACKEND_URL}/admin/getAllUser`,
            headers: { 
            'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
        };
        axios(config)
        .then(response => 
            {
                setData(response.data)
                setFeched(true)
                console.log(data)
                
            })
        .catch(function (error) {
            console.log(error)
            // if unauthorized redirect to login
            if(error.response.status == 401){
                navigate("/login");
            }
        })
    },[fetched])

    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem("token")
        navigate("/")
    }

    const handleDelete = (event) => {
        event.preventDefault();
        var config = {
            method: 'delete',
            url: `${process.env.REACT_APP_BACKEND_URL}/content/deleteContent`,
            headers: { 
            'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            data : {"id": updateData._id}
        };
        console.log(updateData._id)
        axios(config)
        .then(response => 
            {
                setFeched(!fetched)
                addNotification({
                    title: 'Success',
                    message: 'Delete data success',
                    theme: 'darkgreen',
                    native: false // when using native, your OS will handle theming.
                });
                updateModalRef.current.classList.add('hidden')
                // console.log(data)
            })
        .catch(function (error) {
            console.log(error)
        })
    }

    const handleOpenModal = ((event, key) => {

        event.preventDefault()
        updateModalRef.current.classList.remove('hidden')

        setModalIndex(key);
        setUpdateData(data[key]);
        setOpenModal(true);
    })
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        console.log(value)
        
        // console.log(event.target.file)
        setUpdateData((prevProps) => ({
            ...prevProps,
            [name]: value
        }))
    }
    const handleCloseModal = ((event) => {
        updateModalRef.current.classList.add('hidden')
        event.preventDefault()
        setOpenModal(false);
    })
    if (localStorage.getItem('token') == undefined){
        navigate("/");
    }else {
        return (
            <div className='z-10 absolute w-screen h-screen bg-black overflow-auto'>
                <Notifications />
                
                
    
                
                {/* main */}
                <div className='flex'>
                    <SidebarAdmin/>
                    
    
                    <div className='h-full w-full px-1 py-3'>
                        <div className='text-white flex justify-between p-5 sticky top-0 bg-black shadow-md'>
                            <p className='text-left p-2'>Admin page</p>
                            <p className='text-right p-2'>Welcome back - {localStorage.getItem("username")}</p>
                        </div>
                        <div className=' text-white rounded-xl p-4'>
                            <h1 className='text-primary-color'>Discography <span className='text-white'>- See all of the music you've uploaded and manage your changes</span></h1>
                            
                            {/* <div className='my-2 flex rounded-full w-full h-10 p-1 border border-fourth-grey bg-third-grey text-white shadow-md'>
                                <div className='flex'>
                                    <div className='flex  justify-center items-center rounded-full p-1 bg-fourth-grey text-black overflow-hidden'>
                                        <p className=''>Action Needed</p>
                                    </div>
                                    <div className='flex justify-center items-center rounded-full p-1 bg-fourth-grey text-black overflow-hidden'>
                                        <p className=''>Action Needed</p>
                                    </div>
                                    <div className='flex justify-center items-center rounded-full p-1 bg-fourth-grey text-black overflow-hidden'>
                                        <p className=''>Action Needed</p>
                                    </div>
                                    <div className='flex justify-center items-center rounded-full p-1 bg-fourth-grey text-black overflow-hidden'>
                                        <p className=''>Action Needed</p>
                                    </div>
                                </div>

                            </div> */}

                            <div className='bg-base-grey rounded-xl'>
                                <div className='flex justify-center w-full'>
                                    <div className='flex flex-col sm:w-9/12'>
                                        {
                                            data.map((item, index) => (
                                                <Link to={`/adminUserContent/${item._id}`}>
                                                    <div className='bg-third-grey m-3' key={item._id}>
                                                        <div className='bg-primary-color text-black rounded-sm py-1 px-2'>
                                                            <p>ID : {item._id}</p>
                                                        </div>
                                                        <div className='p-2 font-bold'>
                                                            <p>Username : {item.userName}</p>
                                                            <p>Email : {item.email}</p>
                                                            <p>First Name : {item.firstName}</p>
                                                            <p>Last Name : {item.lastName}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminPage
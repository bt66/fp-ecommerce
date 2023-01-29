import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import LogoSubmitMusik from '../assets/LOGO.svg'
import { BiMenu,BiPlus } from "react-icons/bi";
import { BsBroadcast } from "react-icons/bs";
import MicrophoneLogo from "../assets/Microphone.svg"
import SirrenLogo from "../assets/Siren.svg"
import PlaylistLogo from "../assets/Playlist.svg"
import DiscLogo from "../assets/Disc.svg"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Notifications } from 'react-push-notification';
import addNotification from 'react-push-notification';

// import component
import UpdateModal from '../components/UpdateModal';
import { useRef } from 'react';

export const DataContext = React.createContext();

function Payment() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [modalIndex, setModalIndex] = useState(1);

    const [fetched, setFeched] = useState(false);
    const [userHaveContent, setUserHaveContent] = useState(false);

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
            url: `${process.env.REACT_APP_BACKEND_URL}/content/getContent`,
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
                if(response.data != []) {
                    setUserHaveContent(false);
                }else{
                    setUserHaveContent(true);
                }
                
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
                    <Sidebar/>
                    <div className='h-full w-full px-1 py-3'>
                        <div className='text-white'>
                            <p className='text-right p-2'>Welcome back - {localStorage.getItem("username")}</p>
                        </div>
                        <div className=' text-white rounded-xl p-4'>
                            <h1 className='text-primary-color'>List Payment <span className='text-white'>- See all of the payment based on content you've uploaded</span></h1>
                            
                            <div className='bg-base-grey rounded-full'>

                                {/* <div className='my-2 flex rounded-full w-full h-10 p-1 border border-fourth-grey bg-third-grey text-white'>
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
                            </div>
                            <div className='bg-base-grey rounded-xl'>
                                <div className='flex justify-evenly flex-wrap'>
                                    {
                                        data.map((item, index) => (
                                            <div className='text-white border-2 border-primary-color rounded-xl max-w-md my-3 mx-1 sm:my-5' key={index}>
                                                <div className='flex text-black rounded-t px-2 py-1 justify-between bg-primary-color'>
                                                    <div>
                                                        <h1>Title : {item.title}</h1>
                                                    </div>
                                                    <div className='flex justify-center'>
                                                        <BiMenu/>
                                                    </div>
                                                </div>
                                                <div className=''>
                                                    <div>
                                                        <div className='p-2'>
                                                            <div className='flex'>
                                                                <p>id : {item._id}</p>
                                                            </div>
                                                            <div className='flex'>
                                                                <p>title : {item.title}</p>
                                                            </div>
                                                            <div className='flex'>
                                                                <p>Payment Status : {item.payment[0].paymentStatus}</p>
                                                            </div>
                                                            <div className='flex'>
                                                                <p>total bill : {item.payment[0].totalBill}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Payment
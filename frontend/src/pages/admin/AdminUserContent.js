import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, useParams } from "react-router-dom";
import SidebarAdmin from '../../components/SidebarAdmin';
import { Notifications } from 'react-push-notification';
import addNotification from 'react-push-notification';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function AdminUserContent() {
  // variabel
  let params = useParams();
  const updateModalRef = useRef();
  const navigate = useNavigate();

  // state
  const [fetched, setFeched] = useState(false);
  const [modalIndex, setModalIndex] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const[data, setData] = useState([]);
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
    artWorkFile: "",
    payment: [{

    }],
    status: [{
      
    }]
    
  });

  // useEffect 
  useEffect(() => {
    var config = {
        method: 'get',
        url: `${process.env.REACT_APP_BACKEND_URL}/admin/getUserContent?userId=${params.idUser}`,
        headers: { 
        'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
    };
    console.log(config)
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

  useEffect(() => {
    const color = "#000000";
    document.body.style.background = color;
  })

  // action Handler 
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

  // const handleUpdatePaid = (event) => {
  //   const {name, value} = event.target;
  //   console.log(value)
    
  //   // console.log(event.target.file)
  //   setUpdateData((prevProps) => ({
  //       ...prevProps,
  //       pa: value
  //   }))
  // }

  const handleCloseModal = ((event) => {
      updateModalRef.current.classList.add('hidden')
      event.preventDefault()
      setOpenModal(false);
  })
  return (
    <div className='z-10 absolute w-full h-full bg-black overflow-auto'>
    
      <Notifications />
      {/* main */}
      <div className='flex'>
        <SidebarAdmin/>
        {/* updateModal */}
        <div className='absolute hidden t-0 z-10 flex fixed z-10 w-full items-center justify-center bg-black bg-opacity-60' ref={updateModalRef}>
          <div id="defaultModal" aria-hidden="true" className="flex justify-center text-white z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
            <div className="relative w-full h-full max-w-2xl md:h-auto">
                <div className="relative bg-base-grey rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-white">
                            {updateData._id} - {updateData.title}
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal" onClick={handleCloseModal}>
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <div className="p-6 space-y-6 text-white">
                      <div className='my-2 bg-base-grey p-4 rounded-xl border border-third-grey'>
                          <p className='text-xl font-bold my-2'>Content Info : </p>
                          <p>Title : {updateData.title}</p>
                          <p>Plan : {updateData.plan}</p>
                          <p>Song Type : {updateData.songType}</p>
                          <p>Language : {updateData.language}</p>
                          <p>Productrion Year : {updateData.productionYear}</p>
                          <p>Release type : {updateData.releaseType}</p>
                          <p>Artist name : {updateData.artistName}</p>
                          <p>Featuring artist name  : {updateData.featuringArtistName}</p>
                          <p>Primary Genre : {updateData.primaryGenre}</p>
                          <p>Secondary Genre : {updateData.secondaryGenre}</p>
                          <p>Explicit Content : {updateData.title}</p>
                          <p>Artwork URL : <a href={updateData.artWorkFile} target="_blank"><u>Click here to see</u></a></p>
                      </div>
                      <div className='my-2 bg-base-grey p-4 rounded-xl border border-third-grey'>
                        <p>Total Track : <span className='text-red-500'>{updateData.tracks.length}</span></p>
                        <p>Track lists : </p>
                        <div className=''>
                          <table className='table-fixed border-spacing-px w-full'>
                            <tr className=''>
                              <th>No. </th>
                              <th className=''>Track Name</th>
                              <th>Action</th>
                            </tr>
                              {
                                updateData.tracks.map((item, index) => (
                                  <tr>
                                    <td><p className='text-center'>{index+1}.</p></td>
                                    <td><p className='text-center'>{item.name}</p></td>
                                    <td><a href={item.url} target="_blank"><p className='text-center text-primary-color'><u>Download</u></p></a></td>
                                  </tr>
                                ))
                              }
                          </table>
                        </div>
                      </div>
                      <div className='my-2 bg-base-grey p-4 rounded-xl border border-third-grey'>
                        <p>Payment Status<span className='text-red-500'> : {updateData.payment[0].paymentStatus}</span></p>
                        {/* <form className='text-grey'>
                            <select id="primaryGenre" name="payment.paymentStatus" onChange={handleInputChange} value={updateData.payment[0].paymentStatus} className='w-full p-2 rounded'>
                                <option value="paid off">Paid off</option>
                                <option value="Unpaid">Unpaid</option>
                            </select>
                        </form> */}
                    </div>


                        
                    </div>
                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button data-modal-hide="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                        <button data-modal-hide="defaultModal" type="button" className="text-white bg-red-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={handleDelete}>Delete</button>
                        <button data-modal-hide="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={handleCloseModal}>Cancle</button>
                    </div>
                </div>
            </div>
          </div>
        </div>
          
        <div className='h-full w-full px-1 py-3'>
          <div className='text-white flex justify-between p-5 sticky top-0 bg-black shadow-md'>
              <p className='text-left p-2'>Admin page</p>
              <p className='text-right p-2'>Welcome back - {localStorage.getItem("username")}</p>
          </div>
          <div className=' text-white rounded-xl p-4 '>
            <h1 className='text-primary-color text-bold'>User Content : <span className='text-white'></span></h1>
            
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
            <div className='bg-base-grey rounded-xl mt-3'>
              <div className='flex justify-center w-full'>
                <div className='flex flex-col sm:w-9/12'>
                    {
                        data.map((item, index) => (
                                <div className='bg-third-grey m-3' onClick={event => handleOpenModal(event, index)} key={item._id}>
                                    <div className='bg-primary-color text-black rounded-sm py-1 px-2'>
                                        <p>ID Content : {item._id}</p>
                                    </div>
                                    <div className='p-2 font-bold'>
                                        <p>Title : {item.title}</p>
                                        <p>Total track : {item.tracks.length}</p>
                                        <p>Plan : {item.plan}</p>
                                        <p>Content Status : {item.status[0].currentStatus}</p>
                                        <p>Payment Status : {item.payment[0].paymentStatus}</p>
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
    </div>

  )
}

export default AdminUserContent
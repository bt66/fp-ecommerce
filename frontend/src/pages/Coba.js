import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Coba() {

    const[data, setData] = useState([]);
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
                console.log(data)
            })
        .catch(function (error) {
            console.log(error)
        })
    },[])
    return (
        <div>
            <ul>
                {
                    data.map(item => (
                        <li key={item._id}>{item._id}</li>
                    ))
                }
            </ul>
        </div>
    )
}


// import React from "react";
// import { useForm, useFieldArray, Controller } from "react-hook-form";
// import axios from "axios";

// function Coba() {
    
    
//     const { register, control, handleSubmit } = useForm({
//         defaultValues: {
//         trackData: [{id: "", trackName: "", file: "" }]
//         }
//     });
//     const {
//         fields,
//         remove,
//         insert,
//     } = useFieldArray({
//         control,
//         name: "trackData"
//     });

//     const onSubmit = (data) => {
        
//         // console.log("data", data);
//         // console.log(data.trackData)
//         data.trackData.map((item, index) => {
//             const formData = new FormData();
//             console.log(item.file)
//             console.log(`index ke ${index}`)
//             formData.append('upload', item.file[0]);
//             console.log(formData)
//             var config = {
//                 method: 'post',
//                 url: 'http://localhost:3000/content/upload',
//                 headers: { 
//                 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiMTE3NDZjMzJiZTFhZmQ4NGUxNDZmIiwiZW1haWwiOiJzZGJAZ21haWwuY29tIn0sImlhdCI6MTY3MzA4ODUzN30.lp56VWx3SbY8VWWbLHceJt5aoVRIKXI5xMEEpE1f31U'
//                 },
//                 data : formData
//             };
//             axios(config)
//                 .then(function (response) {
//                     console.log(JSON.stringify(response.data));
//                 })
//                 .catch(function (error) {
//                     console.log(error);
//                 });
//         })
//     };

//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>

//             {fields.map((item, index) => {
//                 return (
//                     <div key={item.id}>
//                         <div className='my-2 bg-base-grey p-4 rounded-xl border border-third-grey' key="0">
//                             <p>Track Name</p>
//                             <input 
//                                 key="input-0"
//                                 type="text"
//                                 name={`trackData.${index}.trackName`}
//                                 placeholder='Type Here'
//                                 className='px-3 mt-4 py-2 rounded w-full'
//                                 {...register(`trackData.${index}.trackName`, { required: true })}/>
//                             <input 
//                                 className='mt-2 text-white'
//                                 name={`trackData.${index}.file`}
//                                 type="file"
//                                 id="artWorkFile"
//                                 {...register(`trackData.${index}.file`, { required: true })}/>

//                             <button type="button" onClick={() => remove(index)}>
//                                 Delete
//                             </button>
//                         </div>
                        
//                     </div>
//                     // <li key={item.id}>
//                     //     <input
//                     //         {...register(`trackData.${index}.trackName`, { required: true })}
//                     //     />

//                     //     <input
//                     //         type="file"
//                     //         render={({ field }) => <input {...field} />}
//                     //         name={`trackData.${index}.file`}
//                     //         control={control}
//                     //     />
//                         // <button type="button" onClick={() => remove(index)}>
//                         //     Delete
//                         // </button>
//                     // </li>
//                 );
//             })}
//             <div className='flex justify-between'>
//                 <div>
//                     <p className='text-right'>Total Tracks Added: </p>
//                 </div>
//                 <div onClick={() =>
//                     insert(2, {
//                     trackName: "",
//                     file: ""
//                     })
//                 }>
//                     <p className='text-right text-primary-color'><u>Add more tracks</u></p>
//                 </div>
//             </div>

//             <input type="submit" />
//         </form>


        
        
//     );
// }


// export default Coba
// // const rootElement = document.getElementById("root");
// // ReactDOM.render(<App />, rootElement);

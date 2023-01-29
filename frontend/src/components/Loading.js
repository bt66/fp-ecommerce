import React from 'react'
import ReactLoading from "react-loading";

function Loading() {
    return (
        <div className='flex absolute z-10 w-full h-full items-center justify-center bg-black bg-opacity-60'>
            <ReactLoading type="spin" color="#C4EB12" height={100} width={100} />
        </div>
    )
}

export default Loading
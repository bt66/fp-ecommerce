import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header'
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
const content = [
  {
    title: "What is Submusik?",
    description: "Submusik is your solution to music distribution 💡Put simply, Submusik is a music distribution company made by musicians, for musicians. Here at Submusik, our goal to empower musicians and provide them with access to platforms all around the world. We have a huge range of and many additional benefits for Submusik users."
  },
  {
    title: "Why Submusik?",
    description: "Because we’re the best music distributor around! 😎 Our  distribution plans have been specifically tailored for musicians. We work hard to make sure you get more, but pay less. We take the time to get to know our artists so we can provide the most competitive, bespoke service available. Submusik are constantly finding opportunities to help you achieve more and make the right choices for your career. We also have a huge range of  partner stores and many additional benefits for Submusik users. We go the extra mile for our artists! So what are you waiting for? Sign up for free today and start your Submusik journey. We can’t wait to have you on board!"
  }
]

let count = 0;

function HelpDesk() {
  // carousel
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    sliderRef.current.addEventListener('animationend', removeAnimation)
    startSlider();
  }, [])

  const removeAnimation = () => {
    sliderRef.current.classList.remove('fade-anim')
    // sliderRef.current.classList.remove('scale-75')
  }

  const startSlider = () => {
    // setInterval(() => {
    //   handleOnNextClick();
    // }, 5000);
  }
  const handleOnNextClick = () => {
    count = (count + 1) % content.length;
    setCurrentIndex(count);
    sliderRef.current.classList.add('fade-anim')
    // sliderRef.current.classList.add('scale-75')
    console.log(currentIndex);
  }

  const sliderRef = useRef();

  const handleOnPrevClick = () => {
    const contentLength = content.length;
    count = (currentIndex + content.length - 1) % contentLength;
    setCurrentIndex(count);
    sliderRef.current.classList.add('fade-anim')
    // sliderRef.current.classList.add('scale-75')
    console.log(currentIndex);
  }

  // console.log(sliderRef)
  return (
    <div className='bg-black absolute w-full h-full'>
        <Header />
        <div className='flex justify-center items-center lg:mt-20'>
          <div className='lg:flex'>
            <div className='text-white flex flex-col justify-between'>
              <div>
                <h1 className='text-primary-color font-bold text-2xl text-center lg:text-left'>HELP DESK</h1>
              </div>
              <div className='hidden lg:block'>
                <p>Cloudn't find what you where looking for?</p>
                <p>write to us at : </p>
                <p className='text-primary-color'>help.submitmusik@gmail.com</p>
              </div>
            </div>
            <div className='mt-10 md:mt-0 flex justify-center items-center relative'>
              
              <div className='flex'>
                <div className='flex justify-center items-center'>
                  <div>
                    <AiFillCaretLeft onClick={handleOnPrevClick} color="white" size="40px"/>
                  </div>
                </div>
                <div ref={sliderRef} className='flex'>
                  <div className='bg-primary-color w-28 sm:w-8 rounded-l-lg'>
                  </div>
                  <div className='flex md:justify-center md:items-center bg-grey rounded-r-lg h-96 md:h-128 max-w-lg md:max-w-2xl p-10 overflow-scroll lg:overflow-hidden'>
                    <div className='text-white '>
                      <p>{content[currentIndex].title}</p>
                      <p className=''>{content[currentIndex].description}</p>
                    </div>
                  </div>
                </div>
                <div className='flex justify-center items-center'>
                  <div className=''>
                    <AiFillCaretRight onClick={handleOnNextClick} color="white" size="40px"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

    </div>
  )
}

export default HelpDesk
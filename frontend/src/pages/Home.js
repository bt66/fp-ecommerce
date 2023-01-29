import React, { useRef } from 'react'
import Header from '../components/Header'
import BackgroundPexcels from '../assets/pexels-wendy-wei-1916824.svg'
import YoutubeMusicLogo from '../assets/YoutubeMusic.svg'
import AppleMusicLogo from '../assets/AppleMusic.svg'
import SpotifyLogo from '../assets/Spotify.svg'
import DeezerLogo from "../assets/deezer.svg"
import TiktokLogo from "../assets/Tiktok.svg"
import RessoLogo from "../assets/Resso.svg"
import SoundCloudLogo from "../assets/Soundcloud.svg"
import ShazamLogo from "../assets/Shazam.svg"
import JooxLogo from "../assets/Joox.svg"
import MusicStoriesLogo from "../assets/MusicStories.svg"
import AmazomMusicLogo from "../assets/amazonMusic.svg"
import IhearRadioLogo from "../assets/iHeartRadio.svg"
import TidalLogo from "../assets/tidal.svg"
import LineMusicLogo from "../assets/line-music.svg"
import QQLogo from "../assets/QQ.svg"

import CheckIcon from '../assets/icon_Check.svg'
import TimesIcon from '../assets/iconTimes.svg'
import { Outlet, Link } from "react-router-dom";


const pricingOriginal = [
  {
    "features" : "Release to all music platform",
    "standardSingle" : true,
    "proSingle": true,
    "standardAlbum": true,
    "proAlbum": true
  },
  {
    "features" : "100% copyright holder",
    "standardSingle" : true,
    "proSingle": true,
    "standardAlbum": true,
    "proAlbum": true
  },
  {
    "features" : "80% artist revenue",
    "standardSingle" : true,
    "proSingle": true,
    "standardAlbum": true,
    "proAlbum": true
  },
  {
    "features" : "Non-exclusive cooperation",
    "standardSingle" : true,
    "proSingle": true,
    "standardAlbum": true,
    "proAlbum": true
  },
  {
    "features" : "One-time fee",
    "standardSingle" : true,
    "proSingle": true,
    "standardAlbum": true,
    "proAlbum": true
  },
  {
    "features" : "Stores",
    "standardSingle" : true,
    "proSingle": true,
    "standardAlbum": true,
    "proAlbum": true
  },
  {
    "features" : "Youtube claim & monetize",
    "standardSingle" : true,
    "proSingle": true,
    "standardAlbum": true,
    "proAlbum": true
  },
  {
    "features" : "Channels exclude",
    "standardSingle" : true,
    "proSingle": true,
    "standardAlbum": true,
    "proAlbum": true
  },
  {
    "features" : "Song preview start",
    "standardSingle" : false,
    "proSingle": true,
    "standardAlbum": false,
    "proAlbum": true
  },
  {
    "features" : "Custom release date",
    "standardSingle" : false,
    "proSingle": true,
    "standardAlbum": false,
    "proAlbum": true
  },
  {
    "features" : "Custom record",
    "standardSingle" : false,
    "proSingle": true,
    "standardAlbum": false,
    "proAlbum": true
  },
]


const pricingCover = [
  {
    "features" : "Release to all music platform",
    "standardCover" : true,
    "proCover": true,
  },
  {
    "features" : "100% copyright holder",
    "standardCover" : true,
    "proCover": true,
  },
  {
    "features" : "80% artist revenue",
    "standardCover" : true,
    "proCover": true,
  },
  {
    "features" : "Non-exclusive cooperation",
    "standardCover" : true,
    "proCover": true,
  },
  {
    "features" : "One-time fee",
    "standardCover" : true,
    "proCover": true,
  },
  {
    "features" : "Stores",
    "standardCover" : true,
    "proCover": true,
  },
  {
    "features" : "Youtube claim & monetize",
    "standardCover" : false,
    "proCover": false,
  },
  {
    "features" : "Channels exclude",
    "standardCover" : false,
    "proCover": false,
  },
  {
    "features" : "Song preview start",
    "standardCover" : false,
    "proCover": true,
  },
  {
    "features" : "Custom release date",
    "standardCover" : false,
    "proCover": true,
  },
  {
    "features" : "Custom record",
    "standardCover" : false,
    "proCover": true,
  },
]


function Home() {
  const pricingRef = useRef();
  return (
    <div className='relative bg-black text-white'>
      <Header pricingRef={pricingRef}/>
      <div className='z-50 sticky inset-x-0'>
      </div>
      <div className='bg-red-500 relative '>
        <div className='text-white absolute w-full h-full'>
          <div className='flex justify-center items-center w-full h-full'>
            <div>
              <h2 className='text-center text-2xl mt-6 font-bold text-primary-color md:text-4xl'>NEW ERA OF</h2>
              <h2 className='text-center text-2xl font-bold text-primary-color mt-4 md:text-4xl'><span className='text-white'>MUSIC</span> DISTRIBUTION</h2>
              <p className='text-center mt-3 p-3 md:text-xl'>Stream and sell your music around the world on Spotify, Apple Music, and more!</p>
              <div className='flex justify-center item-center mt-3'>
                <Link to="/login">
                  <a 
                  className=" border-1 border-slate-300 rounded-md border border-transparent bg-btn-primary px-4 py-2 text-base font-medium text-black shadow-sm hover:bg-yellow-500">
                      Get Started
                  </a>
                </Link>
              </div>

              <div className='flex justify-between align-center bg-secondary-grey p-3 rounded-md bg-opacity-25 mt-60 hidden sm:flex'>
                {/* {logoBrand.map((item) => {
                  <div className='flex justify-center align-center'>
                    <img src={item.src}></img>
                  </div>
                })} */}
                <div className='flex justify-center align-center'>
                  <img src={YoutubeMusicLogo} alt="brandLogo"></img>
                </div>
                <div className='flex justify-center align-center'>
                  <img  src={AppleMusicLogo} alt="brandLogo"></img>
                </div>
                <div className='flex justify-center align-center'>
                  <img src={SpotifyLogo} alt="brandLogo"></img>
                </div>
                <div className='flex justify-center align-center'>
                  <img src={DeezerLogo} alt="brandLogo"></img>
                </div>
                <div className='flex justify-center align-center'>
                  <img src={TiktokLogo} alt="brandLogo"></img>
                </div>
                <div className='flex justify-center align-center'>
                  <img src={RessoLogo} alt="brandLogo"></img>
                </div>
                <div className='flex justify-center align-center'>
                  <img src={ShazamLogo} alt="brandLogo"></img>
                </div>
                <div className='flex justify-center align-center'>
                  <img src={JooxLogo} alt="brandLogo"></img>
                </div>
                <div className='flex justify-center align-center'>
                  <img src={MusicStoriesLogo} alt="brandLogo"></img>
                </div>
                <div className='flex justify-center align-center'>
                  <img src={AmazomMusicLogo} alt="brandLogo"></img>
                </div>
                <div className='flex justify-center align-center'>
                  <img src={IhearRadioLogo} alt="brandLogo"></img>
                </div>
                <div className='flex justify-center align-center'>
                  <img src={TidalLogo} alt="brandLogo"></img>
                </div>
                <div className='flex justify-center align-center'>
                  <img src={LineMusicLogo} alt="brandLogo"></img>
                </div>
                <div className='flex justify-center align-center'>
                  <img src={QQLogo} alt="brandLogo"></img>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-default-dark'>
          <img src={BackgroundPexcels} className="w-full"/>
        </div>
      </div>
      {/* content 2 */}
      <div className=''>
        <div className='pt-10'>
          <h2 className='text-center font-bold text-primary-color text-xl md:text-4xl lg:mt-32'>HOW IT WORKS</h2>
          {/* card */}
          <div className='mt-4 lg:mt-20'>
            <div className='flex flex-nowrap overflow-x-auto sm:justify-center md:justify-center lg:justify-center xl:justify-center 2xl:justify-center'>
              <div className='flex-none bg-grey m-3 rounded-md p-6 w-48 md:w-60 md:text-xl lg:w-80 lg:h-80 lg:text-2xl'>
                <h2 className='text-center font-bold'>Create Your Music</h2>
                <p className='mt-5 text-center'>Join our community of independent artists putting their music out into the world.</p>
              </div>
              <div className='flex-none bg-grey m-3 rounded-md p-6 w-48 8 md:w-60 md:text-xl lg:w-80 lg:h-80 lg:text-2xl'>
                <h2 className='text-center font-bold'>Distribute Worldwide</h2>
                <p className='mt-5 text-center'>We will send your music to all of the most popular music platforms that you choose.</p>
              </div>
              <div className='flex-none bg-grey m-3 rounded-md p-6 w-48 8 md:w-60 md:text-xl lg:w-80 lg:h-80 lg:text-2xl'>
                <h2 className='text-center font-bold'>Receive Earnings</h2>
                <p className='mt-5 text-center'>Once your music is live we will send you your earnings and statistics every month.</p>
              </div>
            </div>
          </div>
          <p className='m-10 text-center md:text-xl lg:text-2xl'>Start <span className='text-primary-color'>selling</span> your music worldwide today!</p>
          <div className='flex justify-center item-center'>
            <Link to="/login">
              <a href="#" 
              className=" border-1 border-slate-300 rounded-md border border-transparent bg-btn-primary px-4 py-2 text-base font-medium text-black shadow-sm hover:bg-yellow-500">
                  Get Started
              </a>
            </Link>
          </div>
        </div>
      </div>

      {/* content 3 */}
      <div className='pt-20'>
        <h2 className='font-bold text-primary-color text-center m-4 text-2xl md:text-4xl'>YOUR MUSIC, YOUR WAY!</h2>
        <p className='text-center md:text-xl'>Find the plant that best <span className='text-primary-color'>suites</span> you</p>

        {/* card*/}
        <div className='mt-16 flex justify-center items-center overflow-x-auto'>
          <div className='bg-grey m-3 rounded-md p-3 w-48 flex-none md:w-60 md:h-60 md:text-xl lg:w-80 lg:h-80 lg:text-2xl'>
            <h2 className='font-bold text-sm text-center mt-10 lg:text-2xl'>ORIGINAL VERSION</h2>
            <div className='my-4 bg-divider w-full h-0.5'></div>
            <Link to="/login">
              <div className='flex justify-center item-center mt-10'>
                <a href="#" className=" border-1 border-slate-300 rounded-md border border-transparent bg-btn-primary px-4 py-2 text-base font-medium text-black shadow-sm hover:bg-yellow-500">Choose Plan</a>
              </div>
            </Link>
          </div>
          <div className='bg-grey m-3 rounded-md p-3 w-48 flex-none md:w-60 md:h-60 md:text-xl lg:w-80 lg:h-80 lg:text-2xl'>
            <h2 className='font-bold text-sm text-center mt-10 lg:text-2xl'>COVER VERSION</h2>
            <div className='my-4 bg-divider w-full h-0.5'></div>
            <Link to="/login">
              <div className='flex justify-center item-center mt-10'>
                <a href="#" 
                className="border-1 border-slate-300 rounded-md border border-transparent bg-btn-primary px-4 py-2 text-base font-medium text-black shadow-sm hover:bg-yellow-500">
                    Choose Plan
                </a>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* content 4 pricing */}
      <div className='mt-10 p-5' ref={pricingRef}>
        <h2 className='font-bold text-xl text-center text-2xl md:text-4xl'><span className='text-primary-color'>Original</span> Version</h2>
        <div className='mt-16 flex overflow-x-auto sm:justify-center md:justify-center lg:justify-center xl:justify-center 2xl:justify-center'>
          <table className='bg-grey border-separate border-spacing-2 p-3 lg:border-spacing-5'>
            <thead>
              <tr>
                <th>FEATURES</th>
                <th>STANDARD SINGLE Rp75.000/song</th>
                <th className='text-primary-color'>PRO SINGLE Rp95.000/song</th>
                <th>STANDARD ALBUM Rp65.000/song</th>
                <th className='text-primary-color'>PRO ALBUM Rp85.000/song</th>
              </tr>
            </thead>
            <tbody>

              {/* pricingOriginal */}
              {
                pricingOriginal.map((item, index) => (
                  <tr className=''>
                    <td className='h-10'>{item.features}</td>
                    <td>
                      <div className='flex justify-center items-center '>
                        { item.standardSingle ? <img src={CheckIcon}/> : <img src={TimesIcon}/> }
                        
                      </div>
                    </td>
                    <td>
                      <div className='flex justify-center items-center '>
                        { item.proSingle ? <img src={CheckIcon}/> : <img src={TimesIcon}/> }
                      </div>
                    </td>
                    <td>
                      <div className='flex justify-center items-center '>
                        { item.standardAlbum ? <img src={CheckIcon}/> : <img src={TimesIcon}/> }
                      </div>
                    </td>
                    <td>
                      <div className='flex justify-center items-center '>
                        { item.proAlbum ? <img src={CheckIcon}/> : <img src={TimesIcon}/> }
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>

        </div>
        <h2 className='font-bold text-xl text-center mt-10 text-2xl md:text-4xl'><span className='text-primary-color'>Cover</span> Version</h2>
        <div className='mt-9 flex overflow-x-auto sm:justify-center md:justify-center lg:justify-center xl:justify-center 2xl:justify-center'>
          <table className='bg-grey border-separate border-spacing-2 p-3 lg:border-spacing-5'>
            <thead>
              <tr>
                <th>FEATURES</th>
                <th>STANDARD COVER Rp100.000</th>
                <th className='text-primary-color'>PRO COVER Rp125.000</th>
              </tr>
            </thead>
            <tbody>
              {
                pricingCover.map((item, index) => (
                  <tr className=''>
                    <td className='h-10'>{item.features}</td>
                    <td className='h-10'>
                      <div className='flex justify-center items-center '>
                        { item.standardCover ? <img src={CheckIcon}/> : <img src={TimesIcon}/> }
                        
                      </div>
                    </td>
                    <td>
                      <div className='flex justify-center items-center '>
                        { item.proCover ? <img src={CheckIcon}/> : <img src={TimesIcon}/> }
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Home
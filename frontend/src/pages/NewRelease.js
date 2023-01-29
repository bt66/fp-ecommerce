import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { BiArrowBack } from "react-icons/bi";
import FileUploadLogo from "../assets/FileUploadIcon.svg"
import CheckIcon from '../assets/icon_Check.svg'
import TimesRedIcon from '../assets/TimesRed.svg'
import { useForm, useFieldArray, Controller } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { Notifications } from 'react-push-notification';
import addNotification from 'react-push-notification';
import Loading from '../components/Loading';
import { data } from 'autoprefixer';


const genres = [
    {
        value: "African"
    },
    {
        value: "Alternative"
    },
    {
        value: "Asian"
    },
    {
        value: "Blues"
    },
    {
        value: "Brazilian"
    },
    {
        value: "Children Music"
    },
    {
        value: "Christian & Gospel"
    },
    {
        value: "Classical"
    },
    {
        value: "Country"
    },
    {
        value: "Dance"
    },
    {
        value: "Easy Listening"
    },
    {
        value: "Electronic"
    },
    {
        value: "Hip Hop/Rap"
    },
    {
        value: "Indian"
    },
    {
        value: "Jazz"
    },
    {
        value: "Latin"
    },
    {
        value: "Metal"
    },
    {
        value: "Pop"
    },
    {
        value: "RNB/Soul"
    },
    {
        value: "Reggae"
    },
    {
        value: "Relaxation"
    },
    {
        value: "Rock"
    },
    {
        value: "Various"
    },
    {
        value: "World Music / Regional Folklore"
    },
]

const language = [
    {
        "code": "ab",
        "name": "Abkhaz"
    },
    {
        "code": "aa",
        "name": "Afar"
    },
    {
        "code": "af",
        "name": "Afrikaans"
    },
    {
        "code": "ak",
        "name": "Akan"
    },
    {
        "code": "sq",
        "name": "Albanian"
    },
    {
        "code": "am",
        "name": "Amharic"
    },
    {
        "code": "ar",
        "name": "Arabic"
    },
    {
        "code": "an",
        "name": "Aragonese"
    },
    {
        "code": "hy",
        "name": "Armenian"
    },
    {
        "code": "as",
        "name": "Assamese"
    },
    {
        "code": "av",
        "name": "Avaric"
    },
    {
        "code": "ae",
        "name": "Avestan"
    },
    {
        "code": "ay",
        "name": "Aymara"
    },
    {
        "code": "az",
        "name": "Azerbaijani"
    },
    {
        "code": "bm",
        "name": "Bambara"
    },
    {
        "code": "ba",
        "name": "Bashkir"
    },
    {
        "code": "eu",
        "name": "Basque"
    },
    {
        "code": "be",
        "name": "Belarusian"
    },
    {
        "code": "bn",
        "name": "Bengali; Bangla"
    },
    {
        "code": "bh",
        "name": "Bihari"
    },
    {
        "code": "bi",
        "name": "Bislama"
    },
    {
        "code": "bs",
        "name": "Bosnian"
    },
    {
        "code": "br",
        "name": "Breton"
    },
    {
        "code": "bg",
        "name": "Bulgarian"
    },
    {
        "code": "my",
        "name": "Burmese"
    },
    {
        "code": "ca",
        "name": "Catalan; Valencian"
    },
    {
        "code": "ch",
        "name": "Chamorro"
    },
    {
        "code": "ce",
        "name": "Chechen"
    },
    {
        "code": "ny",
        "name": "Chichewa; Chewa; Nyanja"
    },
    {
        "code": "zh",
        "name": "Chinese"
    },
    {
        "code": "cv",
        "name": "Chuvash"
    },
    {
        "code": "kw",
        "name": "Cornish"
    },
    {
        "code": "co",
        "name": "Corsican"
    },
    {
        "code": "cr",
        "name": "Cree"
    },
    {
        "code": "hr",
        "name": "Croatian"
    },
    {
        "code": "cs",
        "name": "Czech"
    },
    {
        "code": "da",
        "name": "Danish"
    },
    {
        "code": "dv",
        "name": "Divehi; Dhivehi; Maldivian;"
    },
    {
        "code": "nl",
        "name": "Dutch"
    },
    {
        "code": "dz",
        "name": "Dzongkha"
    },
    {
        "code": "en",
        "name": "English"
    },
    {
        "code": "eo",
        "name": "Esperanto"
    },
    {
        "code": "et",
        "name": "Estonian"
    },
    {
        "code": "ee",
        "name": "Ewe"
    },
    {
        "code": "fo",
        "name": "Faroese"
    },
    {
        "code": "fj",
        "name": "Fijian"
    },
    {
        "code": "fi",
        "name": "Finnish"
    },
    {
        "code": "fr",
        "name": "French"
    },
    {
        "code": "ff",
        "name": "Fula; Fulah; Pulaar; Pular"
    },
    {
        "code": "gl",
        "name": "Galician"
    },
    {
        "code": "ka",
        "name": "Georgian"
    },
    {
        "code": "de",
        "name": "German"
    },
    {
        "code": "el",
        "name": "Greek, Modern"
    },
    {
        "code": "gn",
        "name": "GuaranÃ­"
    },
    {
        "code": "gu",
        "name": "Gujarati"
    },
    {
        "code": "ht",
        "name": "Haitian; Haitian Creole"
    },
    {
        "code": "ha",
        "name": "Hausa"
    },
    {
        "code": "he",
        "name": "Hebrew (modern)"
    },
    {
        "code": "hz",
        "name": "Herero"
    },
    {
        "code": "hi",
        "name": "Hindi"
    },
    {
        "code": "ho",
        "name": "Hiri Motu"
    },
    {
        "code": "hu",
        "name": "Hungarian"
    },
    {
        "code": "ia",
        "name": "Interlingua"
    },
    {
        "code": "id",
        "name": "Indonesian"
    },
    {
        "code": "ie",
        "name": "Interlingue"
    },
    {
        "code": "ga",
        "name": "Irish"
    },
    {
        "code": "ig",
        "name": "Igbo"
    },
    {
        "code": "ik",
        "name": "Inupiaq"
    },
    {
        "code": "io",
        "name": "Ido"
    },
    {
        "code": "is",
        "name": "Icelandic"
    },
    {
        "code": "it",
        "name": "Italian"
    },
    {
        "code": "iu",
        "name": "Inuktitut"
    },
    {
        "code": "ja",
        "name": "Japanese"
    },
    {
        "code": "jv",
        "name": "Javanese"
    },
    {
        "code": "kl",
        "name": "Kalaallisut, Greenlandic"
    },
    {
        "code": "kn",
        "name": "Kannada"
    },
    {
        "code": "kr",
        "name": "Kanuri"
    },
    {
        "code": "ks",
        "name": "Kashmiri"
    },
    {
        "code": "kk",
        "name": "Kazakh"
    },
    {
        "code": "km",
        "name": "Khmer"
    },
    {
        "code": "ki",
        "name": "Kikuyu, Gikuyu"
    },
    {
        "code": "rw",
        "name": "Kinyarwanda"
    },
    {
        "code": "ky",
        "name": "Kyrgyz"
    },
    {
        "code": "kv",
        "name": "Komi"
    },
    {
        "code": "kg",
        "name": "Kongo"
    },
    {
        "code": "ko",
        "name": "Korean"
    },
    {
        "code": "ku",
        "name": "Kurdish"
    },
    {
        "code": "kj",
        "name": "Kwanyama, Kuanyama"
    },
    {
        "code": "la",
        "name": "Latin"
    },
    {
        "code": "lb",
        "name": "Luxembourgish, Letzeburgesch"
    },
    {
        "code": "lg",
        "name": "Ganda"
    },
    {
        "code": "li",
        "name": "Limburgish, Limburgan, Limburger"
    },
    {
        "code": "ln",
        "name": "Lingala"
    },
    {
        "code": "lo",
        "name": "Lao"
    },
    {
        "code": "lt",
        "name": "Lithuanian"
    },
    {
        "code": "lu",
        "name": "Luba-Katanga"
    },
    {
        "code": "lv",
        "name": "Latvian"
    },
    {
        "code": "gv",
        "name": "Manx"
    },
    {
        "code": "mk",
        "name": "Macedonian"
    },
    {
        "code": "mg",
        "name": "Malagasy"
    },
    {
        "code": "ms",
        "name": "Malay"
    },
    {
        "code": "ml",
        "name": "Malayalam"
    },
    {
        "code": "mt",
        "name": "Maltese"
    },
    {
        "code": "mi",
        "name": "MÄori"
    },
    {
        "code": "mr",
        "name": "Marathi (MarÄá¹­hÄ«)"
    },
    {
        "code": "mh",
        "name": "Marshallese"
    },
    {
        "code": "mn",
        "name": "Mongolian"
    },
    {
        "code": "na",
        "name": "Nauru"
    },
    {
        "code": "nv",
        "name": "Navajo, Navaho"
    },
    {
        "code": "nb",
        "name": "Norwegian BokmÃ¥l"
    },
    {
        "code": "nd",
        "name": "North Ndebele"
    },
    {
        "code": "ne",
        "name": "Nepali"
    },
    {
        "code": "ng",
        "name": "Ndonga"
    },
    {
        "code": "nn",
        "name": "Norwegian Nynorsk"
    },
    {
        "code": "no",
        "name": "Norwegian"
    },
    {
        "code": "ii",
        "name": "Nuosu"
    },
    {
        "code": "nr",
        "name": "South Ndebele"
    },
    {
        "code": "oc",
        "name": "Occitan"
    },
    {
        "code": "oj",
        "name": "Ojibwe, Ojibwa"
    },
    {
        "code": "cu",
        "name": "Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic"
    },
    {
        "code": "om",
        "name": "Oromo"
    },
    {
        "code": "or",
        "name": "Oriya"
    },
    {
        "code": "os",
        "name": "Ossetian, Ossetic"
    },
    {
        "code": "pa",
        "name": "Panjabi, Punjabi"
    },
    {
        "code": "pi",
        "name": "PÄli"
    },
    {
        "code": "fa",
        "name": "Persian (Farsi)"
    },
    {
        "code": "pl",
        "name": "Polish"
    },
    {
        "code": "ps",
        "name": "Pashto, Pushto"
    },
    {
        "code": "pt",
        "name": "Portuguese"
    },
    {
        "code": "qu",
        "name": "Quechua"
    },
    {
        "code": "rm",
        "name": "Romansh"
    },
    {
        "code": "rn",
        "name": "Kirundi"
    },
    {
        "code": "ro",
        "name": "Romanian, [])"
    },
    {
        "code": "ru",
        "name": "Russian"
    },
    {
        "code": "sa",
        "name": "Sanskrit (Saá¹ská¹›ta)"
    },
    {
        "code": "sc",
        "name": "Sardinian"
    },
    {
        "code": "sd",
        "name": "Sindhi"
    },
    {
        "code": "se",
        "name": "Northern Sami"
    },
    {
        "code": "sm",
        "name": "Samoan"
    },
    {
        "code": "sg",
        "name": "Sango"
    },
    {
        "code": "sr",
        "name": "Serbian"
    },
    {
        "code": "gd",
        "name": "Scottish Gaelic; Gaelic"
    },
    {
        "code": "sn",
        "name": "Shona"
    },
    {
        "code": "si",
        "name": "Sinhala, Sinhalese"
    },
    {
        "code": "sk",
        "name": "Slovak"
    },
    {
        "code": "sl",
        "name": "Slovene"
    },
    {
        "code": "so",
        "name": "Somali"
    },
    {
        "code": "st",
        "name": "Southern Sotho"
    },
    {
        "code": "es",
        "name": "Spanish; Castilian"
    },
    {
        "code": "su",
        "name": "Sundanese"
    },
    {
        "code": "sw",
        "name": "Swahili"
    },
    {
        "code": "ss",
        "name": "Swati"
    },
    {
        "code": "sv",
        "name": "Swedish"
    },
    {
        "code": "ta",
        "name": "Tamil"
    },
    {
        "code": "te",
        "name": "Telugu"
    },
    {
        "code": "tg",
        "name": "Tajik"
    },
    {
        "code": "th",
        "name": "Thai"
    },
    {
        "code": "ti",
        "name": "Tigrinya"
    },
    {
        "code": "bo",
        "name": "Tibetan Standard, Tibetan, Central"
    },
    {
        "code": "tk",
        "name": "Turkmen"
    },
    {
        "code": "tl",
        "name": "Tagalog"
    },
    {
        "code": "tn",
        "name": "Tswana"
    },
    {
        "code": "to",
        "name": "Tonga (Tonga Islands)"
    },
    {
        "code": "tr",
        "name": "Turkish"
    },
    {
        "code": "ts",
        "name": "Tsonga"
    },
    {
        "code": "tt",
        "name": "Tatar"
    },
    {
        "code": "tw",
        "name": "Twi"
    },
    {
        "code": "ty",
        "name": "Tahitian"
    },
    {
        "code": "ug",
        "name": "Uyghur, Uighur"
    },
    {
        "code": "uk",
        "name": "Ukrainian"
    },
    {
        "code": "ur",
        "name": "Urdu"
    },
    {
        "code": "uz",
        "name": "Uzbek"
    },
    {
        "code": "ve",
        "name": "Venda"
    },
    {
        "code": "vi",
        "name": "Vietnamese"
    },
    {
        "code": "vo",
        "name": "VolapÃ¼k"
    },
    {
        "code": "wa",
        "name": "Walloon"
    },
    {
        "code": "cy",
        "name": "Welsh"
    },
    {
        "code": "wo",
        "name": "Wolof"
    },
    {
        "code": "fy",
        "name": "Western Frisian"
    },
    {
        "code": "xh",
        "name": "Xhosa"
    },
    {
        "code": "yi",
        "name": "Yiddish"
    },
    {
        "code": "yo",
        "name": "Yoruba"
    },
    {
        "code": "za",
        "name": "Zhuang, Chuang"
    },
    {
        "code": "zu",
        "name": "Zulu"
    }
]

function NewRelease() {

    const buttonPreviousRef = useRef();
    const [step, setStep] = useState(1);
    const loadingRef = useRef();
    const navigate = useNavigate();
    // const [trackCount, setTrackCount] = useState(1);
    const [contentData, setContentData] = useState({
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
    })

    const [paymentData, setPaymentData] = useState({
        _id: "",
        payment: [{
            totalBill: "",
        }]
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        console.log(value)
        // console.log(event.target.file)
        setContentData((prevProps) => ({
            ...prevProps,
            [name]: value
        }))
    }



    const handleFileChange = (event) => {
        loadingRef.current.classList.remove('hidden')
        console.log(event.target.files[0])
        const formData = new FormData();
        formData.append('upload', event.target.files[0]);
        var config = {
            method: 'post',
            url: `${process.env.REACT_APP_BACKEND_URL}/content/uploadImage`,
            headers: { 
            'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            data : formData
        };
        
        axios(config)
            .then(function (response) {
                loadingRef.current.classList.add('hidden')
                addNotification({
                    title: 'Success',
                    subtitle: 'Upload Success',
                    theme: 'darkgreen',
                    native: false // when using native, your OS will handle theming.
                })
                console.log(JSON.stringify(response.data));
                
                setContentData({
                    ...contentData,
                    artWorkFile: response.data.url
                })
                console.log(contentData.artWorkFile)

            })
            .catch(function (error) {
                console.log(error);
                loadingRef.current.classList.add('hidden')
                addNotification({
                    title: 'Error',
                    subtitle: "Submit Content Error",
                    message: 'Connection error',
                    theme: 'red',
                    native: false // when using native, your OS will handle theming.
                });
                loadingRef.current.classList.add('hidden')
            });
    }

    useEffect(() => {
        // console.log()   
    },[paymentData])
    
    const [agreement, setAgreement] = useState(false);
    const [trackCount, setTrackCount] = useState(1);


    let currentStep;
    const handleNextButton = (event) => {
        event.preventDefault();
        currentStep = step + 1;
        setStep(currentStep);
        console.log(contentData)
        console.log(currentStep)
        if(currentStep == 5){
            // console.log(contentData)
            // console.log("ok post data ");
            loadingRef.current.classList.remove('hidden')
            var config = {
                method: 'post',
                url: `${process.env.REACT_APP_BACKEND_URL}/content/add`,
                headers: { 
                'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                data : contentData
            };
            axios(config)
                .then(function (response) {
                    loadingRef.current.classList.add('hidden')
                    addNotification({
                        title: 'Success',
                        subtitle: 'Submit Content Success',
                        message: 'Next confirm your payment ',
                        theme: 'darkgreen',
                        native: false // when using native, your OS will handle theming.
                    })
                    // setTimeout((()=> {
                    //     navigate('/userDashboard');
                    // }), 1000);
                    // setContentData({
                    //     tracks: [...contentData.tracks,
                    //         {
                    //             name: item.trackName,
                    //             url: response.data.url
                    //         }
                    //     ]
                    // })
                    setPaymentData(response.data.data)
                    console.log(paymentData)

                    // if(response.status == 200){

                    // }

                })
                .catch(function (error) {
                    console.log(error);
                    loadingRef.current.classList.add('hidden')
                    addNotification({
                        title: 'Error',
                        subtitle: "Data error",
                        message: 'Ensure to fill required input',
                        theme: 'red',
                        native: false // when using native, your OS will handle theming.
                    });
                    setStep(1);
                });
        }
        if(currentStep == 6) {
            navigate("/userDashboard");
        }
    }


    const handlePrevious = (event) => {
        event.preventDefault();
        currentStep = step - 1;
        setStep(currentStep);
    }
    const handleAgreement = (event) => {
        event.preventDefault();
        setAgreement(!agreement);
        console.log(agreement);

    }
    // let currentTrackCount;
    // const handleAddTrack = (event) => {
    //     event.preventDefault();
    //     currentTrackCount = trackCount + 1;
    //     setTrackForm(trackForm.concat(
    //         <div className='my-2 bg-base-grey p-4 rounded-xl border border-third-grey' key={currentTrackCount}>
    //             <p>Track Name</p>
    //             <form className='text-black'>
    //                 <input 
    //                     type="text"
    //                     name="trackName" 
    //                     placeholder='Type Here'
    //                     onChange={handleInputTrack.bind(currentTrackCount)}
    //                     className='px-3 mt-4 py-2 rounded w-full'/>
    //                 <input className='mt-2 text-white' type="file"
    //                     id="artWorkFile" name="artWorkFile"/>
    //             </form>
    //         </div>
    //     ))
    //     setTrackCount(currentTrackCount)
        
    // }
    useEffect(() => {
        const color = "#000000";
        document.body.style.background = color;
    })

    const { register, control, handleSubmit } = useForm({
        defaultValues: {
        trackData: [{id: "", trackName: "", file: "" }]
        }
    });
    const {
        fields,
        remove,
        insert,
    } = useFieldArray({
        control,
        name: "trackData"
    });

    const onSubmit = (data) => {
        
        // console.log("data", data);
        // console.log(data.trackData)
        // setContentData({ 
        //     ...contentData,
        //     tracks : []
        // })
        loadingRef.current.classList.remove('hidden')
        data.trackData.map((item, index) => {
            const formData = new FormData();
            console.log(item.file)
            console.log(`index ke ${index}`)
            formData.append('upload', item.file[0]);

            var config = {
                method: 'post',
                url: `${process.env.REACT_APP_BACKEND_URL}/content/upload`,
                headers: { 
                'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                data : formData
            };
            axios(config)
                .then(function (response) {
                    // console.log(JSON.stringify(response.data));
                    
                    contentData.tracks.push(
                        {
                            name: item.trackName,
                            url: response.data.url
                        }
                        )
                        addNotification({
                            title: 'Success',
                            subtitle: 'Upload Success',
                            theme: 'darkgreen',
                            native: false // when using native, your OS will handle theming.
                        })
                        if(index == data.trackData.length -1) {
                            loadingRef.current.classList.add('hidden')
                        }
                        // console.log(contentData.tracks)
                        
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
            )
    };
    console.log(loadingRef)
    return (
        <div className='w-full h-full text-white'>
            <div ref={loadingRef} className="hidden">
                <Loading />
            </div>
            <Notifications />
            <div className='w-full  flex justify-center'>
                <div className='my-5 sm:max-w-2xl'>
                    <Link to="/userDashboard">
                        <div className='flex items-center p-2'>
                            <div className=''>
                                <BiArrowBack color='#C4EB12' size="30px"/>
                            </div>
                            <h1 className='text-2xl'>Create New Release</h1>
                        </div>
                    </Link>
                    {/* form carousel */}
                    <div className='p-5'>
                        {(() => {
                            switch (step) {
                                case 1:
                                    return(
                                        <div className=''>
                                            <p className='text-center'>Step 1/5: <span className='text-primary-color'>Chose Plan</span></p>
                                            <div className='my-2 bg-base-grey p-4 rounded-xl border border-third-grey'>
                                                <p>Plain Guidelines</p>
                                                <p>We have 6 plans to fulfill your different needs</p>
                                                <p>To See the detail comparations, go check out <span className='text-primary-color'><u>pricing over</u></span></p>
                                            </div>

                                            <div className='my-2 bg-base-grey p-4 rounded-xl border border-third-grey cursor-pointer'>
                                                <p>Choose Your Best Plan<span className='text-red-500'>*</span></p>
                                                <form className='text-grey'>
                                                    <select id="cars" name="plan" value={contentData.plan} onChange={handleInputChange} className='w-full p-2 rounded'>
                                                        <option value="Standard Single">Standard Single</option>
                                                        <option value="PRO Single">PRO Single</option>
                                                        <option value="Standard Album">Standard Album</option>
                                                        <option value="PRO Album">PRO Album</option>
                                                        <option value="Standard Cover">Standard Cover</option>
                                                        <option value="PRO Cover">PRO Cover</option>
                                                    </select>
                                                </form>
                                            </div>
                                            
                                            {/* <div>
                                                <form>
                                                    <div className='flex items-center'>
                                                        <div>
                                                            <input value="agreements" type="checkbox" onChange={handleAgreement} defaultChecked={agreement}></input>
                                                            
                                                        </div>
                                                        <div className='m-2'>
                                                            <p>I have read and agree to the Terms of Service and Privacy Policy</p>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div> */}
                                        </div>
                                    )
                                case 2:
                                    return(
                                        <div>
                                            <p className='text-center'>Step 2/5: <span className='text-primary-color'>Bassic Information</span></p>

                                            <div className='my-2 bg-base-grey p-4 rounded-xl border border-third-grey'>
                                                <p>Release Type<span className='text-red-500'>*</span></p>
                                                <p>Select “single” for release per 1 song, and select “album” if more than 4 songs</p>
                                                <form>
                                                    <div className=''>
                                                        <div className='flex items-center'>
                                                            <div>
                                                                <input type="radio" name="releaseType" onChange={handleInputChange} value="Single" className='cursor-pointer'></input>
                                                                {/* <input value="agreements" type="checkbox"></input> */}
                                                            </div>
                                                            <div className='m-2'>
                                                                <p>Single</p>
                                                            </div>
                                                        </div>
                                                        <div className='flex items-center'>
                                                            <div>
                                                                <input type="radio" name="releaseType" onChange={handleInputChange} value="Album" className='cursor-pointer'></input>
                                                                {/* <input value="agreements" type="checkbox"></input> */}
                                                            </div>
                                                            <div className='m-2'>
                                                                <p>Album</p>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </form>
                                            </div>

                                            <div className='my-2 bg-base-grey p-4 rounded-xl border border-third-grey'>
                                                <p>Song Type<span className='text-red-500'>*</span></p>
                                                <form>
                                                    <div className=''>
                                                        <div className='flex items-center'>
                                                            <div>
                                                                <input type="radio" onChange={handleInputChange} name="songType" value="Original Version"></input>
                                                            </div>
                                                            <div className='m-2'>
                                                                <p>Original Version</p>
                                                            </div>
                                                        </div>
                                                        <div className='flex items-center'>
                                                            <div>
                                                                <input type="radio" onChange={handleInputChange} name="songType" value="Cover Version"></input>
                                                            </div>
                                                            <div className='m-2'>
                                                                <p>Cover Version</p>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </form>
                                            </div>

                                            <div className='my-2 bg-base-grey p-4 rounded-xl border border-third-grey'>
                                                <p>Album/Single Title<span className='text-red-500'>*</span></p>
                                                <form className='text-black'>
                                                    <input 
                                                        name="title" 
                                                        placeholder='Title' 
                                                        value={contentData.title}
                                                        onChange={handleInputChange}
                                                        className='px-3 mt-4 py-2 rounded w-full'/>
                                                </form>
                                            </div>

                                            <div className='my-2 bg-base-grey p-4 rounded-xl border border-third-grey'>
                                                <p>Artist Name<span className='text-red-500'>*</span></p>
                                                <form className='text-black'>
                                                    <input 
                                                        type="text" 
                                                        name="artistName" 
                                                        placeholder='Artist Name'
                                                        value={contentData.artistName}
                                                        onChange={handleInputChange}
                                                        className='px-3 mt-4 py-2 rounded w-full'/>
                                                </form>
                                            </div>

                                            <div className='my-2 bg-base-grey p-4 rounded-xl border border-third-grey'>
                                                <p>Featuring Artist Name</p>
                                                <p>Enter the featuring artist name (if any)</p>
                                                <form className='text-black'>
                                                    <input 
                                                        type="text" 
                                                        name="featuringArtistName"
                                                        value={contentData.featuringArtistName}
                                                        onChange={handleInputChange}
                                                        placeholder='Featuring Artist Name'
                                                        className='px-3 mt-4 py-2 rounded w-full'/>
                                                </form>
                                            </div>

                                            <div className='my-2 bg-base-grey p-4 rounded-xl border border-third-grey'>
                                                <p>Track List</p>
                                                <p>List the Song Titles in the order you want, (along with feat. if available). Separate with commas. Example; First Song, Second Song (feat. Full Name), Next Song, Last Song.</p>
                                                <p className='mt-1'><i>Skip this step if the release type is not an album.</i></p>
                                                <form className='text-black'>
                                                    <input 
                                                        type="text" 
                                                        name="trackList"
                                                        value={contentData.trackList}
                                                        onChange={handleInputChange}
                                                        placeholder='Track List'
                                                        className='px-3 mt-4 py-2 rounded w-full'/>
                                                </form>
                                            </div>

                                            <div className='my-2 bg-base-grey p-4 rounded-xl border border-third-grey'>
                                                <p>Primary Genre<span className='text-red-500'>*</span></p>
                                                <form className='text-grey'>
                                                    <select id="primaryGenre" name="primaryGenre" onChange={handleInputChange} className='w-full p-2 rounded'>
                                                        {
                                                            genres.map((genre, index) => (

                                                                <option value={genre.value} key={index}>{genre.value}</option>
                                                            ))
                                                        }
                                                        
                                                        {/* <option value="Pop">Pop</option>
                                                        <option value="Jaz">Jaz</option> */}
                                                    </select>
                                                </form>
                                            </div>
                                            
                                            <div className='my-2 bg-base-grey p-4 rounded-xl border border-third-grey'>
                                                <p>Secondary Genre<span className='text-red-500'>*</span></p>
                                                <p>Must be different from the main genre</p>
                                                <form className='text-grey'>
                                                    <select id="secondaryGenre" name="secondaryGenre" onChange={handleInputChange} className='w-full p-2 rounded'>
                                                        {
                                                            genres.map((genre, index) => (

                                                                <option value={genre.value} key={index}>{genre.value}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </form>
                                            </div>
                                            
                                            <div className='my-2 bg-base-grey p-4 rounded-xl border border-third-grey'>
                                                <p>Production Year<span className='text-red-500'>*</span></p>
                                                <p>The year your work was created or recorded. Generally Platforms will display it with the symbol: ©</p>
                                                <form className='text-black'>
                                                    <input 
                                                        type="number" 
                                                        name="productionYear" 
                                                        placeholder='Production Year'
                                                        value={contentData.productionYear}
                                                        onChange={handleInputChange}
                                                        className='px-3 mt-4 py-2 rounded w-full'/>
                                                </form>
                                            </div>

                                            <div className='my-2 bg-base-grey p-4 rounded-xl border border-third-grey'>
                                                <p>Language<span className='text-red-500'>*</span></p>
                                                <p>The main language used in the song lyrics</p>
                                                <form className='text-grey'>
                                                    <select id="language" name="language" onChange={handleInputChange}  className='w-full p-2 rounded'>
                                                        {
                                                            language.map((data, index) => (
                                                                <option value={data.name} key={index}>{data.name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </form>
                                            </div>
                                            <div className='my-2 bg-base-grey p-4 rounded-xl border border-third-grey'>
                                                <p>Explicit Content<span className='text-red-500'>*</span></p>
                                                <form>
                                                    <div className=''>
                                                        <div className='flex items-center'>
                                                            <div>
                                                                <input type="radio" onChange={handleInputChange} name="explicitContent" value="Yes"></input>
                                                            </div>
                                                            <div className='m-2'>
                                                                <p>Yes</p>
                                                            </div>
                                                        </div>
                                                        <div className='flex items-center'>
                                                            <div>
                                                                <input type="radio" onChange={handleInputChange} name="explicitContent" value="No"></input>
                                                            </div>
                                                            <div className='m-2'>
                                                                <p>No</p>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    )
                                case 3:
                                    return(
                                        <div>
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                {fields.map((item, index) => {
                                                    return (
                                                        <div key={item.id}>
                                                            <div className='my-2 bg-base-grey p-4 rounded-xl border border-third-grey' key="0">
                                                                <p>Track Name - {index}</p>
                                                                <input 
                                                                    key="input-0"
                                                                    type="text"
                                                                    name={`trackData.${index}.trackName`}
                                                                    placeholder='Type Here'
                                                                    className='px-3 mt-4 py-2 rounded w-full text-black'
                                                                    {...register(`trackData.${index}.trackName`, { required: true })}/>
                                                                <input 
                                                                    className='mt-2 text-white'
                                                                    name={`trackData.${index}.file`}
                                                                    type="file"
                                                                    id="artWorkFile"
                                                                    {...register(`trackData.${index}.file`, { required: true })}/>
                                                                <div className='flex justify-end'>
                                                                    <button 
                                                                        className='text-red-500' 
                                                                        type="button" 
                                                                        onClick={() => {
                                                                            remove(index)
                                                                            let temp = trackCount -1; 
                                                                            setTrackCount(temp)
                                                                            }
                                                                        }>
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                        // <li key={item.id}>
                                                        //     <input
                                                        //         {...register(`trackData.${index}.trackName`, { required: true })}
                                                        //     />

                                                        //     <input
                                                        //         type="file"
                                                        //         render={({ field }) => <input {...field} />}
                                                        //         name={`trackData.${index}.file`}
                                                        //         control={control}
                                                        //     />
                                                            // <button type="button" onClick={() => remove(index)}>
                                                            //     Delete
                                                            // </button>
                                                        // </li>
                                                    );
                                                })}
                                                <div className='flex justify-between'>
                                                    <div>
                                                        <p className='text-right'>Total Tracks Added: {trackCount}</p>
                                                    </div>
                                                    <div onClick={() => {
                                                            insert(2, {
                                                                trackName: "",
                                                                file: ""
                                                            })
                                                            let temp = trackCount + 1;
                                                            setTrackCount(temp);
                                                        }
                                                    }>
                                                        <p className='text-right text-primary-color'><u>Add more tracks</u></p>
                                                    </div>
                                                </div>

                                                <input className='px-2 py-1 bg-primary-color text-black rounded-md text-md' type="submit" value="Upload"/>
                                            </form>
                                        </div>
                                        // <div>
                                        //     <p className='text-center'>Step 3/5: <span className='text-primary-color'>Upload Audio</span></p>
                                        //     <div className='my-2 bg-base-grey p-4 rounded-xl border border-third-grey'>
                                        //         <p>Audio Guidelines</p>
                                        //         <p>We allow the following audio file types: <br/>High Quality MP3 - 320kbps - 44.1khz<br/>High Quality FLAC - 44.1khz</p>
                                        //     </div>
                                        //     <div className='my-2 bg-base-grey p-4 rounded-xl border border-third-grey' key="0">
                                        //         <p>Track Name</p>
                                        //         <form className='text-black'>
                                        //             <input 
                                        //                 key="input-0"
                                        //                 type="text" 
                                        //                 name="trackName" 
                                        //                 placeholder='Type Here'
                                        //                 onChange={handleInputTrack}
                                        //                 className='px-3 mt-4 py-2 rounded w-full'/>
                                        //             <input className='mt-2 text-white' type="file"
                                        //                 id="artWorkFile" onChange={handleInputTrack.bind(0)} name="artWorkFile"/>
                                        //         </form>
                                        //     </div>
                                        //     {trackForm}
                                            
                                        //     <div className='flex justify-between'>
                                        //         <div>
                                        //             <p className='text-right'>Total Tracks Added: {trackCount}</p>
                                        //         </div>
                                        //         <div onClick={handleAddTrack}>
                                        //             <p className='text-right text-primary-color'><u>Add more tracks</u></p>
                                        //         </div>
                                        //     </div>
                                        // </div>
                                    )

                                case 4:
                                    return(
                                        <div>
                                            {/* <div className='my-2 bg-base-grey p-4 rounded-xl border border-third-grey' key="asd">
                                                <p>Track Name</p>
                                                <form className='text-black'>
                                                    <input 
                                                        type="text" 
                                                        name="trackName" 
                                                        placeholder='Type Here'
                                                        onChange={handleInputChange}
                                                        className='px-3 mt-4 py-2 rounded w-full'/>
                                                    <input className='mt-2 text-white' type="file"
                                                        id="artWorkFile" name="artWorkFile"/>
                                                </form>
                                            </div> */}
                                            <p className='text-center'>Step 4/5: <span className='text-primary-color'>Upload Artwork</span></p>
                                            <div className='my-2 bg-base-grey p-4 rounded-xl border border-third-grey'>
                                                <p><b>Style Guidelines</b></p>  
                                                <div className='flex mt-4'>
                                                    <div>
                                                        <div className='flex mt-2'>
                                                            <img src={CheckIcon} className="w-4"></img>
                                                            <p>3000px * 3000px</p>
                                                        </div>
                                                        <div className='flex mt-2'>
                                                            <img src={CheckIcon} className="w-4"></img>
                                                            <p>Professional quality & relevant images</p>
                                                        </div>
                                                        <div className='flex mt-2'>
                                                            <img src={CheckIcon} className="w-4"></img>
                                                            <p>Less than 25MB</p>
                                                        </div>
                                                        <div className='flex mt-2'>
                                                            <img src={CheckIcon} className="w-4"></img>
                                                            <p>RGB Colour Space</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='flex mt-2'>
                                                            <img src={TimesRedIcon} className="w-4"></img>
                                                            <p>Website URL</p>
                                                        </div>
                                                        <div className='flex mt-2'>
                                                            <img src={TimesRedIcon} className="w-5"></img>
                                                            <p>Contact information (i.e. email address, phone number etc.)</p>
                                                        </div>
                                                        <div className='flex mt-2'>
                                                            <img src={TimesRedIcon} className="w-4"></img>
                                                            <p>Pornographic images</p>
                                                        </div>
                                                        <div className='flex mt-2'>
                                                            <img src={TimesRedIcon} className="w-4"></img>
                                                            <p>Pricing information</p>
                                                        </div>
                                                        <div className='flex mt-2'>
                                                            <img src={TimesRedIcon} className="w-4"></img>
                                                            <p>Copyrighted images</p>
                                                        </div>
                                                        <div className='flex mt-2'>
                                                            <img src={TimesRedIcon} className="w-4"></img>
                                                            <p>Scan of a CD (must be retail ready artwork)</p>
                                                        </div>
                                                        <div className='flex mt-2'>
                                                            <img src={TimesRedIcon} className="w-4"></img>
                                                            <p>Blurry or pixelated images</p>
                                                        </div>
                                                    </div>
                                                    
                                                </div> 
                                            </div>
                                            <div className='my-2 bg-base-grey p-4 rounded-xl border border-third-grey'>
                                                <div className='flex p-1 justify-center h-full border rounded-xl border-dashed border-primary-color'>
                                                    <div className='relative flex flex-col justify-center items-center'>
                                                        <div className='absolute'>
                                                            <input className='h-20 w-fit opacity-0' type="file" onChange={handleFileChange} id="artWorkFile" name="artWorkFile"/>
                                                        </div>
                                                        <div>
                                                            <img src={FileUploadLogo}></img>
                                                        </div>
                                                        <div>
                                                            {contentData.artWorkFile != "" ? <p className='text-center'>{contentData.artWorkFile}</p>  : <p className='text-center'>Select file to upload or<br/>drag and drop your artwork here</p>}
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                case 5:
                                    return(
                                        <div>
                                            <p className='text-center'>Step 5/5: <span className='text-primary-color'>Billing</span></p>
                                            <div className='my-2 bg-base-grey p-4 rounded-xl border border-third-grey'>
                                                <div className='mt-4'>
                                                    <p>Total Transaction : </p>
                                                    <p className='text-primary-color text-xl text-center font-bold m-5'>Rp. {paymentData.payment[0].totalBill}</p>
                                                    
                                                    <div className='h-full mt-4'>
                                                        <p>Trasfer to :</p>
                                                        <p>BCA : 8950443171 - Fathurrahman Nur Aziz</p>
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className='my-2 bg-base-grey p-4 rounded-xl border border-third-grey'>
                                                <div className='m-4'>
                                                    <div>
                                                        <p>Note : </p>
                                                        <p>After you transfer please confirm your payment to the following contact.</p>
                                                        <a href={`https://wa.me/085229222123?text=transaction+confirmation+from+id+${paymentData._id}`} className="text-primary-color"><u>Whatsapp</u></a>
                                                    </div>
                                                </div> 
                                            </div>
                                        </div>
                                    )
                                default:
                                    return null;
                            }
                        })()}
                    </div>
                    <div className='flex justify-between px-5 pb-16'>
                        <div ref={buttonPreviousRef} onClick={handlePrevious} className='bg-primary-color rounded-xl text-grey px-4 py-1 mt-10 cursor-pointer'>
                            <h1 className='text-center p-2 text-md'>Previous</h1>
                        </div>
                        <div onClick={handleNextButton} className='bg-primary-color rounded-xl text-grey px-4 py-1 mt-10 cursor-pointer'>
                            <h1 className='text-center p-2 text-md'>Save and Continue</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewRelease
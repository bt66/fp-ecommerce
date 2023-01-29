import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    BookmarkSquareIcon,
    CalendarIcon,
    LifebuoyIcon,
    ShieldCheckIcon,
    XMarkIcon,
    HomeIcon,
    ShoppingBagIcon,
    ScaleIcon,
    QuestionMarkCircleIcon


} from '@heroicons/react/24/outline'
import LogoSubmitMusik from '../assets/LOGO.svg'
import { Link, useNavigate } from "react-router-dom";
import { useRef } from 'react';

const solutions = [
    {
    name: 'Home',
    description: 'Get a better understanding of where your traffic is coming from.',
    href: '#',
    Link: '/',
    icon: HomeIcon,
    },
    {
    name: 'Upload',
    description: 'Speak directly to your customers in a more meaningful way.',
    href: '#',
    Link: '/userDashboard',
    icon: ShoppingBagIcon,
    },
    {
    name: 'Pricing',
    description: "Connect with third-party tools that you're already using.",
    href: '#',
    Link: '/Pricing',
    icon: ScaleIcon,
    },
    {
    name: 'Help Desk',
    description: 'Build strategic funnels that will drive your customers to convert',
    href: '#',
    Link: '/HelpDesk',
    icon: QuestionMarkCircleIcon,
    },
]
const resources = [
    {
        name: 'Help Center',
        description: 'Get all of your questions answered in our forums or contact support.',
        href: '#',
        icon: LifebuoyIcon,
    },
    {
        name: 'Guides',
        description: 'Learn how to maximize our platform to get the most out of it.',
        href: '#',
        icon: BookmarkSquareIcon,
    },
    {
        name: 'Events',
        description: 'See what meet-ups and other events we might be planning near you.',
        href: '#',
        icon: CalendarIcon,
    },
    { name: 'Security', description: 'Understand how we take your privacy seriously.', href: '#', icon: ShieldCheckIcon },
]
// const recentPosts = [
//     { id: 1, name: 'Boost your conversion rate', href: '#' },
//     { id: 2, name: 'How to use search engine optimization to drive traffic to your site', href: '#' },
//     { id: 3, name: 'Improve your customer experience', href: '#' },
// ]

// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
// }

export default function Header(props) {

    const navigate = useNavigate();
    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem("token")
        navigate("/")
    }
    const executeScroll = () => {
        navigate("/")
        props.pricingRef.current.scrollIntoView()
        
    } 

    if(localStorage.getItem("token")== null || undefined){
        return (
            <Popover className="sticky bg-default-dark bg-opacity-0 top-0 z-10">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
                    <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
                        <div className="flex justify-start lg:w-0 lg:flex-1">
                            <a href="#">
                                <span className="sr-only">SubmitMusic</span>
                                <img
                                className="h-8 w-auto sm:h-10"
                                src={LogoSubmitMusik}
                                alt=""
                                />
                            </a>
                        </div>
                        <div className="-my-2 -mr-2 md:hidden">
                            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-default-dark p-2 text-gray-400 hover:default-dark hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </Popover.Button>
                        </div>
                        <Popover.Group as="nav" className="hidden space-x-10 md:flex">
                            <Link to={`/`} className="text-base font-medium text-white hover:text-white">
                                Home
                            </Link>
                            <Link to={'/login'}>
                                <a href="#" className="text-base font-medium text-white hover:text-white">
                                    Upload
                                </a>
                            </Link>
                            <a onClick={executeScroll} className="text-base font-medium text-white hover:text-white">
                                Pricing
                            </a>
                            <Link to={`/HelpDesk`} className="text-base font-medium text-white hover:text-white">
                                Help Desk
                            </Link>
                        </Popover.Group>
                        <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                            <Link to={`/SignUp`} className="border-1 border-slate-300 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-btn-primary px-4 py-2 text-base font-medium text-black shadow-sm hover:bg-yellow-500">
                                    Sign Up
                            </Link>
                            <Link to={`/login`} className="border-2 ml-8 border-slate-300 px-4 py-2 rounded-md whitespace-nowrap text-base font-medium text-white hover:text-white hover:border-slate-400">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
    
                <Transition
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                >
                <Popover.Panel focus className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
                    <div className="divide-y-2 divide-gray-50 rounded-lg bg-default-dark shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="px-5 pt-5 pb-6">
                        <div className="flex items-center justify-between">
                        <div>
                            <img
                            className="h-8 w-auto"
                            src={LogoSubmitMusik}
                            alt="Submit Mucik"
                            />
                        </div>
                        <div className="-mr-2">
                            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-default-dark p-2 text-gray-400 hover:default-dark hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </Popover.Button>
                        </div>
                        </div>
                        <div className="mt-6">
                        <nav className="grid gap-y-8">
                            {solutions.map((item) => (
                                <Link key={item.Link} to={item.Link}>
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                                    >
                                        <item.icon className="h-6 w-6 flex-shrink-0 text-indigo-600" aria-hidden="true" />
                                        <span className="ml-3 text-base font-medium text-white">{item.name}</span>
                                    </a>
                                </Link>
                            ))}
                        </nav>
                        </div>
                    </div>
                    <div className="space-y-6 py-6 px-5">
                        <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                        <a onClick={executeScroll} className="text-base font-medium text-white hover:text-gray-700">
                            Pricing
                        </a>
    
                        <a href="#" className="text-base font-medium text-white hover:text-gray-700">
                            Docs
                        </a>
                        {resources.map((item) => (
                            <a
                            key={item.name}
                            href={item.href}
                            className="text-base font-medium text-white hover:text-gray-700"
                            >
                            {item.name}
                            </a>
                        ))}
                        </div>
                        <div>
                        <Link to={`/SignUp`}>
                            <a
                                href="#"
                                className="flex w-full items-center justify-center rounded-md border border-transparent bg-yellow-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-yellow-700"
                            >
                                Sign up
                            </a>
                        </Link>
                        <Link to={`/login`}>
                            <p className="mt-6 text-center text-base font-medium text-gray-500">
                                Existing customer?{' '}
                                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                                Sign in
                                </a>
                            </p>
                        </Link>
                        </div>
                    </div>
                    </div>
                </Popover.Panel>
                </Transition>
            </Popover>
        )
    }else {
        return (
            <Popover className="sticky bg-default-dark bg-opacity-0 top-0 z-10">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
                    <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
                        <div className="flex justify-start lg:w-0 lg:flex-1">
                            <a href="#">
                                <span className="sr-only">SubmitMusic</span>
                                <img
                                className="h-8 w-auto sm:h-10"
                                src={LogoSubmitMusik}
                                alt=""
                                />
                            </a>
                        </div>
                        <div className="-my-2 -mr-2 md:hidden">
                            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-default-dark p-2 text-gray-400 hover:default-dark hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </Popover.Button>
                        </div>
                        <Popover.Group as="nav" className="hidden space-x-10 md:flex">
                            <Link to={`/`} className="text-base font-medium text-white hover:text-white">
                                Home
                            </Link>
                            <Link to={'/userDashboard'}>
                                <a href="#" className="text-base font-medium text-white hover:text-white">
                                    Upload
                                </a>
                            </Link>
                            <a onClick={executeScroll} className="text-base font-medium text-white hover:text-white">
                                Pricing
                            </a>
                            <Link to={`/HelpDesk`} className="text-base font-medium text-white hover:text-white">
                                Help Desk
                            </Link>
                        </Popover.Group>
                        <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                            <Link to={`/`} onClick={handleLogout} className="border-2 ml-8 border-slate-300 px-4 py-2 rounded-md whitespace-nowrap text-base font-medium text-white hover:text-white hover:border-slate-400">
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
    
                <Transition
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                >
                <Popover.Panel focus className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
                    <div className="divide-y-2 divide-gray-50 rounded-lg bg-default-dark shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="px-5 pt-5 pb-6">
                        <div className="flex items-center justify-between">
                        <div>
                            <img
                            className="h-8 w-auto"
                            src={LogoSubmitMusik}
                            alt="Submit Mucik"
                            />
                        </div>
                        <div className="-mr-2">
                            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-default-dark p-2 text-gray-400 hover:default-dark hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </Popover.Button>
                        </div>
                        </div>
                        <div className="mt-6">
                        <nav className="grid gap-y-8">
                            {solutions.map((item) => (
                                <Link key={item.Link} to={item.Link}>
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                                    >
                                        <item.icon className="h-6 w-6 flex-shrink-0 text-indigo-600" aria-hidden="true" />
                                        <span className="ml-3 text-base font-medium text-white">{item.name}</span>
                                    </a>
                                </Link>
                            ))}
                        </nav>
                        </div>
                    </div>
                    <div className="space-y-6 py-6 px-5">
                        <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                        <a href="#" className="text-base font-medium text-white hover:text-gray-700">
                            Pricing
                        </a>
    
                        <a href="#" className="text-base font-medium text-white hover:text-gray-700">
                            Docs
                        </a>
                        {resources.map((item) => (
                            <a
                            key={item.name}
                            href={item.href}
                            className="text-base font-medium text-white hover:text-gray-700"
                            >
                            {item.name}
                            </a>
                        ))}
                        </div>
                        <div>
                        <Link to={`/`} onClick={handleLogout}>
                            <p className="mt-6 text-center text-base font-medium text-gray-500">
                                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                                    Logout
                                </a>
                            </p>
                        </Link>
                        </div>
                    </div>
                    </div>
                </Popover.Panel>
                </Transition>
            </Popover>
        )
    }
}
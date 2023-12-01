import React, { useState } from 'react'
import { HeartLeftIcon, HeartRightIcon, PolygonIcon, SearchIcon } from '../common/CustomIcon'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
    const [close, setClose] = useState(false)
    return (
        <>
            <nav className="bg-gradient-to-l from-purple-500 to-pink-500">
                <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className='flex'>
                                    <HeartLeftIcon height={34} width={40} />
                                    <div className="text-white font-[Montserrat] text-3xl mx-5">
                                       <Link to={'/'}>Future Love</Link> 
                                    </div>
                                    <HeartRightIcon width={40} height={34} />
                                </div>
                            </div>
                            <div className="hidden md:block ml-20">
                                <div className="relative">
                                    <div className="flex items-center">
                                        <input
                                            type="text"
                                            className=" pl-14 pr-16 py-3 border rounded-[20px] font-[Montserrat]"
                                            placeholder="Search..."
                                        />
                                        <div className="absolute left-3 cursor-pointer top-1/2 transform -translate-y-1/2">
                                            <SearchIcon width={20} height={20} className="text-gray-400 " />
                                        </div>
                                        <div className="absolute right-3 cursor-pointer top-1/2 transform -translate-y-1/2">
                                            <PolygonIcon width={12} height={10} className="text-gray-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">
                                <NavLink to={'http://datanomic.online/login'}>
                                    <button
                                        type="button"
                                        className="text-white bg-blue-700  font-[Montserrat] text-2xl rounded-[10px] px-3 py-3 text-center justify-center items-center mr-1"

                                    >
                                        Login
                                    </button>
                                </NavLink>

                                <NavLink to={'http://datanomic.online/register'}>
                                    <button
                                        type="button"
                                        className="text-white bg-blue-700 text-2xl  font-[Montserrat] rounded-[10px] px-3 py-3 text-center mr-1 justify-center items-center"
                                    >
                                        Register
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                        <div className="-mr-2 flex md:hidden">
                            {!close ? <button onClick={() => setClose(true)} type="button" className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" aria-controls="mobile-menu" aria-expanded="false">
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Open main menu</span>
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </button> : ""}
                            {close ? <button onClick={() => setClose(false)} type="button" className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" aria-controls="mobile-menu" aria-expanded="false">
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Open main menu</span>
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button> : ""}
                        </div>
                    </div>
                </div>

                {close ? <div className="md:hidden" id="mobile-menu">
                    <div className="border-t border-gray-700 pb-3 pt-4">
                        <div className="mt-3 space-y-1 px-2">
                            <a href="http://datanomic.online/login" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Login</a>
                            <a href="http://datanomic.online/register" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Register</a>
                        </div>
                    </div>
                </div> : ""}
            </nav>
        </>
    )
}

export default Header
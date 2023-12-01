import React from "react";
import { Link, NavLink } from "react-router-dom";

function Modal({ hiddenModal }) {
    const userAgent = window.navigator.userAgent
    const androidMatch = userAgent.match(/Android/i)
    const iosMatch = userAgent.match(/Os/i)
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75">
            <div className="w-6/12">
                <div className="px-6 py-3 h-10 bg-gray-600 text-left text-xs font-medium text-black uppercase tracking-wider rounded-tr-[20px] rounded-tl-[20px]">
                    <button onClick={hiddenModal} className="float-right top-0">
                        <i className="fas fa-times" style={{ fontSize: 20 }} />
                    </button>
                </div>
                <div className="py-10 h-900 bg-gray-100 rounded-br-[20px] rounded-bl-[20px]">
                    <div className=" flex justify-center items-center">
                        <NavLink to={'http://datanomic.online/login'}><button
                            type="button"
                            className="text-white font-[Montserrat] text-2xl bg-blue-700 px-3 py-3 rounded-lg"
                        >
                            Login
                        </button></NavLink>
                        <NavLink to={'http://datanomic.online/register'}><button
                            type="button"
                            className="text-white font-[Montserrat] text-2xl bg-blue-700 px-3 py-3 ml-5 rounded-lg"
                        >
                            Register
                        </button></NavLink>
                    </div>
                    <div className="flex justify-center items-center mt-5">
                        <Link to={`${androidMatch ? "https://play.google.com/store/apps/details?id=com.thinkdiffai.futurelove" : `${iosMatch ? "https://play.google.com/store/apps/details?id=com.thinkdiffai.futurelove" : "https://play.google.com/store/apps/details?id=com.thinkdiffai.futurelove"}`}`}><button className="bg-purple-950 font-[Montserrat] text-2xl  px-5 py-5 text-white rounded-lg hover:bg-purple-600">Free Download</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
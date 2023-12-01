// Footer.jsx
import React from 'react';
import logo from "../components/image/lo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';


const Footer = () => {
  return (
    <footer className="bg-orange-700 text-white py-8">
      <div className="container mx-auto flex justify-between items-center">
        <img src={logo} className="text-xl font-bold" style={{ width: '200px', height: 'auto' }}></img>
        <ul className="flex flex-col space-x-4 font-serif font-medium items-center justify-center  lg:text-2xl">
         <li><a href="https://www.facebook.com/profile.php?id=61553894285512" className="text-white flex p-4 lg:text-3xl"><i className='fab fa-facebook mr-2'></i>Contact Fanpage Facebook</a></li>
          <li><a href="#" className="text-white flex p-4 "><FontAwesomeIcon icon={faPhone} className="mr-2" />  0582.296.888</a></li>
          
          <li><a href="#" className="text-white flex p-4"><FontAwesomeIcon icon={faEnvelope} className="mr-2" />hr@thinkdiff.us</a></li>
          <li><a href="#" className="text-white flex p-4"><FontAwesomeIcon icon={faMapMarker}className="mr-2" /> Số 30 Đường Louis 7,Louis City,Hà Nội,Vietnam</a></li>
        </ul>
      </div>
      <div className="text-center mt-4 font-serif font-medium lg:text-2xl">
        &copy; Copyright © 2023 ThinkDiff. All rights reserved.
      </div>
    </footer>

  );
};

export default Footer;

import React, { useState } from 'react'
import Header from './Header';
import Post from './Post';
import Cart from "./Cart/index";
import Modal from './Modal';

const YoutubeScandal = () => {
  const [isShow, setIsShow] = useState(false);
  const showModal = () => {
    setIsShow(true);
  };
  const hiddenModal = () => {
    setIsShow(false);
  };
  return (
    <div style={{ backgroundColor: "#F0F2F5" }} className="w-full">
      <Header />
      <Post showModal={showModal} />
      <Cart />
      {isShow && <Modal hiddenModal={hiddenModal} />}
    </div>
  );
}

export default YoutubeScandal

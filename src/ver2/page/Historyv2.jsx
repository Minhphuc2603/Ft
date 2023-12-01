// import Header from "../components/Header";
import EventHistory from "../components/eventHistory";
import Comments from "../components/comments";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ios from "../page/app/img/ios.png"
import adroi from "../page/app/img/adroi.png"
import { BsFillHeartFill } from "react-icons/bs";
import { SlMenu } from "react-icons/sl";
import useEvenStore from "../../utils/store";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import platform from 'platform';

function Historyv2() {
  const [search_w, keyWord] = useState("");
  const [dataSearch, setDataSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const version = useEvenStore((state) => state.version);
  const setVersion = useEvenStore((state) => state.setVersion);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
  };
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const toggleVersion = () => {
    navigate("/love");
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [link, setLink] = useState("")

  useEffect(() => {
    const os = platform.os.family;

    if (os === 'iOS') {
      setModalContent(ios);
      setIsModalOpen(true);
      setLink("https://apps.apple.com/us/app/futurelove-ai-love-future/id6463770787")    
    } else if (os === 'Android') {
      setModalContent(adroi);
      setIsModalOpen(true);
      setLink("https://play.google.com/store/apps/details?id=com.thinkdiffai.futurelove")
    } else {
      console.log('Đây là laptop');
    }
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };



  const onSearch = (value) => {
    if (value === "") {
      axios
        .get(`https://metatechvn.store/lovehistory/page/1`)
        .then((response) => {
          setDataSearch(response.data.list_sukien);
        });
    }
    axios
      .get(`https://metatechvn.store/search?word=${value}`)
      .then((response) => {
        setDataSearch(response.data.list_sukien);
      });
  };
  return (
    <div
      className=" Historyv2 flex flex-col min-h-screen overflow-hidden"
      style={{ background: "linear-gradient(to right, #F0A3BF, #A86ED4)" }}
    >
      <Header onSearch={onSearch} />
      <b className="starborn text-white lg:text-5xl text-3xl ml-12 mb-3 ">
        Events
      </b>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-6 sm:mx-10 lg:mx-16 justify-center">
        <div className="flex justify-center">
          <div className="flex-grow">
            <EventHistory search={search_w} data={dataSearch} />
          </div>
        </div>
        <div>
          <Comments />
        </div>
      </div>
      <Footer />
      {isModalOpen && (
        <div className=" inset-0 flex items-center justify-center absolute">
          <div className="bg-black opacity-50 fixed inset-0"></div>
          <div className="bg-white p-8 rounded-md z-10 text-center">
            <h2 className="text-2xl font-bold mb-4">Dowload App</h2>
            <Link to={link}>
              <img src={modalContent} alt="ios" style={{ width: "200px" }} />
            </Link>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white py-2 px-4 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Historyv2;

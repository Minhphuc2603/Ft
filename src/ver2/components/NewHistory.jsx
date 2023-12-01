import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import axios from "axios";
import CommonEvent from "../page/app/CommonEvent"
import nam1 from "./image/nam1.png";
import nu1 from "./image/nu1.png";
import { useParams } from "react-router";
import ReactLoading from "react-loading";
import noAvatar from "./image/no-avatar.png";
import { createBrowserHistory } from "history";
import no_avatar from "./image/no-avatar.png";
import ImagePopup from "../page/app/ImagePopup";
import { Link } from "react-router-dom";
import EmptyTemplate from "../page/app/template/EmptyTemplate";

export default function NewHistory() {
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const { id } = useParams();

  const [dataUser, setDataUser] = useState(null);
  const [dataUser1, setDataUser1] = useState(null);
  const [isActive, setIsActive] = useState(1);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const history = createBrowserHistory();
  const [dataComment, setDataComment] = useState([]);
  const params = window.location.href;
  const arrayUrl = params.split("/");
  const stt_su_kien = arrayUrl[arrayUrl.length - 1];
 
  


  // Show cmt
  const [showMoreStates, setShowMoreStates] = useState({});
  const showCmt = (id) => {
    setShowMoreStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      history.push(`/detail/${id}/${newPage}`);
    }
  };
  
  const userInfo = JSON.parse(window.localStorage.getItem("user-info"));
  const id_user = userInfo && userInfo.id_user;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      history.push(`/detail/${id}/${newPage}`);
    }
  };
  useEffect(() => {
    axios
      .get(
        `https://metatechvn.store/lovehistory/comment/${stt_su_kien}?id_toan_bo_su_kien=${id}`
      )
      .then((response) => {
        setDataComment(response.data.comment);
        console.log(response.data.comment);
      });
  }, [params]);

  const fetchDataUser = async () => {
    try {
      const response = await axios.get(
        `https://metatechvn.store/lovehistory/${id}`
      );
      setDataUser(response.data.sukien[0]);
      setDataUser1(response.data.sukien);
      console.log(response.data.sukien)
    } catch (err) {
      console.log(err);
    }
  };


  const redirect = (e) => {
    setIsActive(e);
    setIsOpenSidebar(false);
    const newUrl = `/detail/${id}/${e}`;
    history.replace(newUrl);
  };

  useEffect(() => {
    fetchDataUser();
    const currentTab = parseInt(stt_su_kien);
    setIsActive(currentTab);
  }, []);
  const handleSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  const handleOpenImagePopup = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsImagePopupOpen(true);
  };

  const renderLoading = (isLoading) => {
    if (isLoading) {
      return (
        <div className="fixed top-0 min-w-[100%] h-[100vh] z-[99]">
          <div className="absolute top-0 min-w-[100%] h-[100vh] bg-black opacity-70"></div>
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
            }}
            className="absolute -translate-x-2/4 opacity-100 -translate-y-2/4 left-2/4 top-2/4 z-20"
          >
            <ReactLoading type={"bars"} color={"#C0C0C0"} />
          </div>
        </div>
      );
    }
    return null;
  };


  return (
    <>
      <div
        className=" min-h-screen overflow-hidden"
        style={{ background: "linear-gradient(to right, pink, violet)" }}
      >
        <Header onClick={handleSidebar} />
        <div className="grid grid-cols-12">

          {isOpenSidebar && (
            <div
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",

              }}
              className="lg:hidden block"
            />
          )}
          <div
            className={`lg:col-span-3 z-[10] bg-menu lg:block ${isOpenSidebar
              ? "col-span-8 sm:col-span-6 transition-all transform duration-300 ease-linear block opacity-100 absolute top-0 left-0 bottom-0 h-full overflow-auto"
              : "transition-all transform hidden duration-300 ease-out "
              }`}
            style={{
              overflowY: 'auto'
            }}
          >
            <div className="scroll-container lg:h-[30%] lg:w-[100%] flex items-center justify-center mt-4">
              <div
                style={{
                  backgroundImage: `url(${nam1})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  overflow: "hidden",
                }}
                className="lg:w-[150px] lg:h-[150px] w-[90px] h-[90px] object-cover"
              >
                <img
                  src={dataUser?.link_nam_goc}
                  alt=""
                  className="lg:w-[80%] lg:h-[80%] w-[80%] h-[80%] object-cover  rounded-full lg:mt-[25px] lg:ml-[6px] mt-6 ml-2"
                  onClick={() => handleOpenImagePopup(dataUser.link_nam_goc)}
                />
              </div>
              <div
                style={{
                  backgroundImage: `url(${nu1})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  overflow: "hidden",
                }}
                className="lg:w-[150px] lg:h-[150px] w-[90px] h-[90px]"
              >
                <img
                  src={dataUser?.link_nu_goc}
                  alt=""
                  className="lg:w-[80%] lg:h-[80%] w-[80%] h-[80%] object-fill  rounded-full lg:mt-[25px] ml-6 mt-2 lg:ml-9"
                  onClick={() => handleOpenImagePopup(dataUser.link_nu_goc)}
                />
              </div>
            </div>
            <div className=" lg:text-[26px] font-[Montserrat] mb-8 text-2xl flex justify-center font-bold text-[#FFFFFF] text-center">
              Event creator:
              <Link to={`/user/${dataUser?.id_user}`}>
                {dataUser?.user_name_tao_sk}
              </Link>
            </div>
            <div className="slab lg:text-[26px] text-2xl font-bold text-[#FFFFFF]">
              <div className=" flex justify-center">
                <ul className="flex flex-col gap-y-8 w-full ">
                  {dataUser1 && dataUser1.map((item, index) => (
                    <li
                      key={index}
                      className={`cursor-pointer flex  text-center justify-center items-center hover:bg-[#782353] rounded-3xl lg:py-10 lg:px-36 py-6 px-2 ${isActive === item.so_thu_tu_su_kien
                        ? "bg-[#782353] text-white" : ""}`}
                      onClick={() => redirect(item.so_thu_tu_su_kien
                      )}
                    >
                      {item.ten_su_kien}
                    </li>
                  ))}
                  {dataUser?.id_user === id_user ?(
                    <li className={`cursor-pointer flex  text-center justify-center items-center hover:bg-[#d34229] rounded-3xl lg:py-10 lg:px-36 py-6 px-2 ${isActive === 0
                      ? "bg-[#d32929] text-white" : ""}`}
                      onClick={() => redirect(0
                      )}>
                      Add Event
                    </li>
                  ):(" ")}          
                </ul>
              </div>
            </div>
          </div>
          <div className="lg:col-span-9 col-span-12 bg-D9D9D9 min-h-screen">
            <aside>
              {isActive === 0 ? (
                <EmptyTemplate />
              ) : (
                dataUser1 && dataUser1.map((item) => (
                  isActive === item.so_thu_tu_su_kien && (
                    <CommonEvent key={item.so_thu_tu_su_kien} stt={item.so_thu_tu_su_kien} />
                  )
                ))
              )}
            </aside>
            <div className="flex justify-between items-center overflow-auto lg:hidden">
              {dataUser1 && dataUser1.map((item, index) => (
                <li
                  key={index}
                  className={`cursor-pointer flex  text-center justify-center items-center hover:bg-[#782353] rounded-3xl lg:py-10 lg:px-36 py-6 px-2 ${isActive === item.so_thu_tu_su_kien
                    ? "bg-[#782353] text-white" : ""}`}
                  onClick={() => redirect(item.so_thu_tu_su_kien
                  )}
                >
                  {item.ten_su_kien}
                </li>
              ))}
            </div>

            <div className="flex flex-col pt-10 mb-16 w-full font-[Montserrat] ">

              {dataComment.map((item, index) => {
                const isShowingFullText = showMoreStates[item.id_comment];
                if (index < 1) {
                  return (
                    <div className="flex flex-col gap-y-4 px-4 py-3 mx-4 border border-gray-400 rounded-md shadow-md hover:bg-gray-100">
                      <div className="flex items-center gap-x-4">
                        {item.avatar_user &&
                          item.avatar_user.startsWith("http") ? (
                          <img
                            src={item.avatar_user}
                            alt=""
                            className="w-16 h-16 rounded-full"
                          />
                        ) : (
                          <img
                            src={no_avatar}
                            alt=""
                            className="w-16 h-16 rounded-full"
                          />
                        )}
                        <div className="flex-grow">
                          <h3 className="text-3xl font-semibold">
                            {item.user_name ? item.user_name : "Guest"}
                          </h3>
                          <div className="text-2xl font-normal break-words">
                            <span
                              className={
                                isShowingFullText ? "text-base" : "text-xl"
                              }
                            >
                              {isShowingFullText
                                ? item.noi_dung_cmt
                                : `${item.noi_dung_cmt.substring(0, 260)}`}
                            </span>
                            {item.noi_dung_cmt.length > 256 && (
                              <span
                                className="text-base hover:underline cursor-pointer"
                                onClick={() => showCmt(item.id_comment)}
                                style={{ color: "blue" }}
                              >
                                {isShowingFullText ? "UnLess" : "Show more"}
                              </span>
                            )}
                          </div>
                          {item.imageattach && (
                            <img
                              src={item.imageattach}
                              className="w-[150px] h-[120px] mt-[10px] cursor-pointer"
                              alt="avt"
                              onClick={() =>
                                handleOpenImagePopup(item.imageattach)
                              }
                            />
                          )}
                        </div>
                      </div>
                      <div className="flex flex-row justify-end gap-x-4">
                        <div className="text-lg text-gray-600">
                          {item.device_cmt}
                        </div>
                        <div className="text-lg text-gray-600">
                          {item.thoi_gian_release}
                        </div>
                        <div className="text-lg text-gray-600">
                          <p>{item.dia_chi_ip}</p>
                          <p>{item.location}</p>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
              {dataComment.length > 10 && (
                <div className="flex justify-center items-center mt-4 text-lg">
                  <span className="text-blue-700 cursor-pointer">
                    View all comments
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isImagePopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="max-w-screen-xl w-80% p-4 bg-white rounded-lg shadow-lg text-center relative">
            <button
              onClick={() => setIsImagePopupOpen(false)}
              className="mt-2 mr-2 px-2 py-1 bg-red-500 hover:bg-red-600 rounded-lg absolute top-0 right-0 text-sm text-white"
            >
              Close
            </button>
            <img
              src={selectedImage}
              alt="Ảnh lớn"
              className="w-100 h-auto mx-auto z-99999"
              style={{ maxHeight: "80vh" }}
            />
          </div>
        </div>
      )}
    </>
  );
}

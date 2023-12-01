import React, { useEffect, useState } from "react";
import img from "../components/image/Screenshot_1.png";
import { BsFillHeartFill } from "react-icons/bs";
import { SlMenu } from "react-icons/sl";
import useEvenStore from "../../utils/store";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineNotification } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import axios from "axios";
// const userInfo = window.localStorage.getItem("user-info");
const userInfo = JSON.parse(window.localStorage.getItem("user-info"));
const idUser = userInfo && userInfo.id_user;
console.log(idUser);
// function reverseSortByDateTime(notifications) {
//   return notifications.slice().sort((a, b) => {
//     const timeA = new Date(a.time);
//     const timeB = new Date(b.time);
//     return timeB - timeA;
//   });
// }

function Header({ onSearchChange, onSearch, onClick }) {
  const [showMenu, setShowMenu] = useState(false);
  const version = useEvenStore((state) => state.version);
  const setVersion = useEvenStore((state) => state.setVersion);
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [fetchSuccess, setFetchSuccess] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  useEffect(() => {
    axios
      .get(`https://metatechvn.store/notification/${idUser}`)
      .then((response) => {
        setNotifications(response.data);
        setFetchSuccess(true); // Đánh dấu fetching thành công
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
        setError(error); // Lưu thông tin lỗi vào state
        setFetchSuccess(false); // Đánh dấu fetching thất bại
      });
  }, []);

  const user = window.localStorage.getItem("user-info");
  const BackHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const toggleVersion = () => {
    navigate("/love");
  };
  const onChangeSearch = (event) => {
    console.log(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="h-40 w-full  lg:py-7 py-3">
      {/* fixed top-0 left-0  z-20 */}
      <div className="flex items-center justify-between">
        {/* logo */}
        <div className="flex items-center">
          
          <img src={img} alt="" className="lg:w-28 w-24 lg:h-24 h-20 lg:mt-0" />
          <p
            className="lg:text-6xl text-3xl text-white flex items-center starborn"
            onClick={BackHome}
          >
            <Link>FUTURE LOVE</Link>
          </p>
          <img src={img} alt="" className="lg:w-28 w-24 lg:h-24 h-20" />
        </div>
        <div className="hidden lg:flex gap-1 justify-center items-center bg-[linear-gradient(165deg,#ea20b7_0%,#ee747c_50%,#d080c8_100%)] rounded-3xl ">
          <div className="max-lg:w-[50px] max-lg:h-[50px] w-[80px] h-[80px] flex justify-center items-center">
            <Link
              to={
                "https://play.google.com/store/apps/details?id=com.thinkdiffai.futurelove"
              }
            >
              <img
                src="https://i.rada.vn/data/image/2022/08/02/Google-Play-Store-200.png"
                alt=""
                className="max-lg:w-[35px] max-lg:h-[35px] w-[60px] h-[60px] hover:scale-105 transition-all cursor-pointer"
              />
            </Link>
          </div>
          <div className="max-lg:w-[50px] max-lg:h-[50px] w-[80px] h-[80px] flex justify-center items-center">
            <Link
              to={
                "https://apps.apple.com/us/app/futurelove-ai-love-future/id6463770787"
              }
            >
              {" "}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg"
                alt=""
                className="max-lg:w-[35px] max-lg:h-[35px] w-[60px] h-[60px] hover:scale-105 transition-all cursor-pointer"
              />
            </Link>
          </div>
        </div>

        {/* search */}
        <div className="lg:block hidden">
          <div className="i-search flex items-center">
            <i className="fa fa-search text-gray-500 text-3xl absolute ml-8" />
            <input
              type="search"
              placeholder="Search"
              className="searchTerm rounded-full w-search h-20"
              onChange={onChangeSearch}
            />
          </div>
        </div>

        {/* menu */}

        <div className="flex">
          {idUser ? (
            <div className="relative">
              <IoIosNotificationsOutline
                className="lg:text-[56px] text-[38px] text-white mt-1 font-black mr-10 cursor-pointer transition-transform duration-300 hover:scale-125"
                onClick={toggleNotifications}
              />
              {/* {notifications.So_luong_thong_bao_chua_doc > 0 && (
                <span className="absolute -top-2 right-10 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl">
                  {notifications.So_luong_thong_bao_chua_doc}
                </span>
              )} */}
            </div>
          ) : (
            <span></span>
          )}
          <BsFillHeartFill
            onClick={toggleVersion}
            className="lg:text-[54px] text-[38px] text-white mt-2 lg:mr-10 mr-5 transition-transform duration-300 hover:scale-125 cursor-pointer"
          />
          <SlMenu
            className="lg:text-[56px] text-[38px] text-white mt-1 font-black mr-10 cursor-pointer transition-transform duration-300 hover:scale-125"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          />
        </div>
      </div>
      {/* navLink */}
      {showNotifications && (
        <div
          className={`absolute top-36 right-10 z-50 bg-[#FFF2EB] rounded-[16px] shadow-lg p-4 transition-all duration-300 font-[Montserrat] ${fetchSuccess && notifications.comment > 0
            ? "w-[400px]"
            : "w-[400px]"
            } ${fetchSuccess && notifications.comment > 0
              ? "h-[300px]"
              : "h-[80px]"
            }`}
        >
          <h2 className="bg-[#FF6B3D] text-white py-2 px-4 rounded-t-[16px] text-center text-2xl">
            Notifications
          </h2>
          {error ? (
            <p className="text-red-500 mt-4 text-lg">
              Error fetching notifications: {error.message}
            </p>
          ) : (
            <ul className="w-full h-[250px] overflow-y-auto">
              {notifications.comment.map(
                (notification, index) => {
                  const time = new Date(notification.time);
                  const formattedTime = `${time.getHours()}:${time.getMinutes()} day ${time.getDate()}/${time.getMonth() + 1
                    }`;
                  return (
                    <li
                      key={index}
                      className="py-3 text-left border-b border-gray-300"
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-[#FF6B3D] flex justify-center items-center text-white font-semibold text-lg mr-4">
                          {notification.user_name_cmt
                            ? notification.user_name_cmt.charAt(0)
                            : "G"}
                        </div>
                        <div>
                          <p className="font-semibold text-2xl">
                            {notification.user_name_cmt
                              ? notification.user_name_cmt
                              : "Guest"}
                          </p>
                          <p className=" text-gray-500 text-xl">
                            {formattedTime}
                          </p>
                        </div>
                      </div>
                      <p className="mt-2 text-2xl">{`commented on your post`}</p>
                    </li>
                  );
                }
              )}
            </ul>
          )}
        </div>
      )}

      {showMenu && (
        <div className="absolute top-36 right-10 w-96 z-50">
          <ul>
            {user && (
              <>
                <li className="w-full bg-[#FFF2EB] h-32 flex justify-center items-center rounded-t-[16px]">
                  <NavLink
                    className="slab font-extrabold text-[36px]  text-[#FF2C61] px-8 py-2 rounded-2xl hover:bg-[#ED709D] hover:text-white
             "
                    to="/"
                  >
                    HOME
                  </NavLink>
                </li>
                <li className="w-full bg-[#FFF2EB] h-32 flex justify-center items-center">
                  <NavLink
                    className="pt-16 slab font-extrabold text-[36px]  text-[#FF2C61] px-8 py-2 rounded-2xl hover:bg-[#ED709D] hover:text-white
             "
                    to="/viewEvent"
                  >
                    EVENTS
                  </NavLink>
                </li>
                <li className="w-full bg-[#FFF2EB] h-32 flex justify-center items-center">
                  <NavLink
                    className="pt-16 slab font-extrabold text-[36px]  text-[#FF2C61] px-8 py-2 rounded-2xl hover:bg-[#ED709D] hover:text-white
             "
                    to="/Profile"
                  >
                    PROFILE
                  </NavLink>
                </li>
                <li className="w-full bg-[#FFF2EB] h-32 flex justify-center items-center">
                  <NavLink
                    className="pt-16 slab font-extrabold text-[36px]  text-[#FF2C61] px-8 py-2 rounded-2xl hover:bg-[#ED709D] hover:text-white
             "
                    to="/video"
                  >
                    VIDEO
                  </NavLink>
                </li>
                <li className="w-full bg-[#FFF2EB] h-32 flex justify-center items-center">
                  <NavLink
                    className="pt-16 slab font-extrabold text-[36px]  text-[#FF2C61] px-8 py-2 rounded-2xl hover:bg-[#ED709D] hover:text-white
             "
                    to="/Policy"
                  >
                    POLICY
                  </NavLink>
                </li>
                <li className="w-full bg-[#FFF2EB] h-32 flex justify-center items-center">
                  <NavLink
                    className="pt-16 slab font-extrabold text-[36px]  text-[#FF2C61] px-8 py-2 rounded-2xl hover:bg-[#ED709D] hover:text-white
             "
                    to="/listvideo"
                  >
                    LISTVIDEO
                  </NavLink>
                </li>
                <li className="w-full bg-[#FFF2EB] h-32 flex justify-center items-center">
                  <NavLink
                    className="pt-16 slab font-extrabold text-[36px]  text-[#FF2C61] px-8 py-2 rounded-2xl hover:bg-[#ED709D] hover:text-white
             "
                    to="/aboutcompany"
                  >
                    ABOUT 
                  </NavLink>
                </li>
                <li className="w-full bg-[#FFF2EB] h-32 flex justify-center items-center rounded-b-[16px]">
                  <NavLink
                    onClick={handleLogout}
                    className="pt-16 slab font-extrabold text-[36px]  text-[#FF2C61] px-8 py-2 rounded-2xl hover:bg-gray-300 hover:text-gray-500
             "
                    to="/"
                  >
                    LOGOUT
                  </NavLink>
                </li>
              </>
            )}
            {!user && (
              <>
                <li className="w-full bg-[#FFF2EB] h-32 flex justify-center items-center rounded-t-[16px]">
                  <NavLink
                    className="slab font-extrabold text-[36px]  text-[#FF2C61] px-8 py-2 rounded-2xl hover:bg-[#ED709D] hover:text-white
             "
                    to="/"
                  >
                    HOME
                  </NavLink>
                </li>
                <li className="w-full bg-[#FFF2EB] h-32 flex justify-center items-center">
                  <NavLink
                    className="pt-16 slab font-extrabold text-[36px]  text-[#FF2C61] px-8 py-2 rounded-2xl hover:bg-[#ED709D] hover:text-white
             "
                    to="/video"
                  >
                    VIDEO
                  </NavLink>
                </li>
                <li className="w-full bg-[#FFF2EB] h-32 flex justify-center items-center">
                  <NavLink
                    className="pt-16 slab font-extrabold text-[36px]  text-[#FF2C61] px-8 py-2 rounded-2xl hover:bg-[#ED709D] hover:text-white
             "
                    to="/NewHistory"
                  >
                    EVENTS
                  </NavLink>
                </li>
                <li className="w-full bg-[#FFF2EB] h-32 flex justify-center items-center">
                  <NavLink
                    className="pt-16 slab font-extrabold text-[36px]  text-[#FF2C61] px-8 py-2 rounded-2xl hover:bg-[#ED709D] hover:text-white
             "
                    to="/Policy"
                  >
                    POLICY
                  </NavLink>
                </li>
                <li className="w-full bg-[#FFF2EB] h-32 flex justify-center items-center">
                  <NavLink
                    className="pt-16 slab font-extrabold text-[36px]  text-[#FF2C61] px-8 py-2 rounded-2xl hover:bg-[#ED709D] hover:text-white
             "
                    to="/listvideo"
                  >
                    LISTVIDEO
                  </NavLink>
                </li>
                <li className="w-full bg-[#FFF2EB] h-32 flex justify-center items-center">
                  <NavLink
                    className="pt-16 slab font-extrabold text-[36px]  text-[#FF2C61] px-8 py-2 rounded-2xl hover:bg-[#ED709D] hover:text-white
             "
                    to="/aboutcompany"
                  >
                    ABOUT
                  </NavLink>
                </li>
                <li className="w-full bg-[#FFF2EB] h-32 flex justify-center items-center">
                  <NavLink
                    className="pt-16 slab font-extrabold text-[36px]  text-[#FF2C61] px-8 py-2 rounded-2xl hover:bg-[#ED709D] hover:text-white
             "
                    to="/login"
                  >
                    LOGIN
                  </NavLink>
                </li>
                <li className="w-full bg-[#FFF2EB] h-32 flex justify-center items-center rounded-b-[16px]">
                  <NavLink
                    className="slab font-extrabold text-[36px]  text-[#FF2C61] px-8 py-2 rounded-2xl hover:bg-[#ED709D] hover:text-white
             "
                    to="/register"
                  >
                    REGISTER
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Header;

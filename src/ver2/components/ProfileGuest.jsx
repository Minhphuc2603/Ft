import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import ReactLoading from "react-loading";
import Header from "./Header";
import HistoryCommentList from "./HistoryCommentList";
import EventListProfile from "./EventListProfile";
import NotFound from "./NotFound";
import { toast } from "react-toastify";
const ProfileGuest = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [listEvent, setListEvent] = useState([]);
  const [showEvent, setShowEvent] = useState(false);
  const server = "https://metatechvn.store";
  const user = JSON.parse(window.localStorage.getItem("user-info"));
  const idUser1 = user && user.id_user;

  const getUser = async (idUser) => {
    try {
      const { data } = await axios.get(`${server}/profile/${idUser}`);
      // console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllEventUser = async (idUser) => {
    try {
      const { data } = await axios.get(`${server}/lovehistory/user/${idUser}`);
      setListEvent(data.list_sukien);
    } catch (error) {
      console.log(error);
    }
  };
  const hihi = "SAO VCL"
  const BlockUser = async () => {
    const formData = new FormData();
    formData.append("user_report", idUser1)
    formData.append("block_account", id)
    formData.append("report_reason", hihi)
    try {
      const res = await axios.post(`${server}/block/user`, formData);
      if (res.status === 200) {
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  //comments
  const [dataComment, setDataComment] = useState(null);
  const fetchDatas = async (idUser) => {
    try {
      const res = await axios.get(
        `${server}/lovehistory/comment/user/${idUser}`
      );
      setDataComment(res.data.comment_user.slice(0, 60));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser(id);
    getAllEventUser(id);
    fetchDatas(id);
  }, []);

  const renderLoading = (isLoading) => {
    if (isLoading) {
      return (
        <div className="fixed top-0 min-w-[100%] h-[100vh] z-[999]">
          <div className="absolute top-0 min-w-[100%] h-[100vh] bg-black opacity-70 z-10"></div>
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
  if (user && user !== null && user.id_user && user.id_user == id)
    return navigate("/profile");
  if (data == null) return <>{renderLoading(true)}</>;
  const nic = listEvent.slice(0, 20);
  // console.log(data);
  if (data && data.ketqua == "khong co user nay")
    return (
      <>
        <NotFound />
      </>
    );
  return (
    <div className="bg-[#E9E9E9] w-[100%] h-full">
      <div className="h-full">
        <div
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1471899236350-e3016bf1e69e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80)`,
          }}
          className="lg:w-[100%] h-[250px] rounded-b-3xl bg-no-repeat bg-cover "
        >
          <Header />
        </div>
        {/* {setIsLoading ? renderLoading() : null} */}
        <div className="md:flex md:justify-around">
          <div className="relative lg:-top-28 lg:left-16  max-lg:-top-28 max-lg:left-1/2 max-lg:translate-x-[-50%] rounded-3xl lg:w-[550px] lg:h-[220px] w-[330px] h-[250px] bg-gradient-to-r from-violet-500 to-fuchsia-400">
            <div className="md:flex max-md:flex-col md:justify-around py-4 px-3">
              <div>
                <img
                  src={
                    data.link_avatar == "1"
                      ? "https://i.ibb.co/WHmrzPt/106287976-917734608745320-4594528301123064306-n.jpg"
                      : data.link_avatar
                  }
                  className="lg:ml-1 ml-40 lg:w-[130px] lg:h-[130px] w-[100px] h-[100px] border border-white rounded-full object-cover"
                />
                <div className="w-full text-center">
                  <h1 className="lg:text-4xl lg:my-3 text-white max-lg:my-2 max-lg:text-3xl underline">
                    @{data.user_name}
                  </h1>
                  <p className="lg:text-4xl lg:my-3 lg:max-w-[150px] text-white max-lg:my-2 max-lg:text-3xl">{data.email}</p>
                </div>
              </div>
              <div className="md:py-5">
                <div className="flex justify-around lg:w-[300px] text-center">
                  <div className="text-3xl text-white">
                    <h1 className="ml-8">{data.count_sukien}</h1>
                    <p>Events</p>
                  </div>
                  <div className="text-3xl text-white">
                    <h1>{data.count_view}</h1>
                    <p>View</p>
                  </div>
                  <div className="text-3xl text-white">
                    <h1 className="ml-10">{data.count_comment}</h1>
                    <p>Comments</p>
                  </div>
                </div>
                <div className="flex justify-center items-center py-4 gap-3 md:my-8">
                  <button
                    className=" bg-white shadow-gray-500 rounded-full py-2 px-5 text-[14px]"
                    onClick={() => setShowEvent(true)}
                  >
                    View Events
                  </button>
                  <button
                    // onClick={() => openModal()}
                    className="md:hidden bg-white shadow-gray-500 rounded-full py-2 px-5 text-[14px]"
                  >
                    <div className="flex justify-center items-center">
                      <svg
                        width={15}
                        height={15}
                        className="mx-3"
                        viewBox="0 0 36 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.5991 31.7995C18.2991 31.3495 17.9991 31.0495 17.8491 30.5995C17.0991 29.2495 16.7991 27.7495 16.7991 26.2495C16.7991 23.9995 17.6991 21.8995 19.0491 20.2495C19.3491 19.9495 19.4991 19.6495 19.7991 19.4995C19.7991 19.3495 20.5491 18.8995 20.9991 18.5995C23.6991 16.9495 25.3491 13.9495 25.0491 10.7995C24.8991 9.44947 24.4491 8.09947 23.8491 7.19947C22.6491 5.24947 20.6991 3.74947 18.2991 3.29947C12.8991 2.24947 8.09906 6.29947 8.09906 11.5495C8.09906 14.3995 9.44906 16.7995 11.5491 18.2995C7.79906 19.6495 4.79906 22.4995 3.14906 26.2495C2.54906 27.7495 2.69906 29.3995 3.59906 30.7495C4.79906 32.0995 6.29906 32.9995 8.09906 32.9995H19.7991C19.3491 32.5495 18.8991 32.2495 18.5991 31.7995Z"
                          fill="black"
                        />
                        <path
                          d="M26.0992 19.1992C25.4992 19.1992 24.8992 19.3492 24.2992 19.4992C23.8492 19.6492 23.2492 19.7992 22.7992 20.0992C22.3492 20.2492 22.0492 20.5492 21.5992 20.8492C20.0992 22.0492 19.1992 23.9992 19.1992 26.0992C19.1992 27.7492 19.7992 29.2492 20.6992 30.4492C21.1492 30.8992 21.5992 31.3492 22.0492 31.6492C23.0992 32.3992 24.2992 32.8492 25.4992 32.8492C25.6492 32.8492 25.7992 32.8492 25.9492 32.8492C29.6992 32.8492 32.8492 29.6992 32.8492 25.9492C32.9992 22.3492 29.8492 19.1992 26.0992 19.1992Z"
                          fill="black"
                        />
                        <path
                          d="M29.55 24.8996H27.45V22.7996C27.45 22.0496 26.85 21.5996 26.25 21.5996C25.65 21.5996 25.05 22.1996 25.05 22.7996V24.8996H22.95C22.2 24.8996 21.75 25.4996 21.75 26.0996C21.75 26.8496 22.35 27.2996 22.95 27.2996H25.05V29.3996C25.05 30.1496 25.65 30.5996 26.25 30.5996C26.85 30.5996 27.45 29.9996 27.45 29.3996V27.2996H29.55C30.3 27.2996 30.75 26.6996 30.75 26.0996C30.75 25.4996 30.15 24.8996 29.55 24.8996Z"
                          fill="white"
                        />
                      </svg>
                      <span onClick={BlockUser}> Block </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <button
              // onClick={() => openModal()}

              className="max-lg:hidden bg-white shadow-gray-500 rounded-full py-2 px-5 text-[14px] my-8 mx-7"
              onClick={BlockUser}
            >
              <div className="flex justify-center items-center"
              >
                <svg
                  width={24}
                  height={24}
                  className="mx-3"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.5991 31.7995C18.2991 31.3495 17.9991 31.0495 17.8491 30.5995C17.0991 29.2495 16.7991 27.7495 16.7991 26.2495C16.7991 23.9995 17.6991 21.8995 19.0491 20.2495C19.3491 19.9495 19.4991 19.6495 19.7991 19.4995C19.7991 19.3495 20.5491 18.8995 20.9991 18.5995C23.6991 16.9495 25.3491 13.9495 25.0491 10.7995C24.8991 9.44947 24.4491 8.09947 23.8491 7.19947C22.6491 5.24947 20.6991 3.74947 18.2991 3.29947C12.8991 2.24947 8.09906 6.29947 8.09906 11.5495C8.09906 14.3995 9.44906 16.7995 11.5491 18.2995C7.79906 19.6495 4.79906 22.4995 3.14906 26.2495C2.54906 27.7495 2.69906 29.3995 3.59906 30.7495C4.79906 32.0995 6.29906 32.9995 8.09906 32.9995H19.7991C19.3491 32.5495 18.8991 32.2495 18.5991 31.7995Z"
                    fill="black"
                  />
                  <path
                    d="M26.0992 19.1992C25.4992 19.1992 24.8992 19.3492 24.2992 19.4992C23.8492 19.6492 23.2492 19.7992 22.7992 20.0992C22.3492 20.2492 22.0492 20.5492 21.5992 20.8492C20.0992 22.0492 19.1992 23.9992 19.1992 26.0992C19.1992 27.7492 19.7992 29.2492 20.6992 30.4492C21.1492 30.8992 21.5992 31.3492 22.0492 31.6492C23.0992 32.3992 24.2992 32.8492 25.4992 32.8492C25.6492 32.8492 25.7992 32.8492 25.9492 32.8492C29.6992 32.8492 32.8492 29.6992 32.8492 25.9492C32.9992 22.3492 29.8492 19.1992 26.0992 19.1992Z"
                    fill="black"
                  />
                  <path
                    d="M29.55 24.8996H27.45V22.7996C27.45 22.0496 26.85 21.5996 26.25 21.5996C25.65 21.5996 25.05 22.1996 25.05 22.7996V24.8996H22.95C22.2 24.8996 21.75 25.4996 21.75 26.0996C21.75 26.8496 22.35 27.2996 22.95 27.2996H25.05V29.3996C25.05 30.1496 25.65 30.5996 26.25 30.5996C26.85 30.5996 27.45 29.9996 27.45 29.3996V27.2996H29.55C30.3 27.2996 30.75 26.6996 30.75 26.0996C30.75 25.4996 30.15 24.8996 29.55 24.8996Z"
                    fill="white"
                  />
                </svg>

                {/* <svg width={36} height={36} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18.5991 31.7999C18.2991 31.3499 17.9991 31.0499 17.8491 30.5999C17.0991 29.2499 16.7991 27.7499 16.7991 26.2499C16.7991 23.9999 17.6991 21.8999 19.0491 20.2499C19.3491 19.9499 19.4991 19.6499 19.7991 19.4999C19.7991 19.3499 20.5491 18.8999 20.9991 18.5999C23.6991 16.9499 25.3491 13.9499 25.0491 10.7999C24.8991 9.59986 24.5991 8.54986 24.1491 7.79986C22.9491 5.54986 20.8491 3.89986 18.2991 3.44986C12.8991 2.39986 8.09906 6.44986 8.09906 11.6999C8.09906 14.5499 9.44906 16.9499 11.5491 18.4499C7.79906 19.7999 4.79906 22.6499 3.14906 26.3999C2.54906 27.8999 2.69906 29.5499 3.59906 30.8999C4.79906 32.0999 6.29906 32.9999 8.09906 32.9999H19.7991C19.3491 32.5499 18.8991 32.2499 18.5991 31.7999Z" fill="black" />
  <path d="M32.3988 23.2502C32.0988 22.5002 31.4988 21.7502 30.8988 21.1502C29.6988 19.9502 27.8988 19.2002 26.0988 19.2002C25.4988 19.2002 24.7488 19.3502 24.1488 19.5002C23.6988 19.6502 23.0988 19.8002 22.6488 20.1002C22.1988 20.2502 21.8988 20.5502 21.4488 20.8502C19.9488 22.0502 19.0488 24.0002 19.0488 26.1002C19.0488 27.7502 19.6488 29.2502 20.6988 30.4502C21.1488 30.9002 21.5988 31.3502 22.0488 31.6502C23.0988 32.4002 24.2988 32.8502 25.4988 32.8502C25.6488 32.8502 25.7988 32.8502 25.9488 32.8502C29.6988 32.8502 32.8488 29.7002 32.8488 25.9502C32.9988 25.0502 32.6988 24.1502 32.3988 23.2502Z" fill="black" />
  <path d="M33.1491 20.5499C32.8491 20.2499 32.2491 20.0999 31.7991 20.3999C31.6491 20.3999 31.4991 20.5499 31.3491 20.6999L30.8991 21.2999L28.6491 23.8499L27.7491 24.7499L26.8491 25.6499L26.0991 26.5499L24.7491 25.0499C24.2991 24.5999 23.5491 24.4499 22.9491 24.8999C22.4991 25.3499 22.3491 26.0999 22.7991 26.6999L25.0491 29.2499C25.3491 29.5499 25.6491 29.6999 25.9491 29.6999C26.2491 29.6999 26.6991 29.5499 26.8491 29.2499L27.5991 28.4999L28.7991 27.1499L29.6991 26.0999L32.2491 23.2499L33.1491 22.3499C33.7491 21.7499 33.5991 20.9999 33.1491 20.5499Z" fill="white" />
</svg> */}

                <span > Block </span>
              </div>
            </button>
          </div>
        </div>
        <HistoryCommentList datas={dataComment} />
        {showEvent && (
          <EventListProfile data={nic} closeTab={() => setShowEvent(false)} />
        )}
      </div>
    </div>
  );
};

export default ProfileGuest;

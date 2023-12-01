import React, { useEffect, useState } from "react";
import img2 from "../components/image/Rectangle4958.png";
import Header from "../components/Header";
import axios from "axios";
import useEventStore from "../../utils/store";

import ReactLoading from "react-loading";
import * as faceapi from "face-api.js";
import { toast } from "react-toastify";

import HistoryCommentList from "./HistoryCommentList";
import EventListProfile from "./EventListProfile";
import ManagerAcount from "./ManagerAcount";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";

export default function Profile() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [showModals, setShowModals] = React.useState(false);
  const [showModals22, setShowModals22] = React.useState(false);
  const user = JSON.parse(localStorage.getItem("user-info"));
  const [imgdata, setImgData] = useState(false);

  const [showManagerAccount, setShowManagerAccount] = React.useState(false);

  const [showEvent, setShowEvent] = React.useState(false);
  const [listEvent, setListEvent] = useState([]);

  const api_key = "ba35005b6d728bd9197bfd95d64e4e39";
  const server = "https://metatechvn.store";
  const [notiImage, setNotiImage] = React.useState({
    status: false,
    value: null,
  });
  const [imageVerify, setImageVerify] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [imgSucess, setImgSucces] = React.useState([
    "https://i.ibb.co/qmpDk2W/Man-Big-Shoes-Avatar.png",
  ]);
  const [imgError, setImgError] = React.useState([
    "https://i.ibb.co/vBNPH32/Not-Face-Girl-Big-Shoes-Avatar.png",
  ]);
  const userInfo = JSON.parse(window.localStorage.getItem("user-info"));
  const token = userInfo && userInfo.token;
  console.log(token);

  const totalPages = 10;

  const handlePageChange = (page) => {
    // Kiểm tra giới hạn trang để đảm bảo rằng trang không vượt quá giới hạn
    const newPage = Math.min(Math.max(1, page), totalPages);
    setCount(newPage);
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const fetchDataIMG = async () => {
    try {
      const { data } = await axios.get(`${server}/saveimage/${user.id_user}`, {
        headers: {
          Authorization: `Bearer ${token}` // Thêm token vào header
        }
      });
      setImgData(data.list_img);
    } catch (error) {
      console.error("Error fetching data:", error);
      // alert("Server error getList 8-12 images");
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${server}/profile/${user.id_user}`, {
        headers: {
          Authorization: `Bearer ${token}` // Thêm token vào header
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      if (jsonData.ketqua == "khong co user nay") {
        window.localStorage.clear();
        return (window.location.href = "/login");
      }

      setData(jsonData);
    } catch (error) {
      console.log(error);
    }
  };
  const openModals = () => {
    setShowModals(true);
  };

  const closeModals = () => {
    setShowModals(false);
    closeModal();
  };

  const openModal = () => {
    // console.log("open");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  // Check height
  const y = window.innerHeight;
  //comments
  const [datas, setDatas] = useState([]);
  const setEvent = useEventStore((state) => state.setEvent);

  const fetchDatas = async () => {
    try {
      const user = JSON.parse(window.localStorage.getItem("user-info"));
      const res = await axios.get(
        `${server}/lovehistory/comment/user/${user.id_user}`
      );
      const reverseData = await res.data.comment_user.reverse();
      setDatas(reverseData);
      setEvent(res.data);

    } catch (error) {
      console.log(error);
    }
  };
  const [count, setCount] = useState(1)
  const [video, setVideo] = useState("")

  useEffect(() => {
    axios
      .get(`${server}/lovehistory/user/video/${user.id_user}?trang=${count}`)
      .then((response) => {
        const errorMessage = "exceed the number of pages!!!";

        if (response.data === errorMessage) {
          toast.error(errorMessage);
        } else {
          setVideo(response.data.list_sukien_video);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [count]);


  // ---end commnets

  //   Upload from 8-> 12 images
  //

  const onHandleUploadImage = async () => {
    const list_img = {};
    try {
      setIsLoading(true);
      for (const [i, file] of imageVerify.entries()) {
        const res = await uploadImage(file);
        list_img[`'${i + 1}'`] = res.success;
      }
      const user = JSON.parse(window.localStorage.getItem("user-info"));
      if (!user) return window.location.href("/");
      const res = await axios.post(
        `${server}/saveimage/${user.id_user}`,
        list_img
      );
      setIsLoading(false);
      resetImgShow();
      await toast.success("Upload and save data completed successfully");
      setShowModals(false);
      setShowModals22(false);
      setImgSucces(["https://i.ibb.co/qmpDk2W/Man-Big-Shoes-Avatar.png"]);
      setImgError([
        "https://i.ibb.co/vBNPH32/Not-Face-Girl-Big-Shoes-Avatar.png",
      ]);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  /////// phuc///////
  const [image, setImage] = useState("")
  const Images = async () => {
    try {
      const user = JSON.parse(window.localStorage.getItem("user-info"));
      const response = await axios.get(`https://metatechvn.store/images/${user.id_user}?type=nam`)
      const message = "Missing param!!!, your type is nam"
      if (response.data === message) {
        toast.warning("Missing param!!!, your type is nam")
      }
      setImage(response.data.image_links_nam)
      console.log(response.data.image_links_nam)
    } catch (error) {
      toast.warning(error)
    }
  }
  const [isModalVisible1, setModalVisible1] = useState(false);

  const handleOpenModal = async () => {
    try {
      await Images();
      setModalVisible1(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseModalne = () => {
    setModalVisible1(false);
  };

  ////////////

  const loadModels = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      faceapi.nets.ssdMobilenetv1.loadFromUri("./models"),
    ]).then(() => {
      // faceDetection();
    });
  };
  const resetImgShow = () => {
    setImgSucces([]);
    setImgError([]);
    setImageVerify([]);
  };

  const onChangeImage = async (event) => {
    const files = event.target.files;
    if (files.length < 8) {
      return setNotiImage({ status: true, value: "Minimum 8 images" });
    }
    if (files.length > 12) {
      return setNotiImage({ status: true, value: "Up to 12 images" });
    }
    resetImgShow();
    setIsLoading(true);
    const imgSuccess = [];
    const imgError = [];
    const imgVerify = [];
    for (const file of files) {
      try {
        const res = await validImage(URL.createObjectURL(file));
        if (!res || res == null || res.length == 0) {
          imgError.push(URL.createObjectURL(file));
        } else {
          imgSuccess.push(URL.createObjectURL(file));
          imgVerify.push(file);
        }
      } catch (error) {
        console.log(error);
        alert("Lỗi xử lý hình ảnh");
      }
    }
    setImgError(imgError);
    setImgSucces(imgSuccess);
    setImageVerify(imgVerify);
    setIsLoading(false);
    return;
  };
  const validateImgage = (res) => {
    if (!res || res == null || res.length > 1 || res.length == 0)
      return setNotiImage({
        status: true,
        value: "Photos can only contain 1 face",
      });
    return true;
  };

  const validImage = async (image) => {
    try {
      const imageElement = document.createElement("img");
      imageElement.src = image;
      const netInput = imageElement;
      // console.log(netInput); // object img with src = blob:....
      const detections = await faceapi
        .detectAllFaces(netInput, new faceapi.SsdMobilenetv1Options())
        .withFaceLandmarks()
        .withFaceExpressions();
      // console.log(detections);
      const detections2 = await faceapi
        .detectAllFaces(netInput, new faceapi.SsdMobilenetv1Options())
        .withFaceLandmarks()
        .withFaceExpressions();
      if (detections2.length == 0) return detections2;
      return detections;
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("image", image);
    try {
      if (image) {
        const apiResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${api_key}`,
          formData
        );
        return { success: apiResponse.data.data.url };
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const navigate = useNavigate();

  const handleDetail = (item) => {
    navigate(`/detailVideo/${item}`);
  };


  const renderLoading = () => {
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

  // --- End

  // UPLOAD AVT

  const handleImageChange = async (event) => {
    setIsLoading(true);
    if (!event.target.files[0]) {
      setSelectedImage(false);
      if (document.querySelector("#imgUploadedAvatar").querySelector("img")) {
        document.querySelector("#imgUploadedAvatar").querySelector("img").src =
          null;
      }
      setIsLoading(false);
      return false;
    }
    const res = await validImage(URL.createObjectURL(event.target.files[0]));
    if (validateImgage(res) == undefined) {
      setSelectedImage(false);
      return setIsLoading(false);
    }
    if (!res || res.length === 0) {
      setIsLoading(false);
      setSelectedImage(false);
      if (document.querySelector("#imgUploadedAvatar").querySelector("img")) {
        document.querySelector("#imgUploadedAvatar").querySelector("img").src =
          null;
      }
      return setNotiImage({
        status: true,
        value: "The picture is not in the correct format",
      });
    }
    if (res.length > 1) {
      setIsLoading(false);
      setSelectedImage(false);
      return setNotiImage({
        status: true,
        value: "Photos can only contain 1 face",
      });
    }
    setSelectedImage(event.target.files[0]);
    setIsLoading(false);
  };

  const handleUploadAvatar = async () => {
    if (!selectedImage) return;
    setIsLoading(true);
    try {
      const imageUrl = await uploadImage(selectedImage);
      if (!imageUrl) return alert("Fail API upload image");
      let data = new FormData();
      data.append("link_img", imageUrl.success);
      data.append("check_img ", "upload");
      const res = await axios.post(
        `${server}/changeavatar/${user.id_user}`,
        data
      );
      if (!res) {
        setIsLoading(false);
        return alert("API errors");
      }
      setIsLoading(false);
      await toast.success("Upload and save avatar completed successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // onHandlePickAvatar
  const handlePickAvatar = async (url) => {
    setIsLoading(true);
    try {
      let data = new FormData();
      data.append("link_img", url);
      data.append("check_img ", "upload");
      const res = await axios.post(
        `${server}/changeavatar/${user.id_user}`,
        data
      );
      if (!res) {
        setIsLoading(false);
        return alert("API errors");
      }
      setIsLoading(false);
      await toast.success("Upload and save avatar completed successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getAllEventUser = async (idUser) => {
    try {
      const { data } = await axios.get(`${server}/lovehistory/user/${idUser}`);
      // console.log(data);
      setListEvent(data.list_sukien);
    } catch (error) {
      console.log(error);
    }
  };
  const nic = listEvent;
  // --- END

  useEffect(() => {
    getAllEventUser(user.id_user);
    fetchDatas();
    // fetchDataIMG();
    fetchData();
    // loadModels();
  }, []);
  //details user
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal1 = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="bg-[#E9E9E9] w-[100%] h-full">
      {notiImage.status ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[1000] outline-none focus:outline-none">
            <div className="relative w-96 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 slab text-3xl leading-relaxed">
                    {notiImage.value}
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-[#FF2C61] slab hover:bg-[#ED709D] hover:text-white font-bold uppercase px-6 py-3 rounded-xl text-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setNotiImage({ status: false, value: null });
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <div className="h-full">
        <div
          style={{ backgroundImage: `url(${img2})` }}
          className="lg:w-[100%] h-[250px] rounded-b-3xl bg-no-repeat bg-cover "
        >
          <Header />
        </div>
        {setIsLoading ? renderLoading() : null}
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
                  alt=""
                />
                <div className="w-full text-center">
                  <h1 className="lg:text-4xl lg:my-3 lg:max-w-[150px] text-white max-lg:my-2 max-lg:text-3xl underline">
                    @{data.user_name}
                  </h1>
                  <Button className="text-white" onClick={showModal1}> Details</Button>
                  <Modal
                    title="Details User"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                      <Button key="submit" type="primary" onClick={handleOk} style={{background:"blue"}}>
                        OK
                      </Button>,
                    ]}
                  >
                    
                    <p>User : {data.user_name}</p>
                    <p>Email : {data.email}</p>
                    <p>Ip : {data.ip_register}</p>
                    <p>Device : {data.device_register}</p>
                    
                  </Modal>
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
                    onClick={() => openModal()}
                    className="md:hidden bg-white shadow-gray-500 rounded-full py-2 px-5 text-[14px]"
                  >
                    <div className="flex justify-center items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        style={{
                          fill: "rgba(0, 0, 0, 1)",
                          transform: "",
                          msfilter: "",
                        }}
                      >
                        <path d="M11.587 6.999H7.702a2 2 0 0 0-1.88 1.316l-3.76 10.342c-.133.365-.042.774.232 1.049l.293.293 6.422-6.422c-.001-.026-.008-.052-.008-.078a1.5 1.5 0 1 1 1.5 1.5c-.026 0-.052-.007-.078-.008l-6.422 6.422.293.293a.997.997 0 0 0 1.049.232l10.342-3.761a2 2 0 0 0 1.316-1.88v-3.885L19 10.414 13.586 5l-1.999 1.999zm8.353 2.062-5-5 2.12-2.121 5 5z" />
                      </svg>
                      <span> Edit </span>
                    </div>
                  </button>
                  <button
                    className="lg:hidden py-2 px-2 rounded-lg hover:bg-gray-100 transition-all"
                    onClick={() => setShowManagerAccount(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      style={{
                        fill: "rgba(0, 0, 0, 1)",
                        transform: "",
                        msfilter: "",
                      }}
                    >
                      <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <button
              onClick={() => openModal()}
              className="max-lg:hidden bg-white shadow-gray-500 rounded-full py-2 px-5 text-[14px] my-8 mx-7"
            >
              <div className="flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  style={{
                    fill: "rgba(0, 0, 0, 1)",
                    transform: "",
                    msfilter: "",
                  }}
                >
                  <path d="M11.587 6.999H7.702a2 2 0 0 0-1.88 1.316l-3.76 10.342c-.133.365-.042.774.232 1.049l.293.293 6.422-6.422c-.001-.026-.008-.052-.008-.078a1.5 1.5 0 1 1 1.5 1.5c-.026 0-.052-.007-.078-.008l-6.422 6.422.293.293a.997.997 0 0 0 1.049.232l10.342-3.761a2 2 0 0 0 1.316-1.88v-3.885L19 10.414 13.586 5l-1.999 1.999zm8.353 2.062-5-5 2.12-2.121 5 5z" />{" "}
                </svg>
                <span> Edit your profile</span>
              </div>
            </button>
            <button
              className="max-lg:hidden py-2 px-2 rounded-lg hover:bg-gray-300 transition-all"
              onClick={() => setShowManagerAccount(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                style={{
                  fill: "rgba(0, 0, 0, 1)",
                  transform: "",
                  msfilter: "",
                }}
              >
                <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>
            {showManagerAccount && (
              <ManagerAcount close={() => setShowManagerAccount(false)} />
            )}
            {showModal ? (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative lg:w-[1000px] h-[600px] mt-60 max-w-3xl">
                    <div className="border-0 lg:w-[500px] w-[300px] rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                      <div className="relative p-6 flex-auto h-[400px]">
                        <p className="my-4 text-center text-black-500 slab text-3xl leading-relaxed">
                          Edit Profile
                        </p>
                        <div className="flex lg:justify-around justify-evenly mt-10 text-3xl text-black">
                          <div className="-ml-14">
                            <h1>Avatar</h1>
                          </div>
                          <div className="mt-10 ">
                            <img
                              src={
                                data.link_avatar == "1"
                                  ? "https://i.ibb.co/WHmrzPt/106287976-917734608745320-4594528301123064306-n.jpg"
                                  : data.link_avatar
                              }
                              className="lg:w-[130px] lg:h-[130px] w-[100px] h-[100px] border border-white rounded-full"
                            ></img>
                          </div>
                          <div>
                            <button
                              onClick={() => openModals()}
                              className=" bg-white shadow-gray-500 rounded-full w-[50px] h-[30px] -mr-11"
                            >
                              edit
                            </button>
                            {showModals ? (
                              <>
                                <div className="justify-center md:items-center flex overflow-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                  <div className="">
                                    <div className="max-lg:ml-0 max-lg:w-full lg:-ml-16 ml-6 lg:w-[700px] w-[400px] border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                                      <div className="relative p-6 flex-auto lg:h-[800px] h-[700px]">
                                        <p className=" text-center text-black-500 slab text-3xl leading-relaxed text-black">
                                          Update Avatar
                                        </p>
                                        <div className="mt-10 text-3xl text-black">
                                          <div>
                                            <h1 className="py-3">Suggestion</h1>
                                          </div>
                                          <div className="grid lg:grid-cols-6 gap-x-8 gap-y-4 grid-cols-3 h-[120px] overflow-x-hidden">
                                            {imgdata.map((item, index) => (
                                              <div
                                                key={index}
                                                className="w-[100px] h-[100px] border-2 flex justify-center items-center"
                                                onClick={() =>
                                                  handlePickAvatar(item)
                                                }
                                              >
                                                <img
                                                  src={item}
                                                  className="w-[90px] h-[90px] hover:scale-105 transition-all cursor-pointer"
                                                  type="file"
                                                  alt=""
                                                />
                                              </div>
                                            ))}
                                          </div>
                                          <div className="border-t bg-slate-700 min-w-full my-4"></div>
                                        </div>
                                        <div className="md:mt-10 md:my-10">
                                          <div className="flex md:justify-between flex-col text-3xl text-black">
                                            <div>
                                              <h1 className="my-1">
                                                Uploaded Avatar
                                              </h1>
                                            </div>

                                            <div className="max-sm:py-2">
                                              <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                              />
                                            </div>
                                          </div>
                                          <div className="grid lg:grid-cols-6 gap-x-8 gap-y-4 grid-cols-3 overflow-x-hidden h-[120px]">
                                            <div
                                              className="w-[100px] h-[100px] border-2"
                                              id="imgUploadedAvatar"
                                            >
                                              {selectedImage && (
                                                <img
                                                  src={URL.createObjectURL(
                                                    selectedImage
                                                  )}
                                                  className="w-[100px] h-[100px]"
                                                  alt="Selected"
                                                />
                                              )}
                                            </div>
                                          </div>
                                          <div className="border-t bg-slate-700 min-w-full my-4"></div>
                                        </div>
                                        <div className="md:mt-10">
                                          <div className="flex justify-between text-3xl text-black">
                                            <div>
                                              <h1 className="py-3">
                                                Your Gallery
                                              </h1>
                                            </div>
                                          </div>
                                          <div className="grid lg:grid-cols-6 gap-x-8 gap-y-4 grid-cols-3 overflow-x-hidden h-[120px]">
                                            {imgdata.map((item, index) => (
                                              <div
                                                key={index}
                                                className="w-[100px] h-[100px] border-2 flex justify-center items-center"
                                                onClick={() =>
                                                  handlePickAvatar(item)
                                                }
                                              >
                                                <img
                                                  src={item}
                                                  className="w-[90px] h-[90px] hover:scale-105 transition-all cursor-pointer"
                                                  type="file"
                                                />
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                        <div className="mt-10">
                                          <h1 className="text-center">
                                            Access Your Gallery
                                          </h1>
                                          <div className="flex justify-between mt-10 text-3xl text-black">
                                            <button
                                              onClick={() =>
                                                handleUploadAvatar()
                                              }
                                              className="hover:scale-105 hover:bg-gray-700 hover:transition-all lg:ml-80 ml-20 text-white bg-gray-500 shadow-white rounded-full w-[250px] h-[30px]"
                                            >
                                              Update Avatar
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="relative lg:left-[640px] lg:-top-[800px] left-[340px] -top-[700px] w-[50px] flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                          className="text-[#FF2C61] slab hover:bg-[#ED709D] hover:text-white font-bold uppercase px-6 py-3 rounded-xl text-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                          type="button"
                                          onClick={() => closeModals()}
                                        >
                                          X
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                              </>
                            ) : null}
                          </div>
                        </div>
                        <div className="flex lg:justify-around justify-evenly mt-10 text-3xl text-black">
                          <div>
                            <h1>Cover Pic</h1>
                          </div>
                          <div className="mt-16">
                            <img
                              src={data.link_avatar}
                              className="lg:w-[280px] lg:h-[130px] w-[200px] h-[100px] border border-white"
                            ></img>
                          </div>
                          <div>
                            <button className=" bg-white shadow-gray-500 rounded-full w-[50px] h-[30px]">
                              edit
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative lg:left-[420px] lg:-top-[400px] left-[250px] -top-[400px] w-[50px] flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="text-[#FF2C61] slab hover:bg-[#ED709D] hover:text-white font-bold uppercase px-6 py-3 rounded-xl text-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => closeModal()}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
          </div>
        </div>
        {imgdata.length === 0 && (
          <div
            className={`bg-amber-400 w-screen h-[50px] text-1xl ${y > 420 ? "sticky top-0" : "relative top-[400px]"
              } sticky  mb-8 -mt-20`}
          >
            <div className="flex justify-center pt-6">
              <div className="mt-2">You haven't finished the procedure yet</div>
              <div className="mx-8">
                <button
                  onClick={() => setShowModals22(true)}
                  className=" bg-white shadow-gray-500 rounded-full w-[150px] h-[25px]"
                >
                  Complete your profile
                </button>
              </div>
            </div>
          </div>
        )}
        {showModals22 ? (
          <>
            <div className="justify-center items-center flex overflow-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-[1000px]  max-w-3xl">
                <div className="lg:-ml-16 ml-6 lg:w-[680px] lg:py-4 lg:px-8 w-[400px] border-0 rounded-lg shadow-lg relative flex flex-col bg-black outline-none focus:outline-none">
                  <div className="relative px-10 flex-auto  lg:h-[700px] h-[600px] text-white">
                    <h1 className=" text-center text-black-500 slab max-lg:pt-8 text-4xl md:text-[32px] leading-relaxed text-white">
                      Complete profile
                    </h1>
                    <p className=" text-black-500 slab text-4xl leading-relaxed text-white max-lg:text-3xl">
                      Pick 8-12 photos of yourself
                    </p>
                    <div className="md:mt-10 text-3xl text-white">
                      <div className="my-8">
                        <h1 className="text-4xl text-green-600 flex md:py-1">
                          <img
                            className="h-[30px]"
                            src="https://png.pngtree.com/png-vector/20221215/ourmid/pngtree-green-check-mark-png-image_6525691.png"
                            alt=""
                          />{" "}
                          Good photos
                        </h1>
                        <p className="w-[350px] max-lg:text-2xl">
                          close-up selfies, same subject, variety of background,
                          expressions and face angles
                        </p>
                      </div>

                      <div className="flex gap-3 overflow-x-scroll">
                        {imgSucess?.map((item, index) => (
                          <div
                            key={index}
                            className="relative lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] rounded-lg overflow-hidden"
                          >
                            <img
                              src={item}
                              alt=""
                              className="lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] object-cover"
                            />
                            <img
                              src="https://png.pngtree.com/png-vector/20221215/ourmid/pngtree-green-check-mark-png-image_6525691.png"
                              className="absolute h-[25px] bottom-0 right-3"
                              alt=""
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="md:mt-10 text-3xl text-white">
                      <div className="my-8">
                        <h1 className="text-4xl text-red-600 flex md:py-1">
                          <img
                            className="h-[30px]"
                            src="https://i.ibb.co/bJ517B1/close-removebg-preview.png"
                            alt=""
                          />{" "}
                          Bad photos
                        </h1>
                        <p className="w-[350px] max-lg:text-2xl">
                          Group pics, face small or not visible, sunglass,
                          animal
                        </p>
                      </div>
                      <div className="flex gap-3 overflow-x-scroll">
                        {imgError?.map((item, index) => (
                          <div
                            key={index}
                            className="relative lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] rounded-lg overflow-hidden"
                          >
                            <img
                              src={item}
                              alt=""
                              className="lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] object-cover"
                            />
                            <img
                              src="https://i.ibb.co/bJ517B1/close-removebg-preview.png"
                              className="absolute h-[25px] bottom-0 right-3"
                              alt=""
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-10">
                      <div className="text-3xl text-white">
                        <div>
                          <h1 className="lg:w-[550px] w-[300px] max-lg:text-2xl">
                            Your photos will be deleted permanetly from our
                            servers within 24h, and won’t be used for any other
                            purpose
                          </h1>
                        </div>
                      </div>
                    </div>

                    {imgSucess?.length >= 8 ? (
                      <div className="mt-10 py-3">
                        <div className="flex justify-between mt-10 text-3xl text-black">
                          <div className="flex items-center justify-center w-full max-md:py-4 text-gray-300 hover:text-gray-100">
                            <button
                              onClick={() => onHandleUploadImage()}
                              className="mb-2 text-sm  dark:text-gray-400 bg-slate-200 text-black rounded-full py-3 px-20 hover:scale-110 hover:bg-slate-100"
                            >
                              <span className="font-semibold text-4xl">
                                Upload
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-10">
                        <div className="flex justify-between mt-10 text-3xl text-black">
                          <div className="flex items-center justify-center w-full max-md:py-4 text-gray-300 hover:text-gray-100">
                            <label
                              htmlFor="dropzone-file"
                              className="flex flex-col items-center justify-center w-full cursor-pointer"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-1">
                                <svg
                                  className="w-8 h-8  dark:text-gray-400"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 20 16"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                  />
                                </svg>
                                <p className="mb-2 text-sm  dark:text-gray-400">
                                  <span className="font-semibold text-4xl">
                                    Select 8-12 Photos
                                  </span>
                                </p>
                                <p className="text-xs  dark:text-gray-400">
                                  PNG, JPG
                                </p>
                              </div>
                              <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                multiple
                                accept="image/*"
                                onChange={(e) => onChangeImage(e)}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="relative lg:left-[540px] lg:-top-[700px] left-[340px] -top-[610px] w-[50px] flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-[#FF2C61] slab hover:bg-[#ED709D] hover:text-white font-bold uppercase px-6 py-3 rounded-xl text-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModals22(false)}
                    >
                      X
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
        <div className="text-center p-2" onClick={handleOpenModal}>
          <button className="bg-blue-500 text-white py-2 px-4 rounded">
            Image Upload
          </button>
        </div>
        {isModalVisible1 && (
          <div className="relative" style={{ zIndex: 60 }}>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
              <div className="bg-white p-6 rounded-md max-w-3xl w-full">
                <div className="flex justify-end">
                  <button className="text-red-500 hover:text-gray-700" onClick={handleCloseModalne}>
                    Close
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {image.map((imageUrl, index) => (
                    <div key={index} className="w-full mb-4">
                      <img
                        src={imageUrl}
                        alt={`Image ${index}`}
                        className="w-full h-auto max-w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {datas.length > 0 && <HistoryCommentList datas={datas} />}
        {datas.length === 0 && (
          <div className="w-full text-center py-5 ">
            <h1 className="text-xl lg:text-4xl">
              You don't have any comments yet
            </h1>
          </div>
        )}
        <div className="flex flex-col items-center justify-center">

          {video && video.map((item) => (

            <div key={item.sukien_video[0].id_video} className="my-1 p-4 border rounded-[20px] shadow-md flex bg-white w-[75%] cursor-pointer transition-transform transform hover:scale-105"
              onClick={() => handleDetail(item.sukien_video[0].id_video)}>
              <img
                src={item.sukien_video[0].link_image}
                alt={item.sukien_video[0].ten_su_kien}
                className="mr-4 h-[90px] w-[90px] object-cover rounded-lg"
              />
              <div className="w-2/3 text-center ">
                <p className="font-semibold  text-gray-800 text-4xl ">{item.sukien_video[0].ten_su_kien}</p>
                <p className="text-xl text-gray-600">{item.sukien_video[0].thoigian_taosk}</p>
                {/* Thêm các thông tin khác bạn muốn hiển thị */}
              </div>
            </div>



          ))}
          <div className="overflow-x-auto">
            <div className="pagination text-4xl flex justify-start items-center my-6">
              <button
                onClick={() => handlePageChange(count - 1)}
                disabled={count === 1}
                className="py-2 px-3 bg-[#ff9f9f] rounded hover:bg-[#ff9f9f8c]"
              >
                <svg
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                >
                  <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
                  <path d="M13.293 7.293 8.586 12l4.707 4.707 1.414-1.414L11.414 12l3.293-3.293-1.414-1.414z" />
                </svg>
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`mx-1 text-white font-medium py-2 px-3 rounded ${count === index + 1 ? 'bg-red-700' : 'bg-[#ff9f9f]'
                    }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(count + 1)}
                disabled={count === totalPages}
                className="py-2 px-3 bg-[#ff9f9f] rounded hover:bg-[#ff9f9f8c]"
              >
                <svg
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                >
                  <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
                  <path d="M9.293 8.707 12.586 12l-3.293 3.293 1.414 1.414L15.414 12l-4.707-4.707-1.414 1.414z" />
                </svg>
              </button>
            </div>
          </div>
        </div>


        {showEvent && nic.length > 0 ? (
          <EventListProfile data={nic} closeTab={() => setShowEvent(false)} />
        ) : null}
        {showEvent && nic.length == 0 ? (
          <div className="w-full text-center py-5 ">
            <h1 className="text-xl lg:text-4xl">
              You don't have any event yet
            </h1>
          </div>
        ) : null}
      </div>
    </div >
  );
}

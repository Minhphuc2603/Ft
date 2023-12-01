import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import boy from "../components/image/nam.png";
import boyM from "../components/image/Component131.png";
import girlM from "../components/image/Component130.png";
import uilPlus from "../components/image/uil_plus.png";
import girl from "../components/image/nu.png";
import heart from "../components/image/heart.png";
import g1 from "../components/image/howto-1.jpeg";
import g2 from "../components/image/howto-2.jpg";
import g6 from "../components/image/howto-6.png";
import g3 from "../components/image/howto-3.jpg";
import g4 from "../components/image/howto-4.png";
import g5 from "../components/image/howto-5.png";
import l1 from "../components/image/loi-1.jpeg";
import l2 from "../components/image/loi-2.jpeg";
import l3 from "../components/image/loi-3.png";
import l4 from "../components/image/loi-4.png";
import l5 from "../components/image/loi-5.png";
import l6 from "../components/image/loi-6.jpg";

import imgBg from "../components/image/backgroundLove.jpg";

import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Clock from "../components/clock";

import * as faceapi from "face-api.js";
import "../css/AddEvent.css";
import RenderRandomWaitImage from "../components/randomImages";
import { useId } from "react";
import "@tensorflow/tfjs";
import * as ml5 from "ml5";

function Home() {
  const Api_key = "ba35005b6d728bd9197bfd95d64e4e39";
  const serverGenarateSK = "https://thinkdiff.us";

  const imageModelURL =
    "https://teachablemachine.withgoogle.com/models/BlP1OZ89F/";
  const classifierRef = useRef(null);
  const [showModal, setShowModal] = React.useState(false);
  const [nam1, setBoy] = useState(boy);
  const [nu1, setNu] = useState(girl);
  const [nam2, setBoy2] = useState(boyM);
  const [nu2, setNu2] = useState(girlM);
  const [uil, setUil] = useState(uilPlus);
  const [bsHeart, setHeart] = useState(heart);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showImg, setShowImg] = useState({ img1: null, img2: null });
  const [randomImages, setRandomImages] = useState(null);
  const [isModelWarning, setIsModelWarning] = useState(false);
  const [modelAlert, setModelAlert] = useState({ status: false, message: "" });
  const userInfo = JSON.parse(window.localStorage.getItem("user-info"));
  const token = userInfo && userInfo.token;
  const [filled, setFilled] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hi, setHi] = useState(false);
  
  useEffect(() => {
    if (filled < 100 && isRunning) {
      setTimeout(() => setFilled((prev) => (prev += 2)), 1900);
    }
  }, [filled, isRunning]);
  
  const [sameFace, setSameFace] = useState({
    img1: null,
    img2: null,
  });
  const [imgSucess] = React.useState([g1, g2, g6, g3, g4, g5]);
  const [imgError] = React.useState([l1, l2, l3, l4, l5, l6]);
  const images = [
    {
      url: l1,
      description:
        "Glasses are not allowed, You must choose a photo with a clear face, only one face, no mask, no glasses, no backlight, no makeup",
    },
    {
      url: l2,
      description:
        "Do not turn your back on the lens, You must choose a photo with a clear face, only one face, no mask, no glasses, no backlight, no makeup",
    },
    {
      url: l3,
      description:
        "Do not turn your back on the lens, You must choose a photo with a clear face, only one face, no mask, no glasses, no backlight, no makeup",
    },
    {
      url: l4,
      description:
        "Photos with unclear faces, photos of people practicing yoga, or photos that are too far away with unclear faces are also not accepted, You must choose a photo with a clear face, only one face, no mask, no glasses, no backlight, no makeup",
    },
    {
      url: l5,
      description:
        "Photos with unclear faces, photos of people practicing yoga, or photos that are too far away with unclear faces are also not accepted, You must choose a photo with a clear face, only one face, no mask, no glasses, no backlight, no makeup",
    },
    {
      url: l6,
      description:
        "You must not grimace or cover your face with your hands, You must choose a photo with a clear face, only one face, no mask, no glasses, no backlight, no makeup",
    },
  ];
  const [showModals22, setShowModals22] = React.useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageClick = (item) => {
    setSelectedImage(item);
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  const [isModalVisible1, setModalVisible1] = useState(false);

  const handleOpenModal = async () => {
    try {
      await Images();
      setModalVisible1(true);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleOpenModal1 = async () => {
    try {
      await Images1();
      setModalVisible1(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModalne = () => {
    setModalVisible1(false);
  };

  const [image, setImage] = useState("");
  const Images = async () => {
    try {
      const response = await axios.get(
        `https://metatechvn.store/images/${idUser}?type=nam`
      );
      const message = "Missing param!!!, your type is nam";
      if (response.data === message) {
        toast.warning("Missing param!!!, your type is nam");
      }
      setImage(response.data.image_links_nam);
      console.log(response.data.image_links_nam);
    } catch (error) {
      toast.warning(error);
    }
  };
  const Images1 = async () => {
    try {
      const response = await axios.get(
        `https://metatechvn.store/images/${idUser}?type=nu`
      );
      const message = "Missing param!!!, your type is nu";
      if (response.data === message) {
        toast.warning("Missing param!!!, your type is nu");
      }
      setImage(response.data.image_links_nu);
      console.log(response.data.image_links_nu);
    } catch (error) {
      toast.warning(error);
    }
  };

  useEffect(() => {
    loadModels();
  }, []);
  const loadModels = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      faceapi.nets.ssdMobilenetv1.loadFromUri("./models"),
    ]).then(() => {});
  };

  const closeUploadImg = async () => {
    setImage1(null);
    setImage2(null);
    setShowModal(false);
    setIsLoading(false);
    setShowImg({ img1: null, img2: null });
    document.querySelector("#img1").value = "";
    document.querySelector("#img2").value = "";
    return;
  };

  const validImage = async (image) => {
    try {
      const imageElement = document.createElement("img");
      imageElement.src = image;
      const netInput = imageElement;
      // console.log(netInput); // object img with src = blob:....
      let detections = await faceapi
        .detectAllFaces(netInput, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
      const detections2 = await faceapi
        .detectAllFaces(netInput, new faceapi.SsdMobilenetv1Options())
        .withFaceLandmarks()
        .withFaceExpressions();

      if (detections.length > 1) return detections;
      if (detections2.length == 0) return detections2;
      if (detections2.length == 1) return detections2;
      return detections;
    } catch (error) {
      console.log(error);
    }
  };

  const [srcnam, Setsrcnam] = useState("");
  const [srcnu, Setsrcnu] = useState("");

  useEffect(() => {
    loadImageClassifier();
  }, []);

  async function loadImageClassifier() {
    try {
      setIsLoading(true);
      const model = await ml5.imageClassifier(imageModelURL + "model.json");
      console.log(model);
      if (model) {
        setIsLoading(false);
        classifierRef.current = model;
      }
    } catch (error) {
      console.error("Error loading model: ", error);
    }
  }

  const classifyUploadedFile = (file) => {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.src = url;
      img.onload = () => {
        if (classifierRef.current) {
          classifierRef.current.classify(img, (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results[0].label);
            }
          });
        }
      };
    });
  };

  const handleChangeImage = async (event, setImage, atImg) => {
    let file = event.target.files[0];
    if (!file) {
      return;
    }
    setIsLoading(true);
    
    try {
      if (!URL.createObjectURL(file)) return setShowModal(true);
      const label = await classifyUploadedFile(file);
      if (label === "Correct: Mask On") {
        setIsLoading(false);
        closeUploadImg();
        setModelAlert({
          status: true,
          message: "Please choose a photo without a mask",
        });
        return;
      }
      const res = await validImage(URL.createObjectURL(file));
      if (res.length == 0) {
        setIsLoading(false);
        closeUploadImg();
        return setModelAlert({
          status: true,
          message: "No faces can be recognized in the photo",
        });
      }
      if (res.length > 1) {
        setIsLoading(false);
        closeUploadImg();
        return setModelAlert({
          status: true,
          message: "Photos must contain only one face",
        });
      }
      atImg === "img1"
        ? setSameFace({
            img1: res[0]?.detection?._score,
            img2: sameFace.img2,
          })
        : setSameFace({
            img1: sameFace.img1,
            img2: res[0]?.detection?._score,
          });
      if (
        sameFace.img1 === res[0]?.detection?._score ||
        sameFace.img2 === res[0]?.detection?._score
      ) {
        setIsLoading(false);
        closeUploadImg();
        return setModelAlert({
          status: true,
          message: "Photos cannot be the same",
        });
      }
      setIsLoading(false);
      // if (validateImgage(res) == undefined) return;

      if (atImg == "img1") {
        let send = showImg;
        send.img1 = URL.createObjectURL(file);
        setShowImg(send);
        setImage(file);
        const res1 = await uploadImage(file);
        if (!res1) {
          closeUploadImg();
        }

        Setsrcnam(res1);
      } else {
        let send = showImg;
        send.img2 = URL.createObjectURL(file);
        setShowImg(send);
        setImage(file);
        const res2 = await uploadImageNu(file);

        if (!res2) {
          closeUploadImg();
        }
        Setsrcnu(res2);
      }
    } catch (error) {
      console.log(error);
      setShowModal(true);
      setIsLoading(false);
      closeUploadImg();
    }
  };
  const getMyDetailUser = async () => {
    try {
      const { data } = await axios.get("https://api.ipify.org/?format=json");

      if (data.ip) {
        const browser = window.navigator.userAgent;
        return {
          browser: browser,
          ip: data.ip,
          nameM: data.ip + " " + "Boy",
          nameF: data.ip + " " + "Girl",
        };
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const idUser = userInfo && userInfo.id_user;

  const uploadImage = async (image) => {
    if (idUser === null) {
      toast.warning("Login is required");
      navigate("/login");
    }
    const formData = new FormData();
    formData.append("src_img", image);
    try {
      if (image) {
        const apiResponse = await axios.post(
          `https://metatechvn.store/upload-gensk/${idUser}?type=src_nam`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return apiResponse.data;
      }
      return null;
    } catch (error) {
      toast.error(error.response.data.message);
      return null;
    }
  };
  const uploadImageNu = async (image) => {
    if (idUser === null) {
      toast.warning("Login is required");
      navigate("/login");
    }
    const formData = new FormData();
    formData.append("src_img", image);
    try {
      if (image) {
        const apiResponse = await axios.post(
          `https://metatechvn.store/upload-gensk/${idUser}?type=src_nu`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return apiResponse.data;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const fetchData = async () => {
    try {
      if (image1 == null || image2 == null) {
        toast.warning(" Please choose the image!!");
        return;
      }

      setIsLoading(true);
      setHi(true);
      setIsRunning(true);

      const device = await getMyDetailUser();

      const res3 = await createEvent(
        srcnam,
        srcnu,
        device.browser,
        device.ip,
        device.nameM,
        device.nameF
      );

      if (res3 && res3.error) {
        toast.error(res3.error);
        return;
      }
      setIsLoading(false);
      toast.success("Upload and save data completed successfully");
      const eventId = res3.success.sukien[0].id_toan_bo_su_kien;
      const folder = res3.success.sukien[0].folder;
      navigate(`/detail/${eventId}/1`);

      await createAnotherEvent(
        eventId,
        folder,
        device.browser,
        device.ip,
        device.nameM,
        device.nameF
      );
    } catch (error) {
      setRandomImages(null);
      setIsLoading(false);
      console.error(error);
    }
  };

  const createEvent = async (srcnam, srcnu, browser, ip, male, female) => {
    try {
      const user = JSON.parse(window.localStorage.getItem("user-info"));
      if (!user) throw new Error("User info not found");

      const response = await axios.get(`${serverGenarateSK}/getdata`, {
        params: {
          device_them_su_kien: browser,
          ip_them_su_kien: ip,
          id_user: user.id_user,
          ten_nam: male,
          ten_nu: female,
        },
        headers: {
          linknam: srcnam,
          linknu: srcnu,
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      return { success: response.data };
    } catch (error) {
      setIsLoading(false);
      // console.error(error.message);
      return { error: error.message };
    }
  };

  const createAnotherEvent = async (
    idTB,
    folder,
    browser,
    ip,
    male,
    female
  ) => {
    const user = JSON.parse(window.localStorage.getItem("user-info"));
    if (!user) {
      return false;
    }
    try {
      const response = await axios.get(`${serverGenarateSK}/getdata/skngam`, {
        params: {
          id_toan_bo_su_kien: idTB,
          device_them_su_kien: browser,
          ip_them_su_kien: ip,
          id_user: user.id_user,
          ten_nam: male,
          ten_nu: female,
        },
        headers: {
          linknam: srcnam,
          linknu: srcnu,
          folder,
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(
        "Created implicit event successfully. Please reload the page or the system will reload the page in 7 seconds!!"
      );
      setTimeout(() => {
        window.location.reload();
      }, 7000);
      return { success: response };
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  //chon anh da qua su dung anh nam
  const updateImg1 = (imgne) => {
    // Cập nhật chỉ img1 và giữ nguyên img2
    setShowImg((prevState) => ({
      ...prevState,
      img1: imgne,
    }));
    setModalVisible1(false);
  };

  const updateImg2 = (imgne) => {
    // Cập nhật chỉ img1 và giữ nguyên img2
    setShowImg((prevState) => ({
      ...prevState,
      img2: imgne,
    }));
    setModalVisible1(false);
  };

  useEffect(() => {}, [image1], [image2]);
  const renderLoading = () => {
    if (isLoading) {
      return (
        <div className="fixed top-0 min-w-[100%] h-[100vh] z-30">
          <div className="absolute top-0 min-w-[100%] h-[100vh] bg-red-500 opacity-30 z-10"></div>
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
            }}
            className="absolute z-20 opacity-100 -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4"
          >
            <ReactLoading type={"bars"} color={"#C0C0C0"} />
          </div>
        </div>
      );
    }
    return null;
  };

  const funcModelAlert = () => {
    if (modelAlert.status) {
      return (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative max-w-3xl mx-auto my-6 w-96">
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                <div className="relative flex-auto p-6">
                  <p className="my-4 text-3xl leading-relaxed text-slate-500 slab">
                    {modelAlert.message}
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                  <button
                    className="text-[#FF2C61] slab hover:bg-[#ED709D] hover:text-white font-bold uppercase px-6 py-3 rounded-xl text-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setModelAlert({ status: false, message: "" });
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      );
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${imgBg})`, minHeight: "100vh" }}
      className="bg-no-repeat bg-cover"
    >
      <Header />
      <div className="flex justify-center mb-24 max-lg:mt-11">
        <Clock check={randomImages} />
      </div>
      {hi ? (
        <div className="flex items-center justify-center ">
          <div className="z-50 progressbar ">
            <div
              style={{
                height: "100%",
                width: `${filled}%`,
                backgroundColor: "#a66cff",
                transition: "width 0.5s",
              }}
            ></div>
            <span className="progressPercent">{filled}%</span>
          </div>
        </div>
      ) : (
        ""
      )}
      {randomImages !== null && (
        <RenderRandomWaitImage images1={randomImages} />
      )}
      {isLoading ? renderLoading() : ""}
      {modelAlert.status ? funcModelAlert() : ""}
      <div className="hidden lg:block">
        <div className="flex justify-between pb-32 lg:mx-52">
          <div>
            <div
              style={{
                backgroundImage: `url(${nam1})`,
                height: `411px`,
                width: `410px`,
              }}
              alt=""
              className="relative responsiveImg"
            >
              <div
                className="responsiveImg absolute cursor-pointer w-[331px] h-[331px] rounded-[50%] mt-110 ml-6 bg-center bg-no-repeat bg-cover bottom-0 mb-[14px]"
                style={
                  showImg.img1
                    ? { backgroundImage: `url(${showImg.img1})` }
                    : null
                }
              ></div>
              <input
                onChange={(e) => {
                  handleChangeImage(e, setImage1, "img1");
                }}
                style={
                  showImg.img1
                    ? { backgroundImage: `url(${showImg.img1})` }
                    : null
                }
                type="file"
                accept="image/*"
                id="img1"
                className={
                  image1
                    ? " opacity-0 responsiveImg cursor-pointer w-[331px] h-[331px] rounded-[50%] mt-110 ml-6 bg-center bg-no-repeat bg-cover"
                    : " opacity-0 cursor-pointer w-[331px] h-[331px] rounded-[50%] absolute mt-110 ml-6 bg-center bg-no-repeat bg-black"
                }
              />
            </div>
            <div className="text-center lg:mt-16 text-3xl slab text-[#7A1E3E] font-semibold">
              <div>
                <button
                  className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                  onClick={handleOpenModal}
                >
                  Male photo
                </button>
              </div>
              {isModalVisible1 && (
                <div className="relative" style={{ zIndex: 60 }}>
                  <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="w-full max-w-3xl p-6 bg-white rounded-md">
                      <div className="flex justify-end">
                        <button
                          className="text-red-500 hover:text-gray-700"
                          onClick={handleCloseModalne}
                        >
                          Close
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {image.map((imageUrl, index) => (
                          <div
                            key={index}
                            className="w-full mb-4"
                            onClick={() => updateImg1(imageUrl)}
                          >
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

              {/* MALE */}
              {/* <div className="flex items-center justify-center w-10/12 mx-auto my-2 border rounded-md shadow-md">
                <div>
                  <button
                    type=" submit"
                    className="flex items-center bg-gray-100 rounded-l-md border border-white justify-center w-[36px] h-[36px] text-white "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={26}
                      height={26}
                      viewBox="0 0 24 24"
                      style={{
                        fill: "rgba(0, 0, 0, 1)",
                        transform: "",
                        msfilter: "",
                      }}
                    >
                      <circle cx={12} cy={4} r={2} />
                      <path d="M15 7H9a1 1 0 0 0-1 1v7h2v7h4v-7h2V8a1 1 0 0 0-1-1z" />
                    </svg>
                  </button>
                </div>
                <div className="w-full">
                  <input
                    type="search"
                    x-model="input1"
                    className="w-full h-[36px] px-4 py-4 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none"
                    placeholder="Name Male"
                    onChange={(e) => setNameMale(e.target.value)}
                  />
                </div>
                    </div> */}
            </div>
          </div>

          <div
            onClick={() => fetchData()}
            className="flex items-center justify-center mx-auto transition-transform duration-300 hover:scale-125"
          >
            <img
              src={bsHeart}
              alt=""
              className="bg-center bg-no-repeat cursor-pointer lg:w-48 lg:h-44"
            />
          </div>

          {/*  */}
          {/* <div className="flex items-center justify-center transition-transform duration-300 hover:scale-125 ">
          <BsFillHeartFill className="w-48 h-48 text-[#FF9F9F] " />
          <span
            onClick={fetchData}
            className="text-4xl font-bold mt-14 absolute text-[#7A1E3E]"
          >
            Bắt đầu
          </span>
        </div> */}

          {/*  */}

          <div className="">
            <div
              style={{
                backgroundImage: `url(${nu1})`,
                height: `419px`,
                width: `407px`,
              }}
              alt=""
              className=""
            >
              <div
                className="responsiveImg absolute cursor-pointer w-[331px] h-[331px] rounded-[50%] mt-4 ml-24 bg-center bg-no-repeat bg-cover"
                style={
                  showImg.img2
                    ? { backgroundImage: `url(${showImg.img2})` }
                    : null
                }
              ></div>
              <input
                onChange={(e) => handleChangeImage(e, setImage2, "img2")}
                id="img2"
                style={
                  image2
                    ? { backgroundImage: `url(${image2})` }
                    : { backgroundImage: `url(${uil})` }
                }
                type="file"
                accept="image/*"
                className={
                  image2
                    ? " opacity-0 cursor-pointer w-[331px] h-[331px] rounded-[50%] absolute mt-4 ml-24 bg-center bg-no-repeat bg-cover"
                    : "opacity-0 cursor-pointer w-[331px] h-[331px] rounded-[50%] ml-24 mt-4 absolute bg-center bg-no-repeat"
                }
              />
            </div>

            <div className="text-center lg:mt-16 text-3xl slab text-[#7A1E3E] font-semibold">
              <div>
                <button
                  className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                  onClick={handleOpenModal1}
                >
                  Fmale photo
                </button>
              </div>
              {isModalVisible1 && (
                <div className="relative" style={{ zIndex: 60 }}>
                  <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="w-full max-w-3xl p-6 bg-white rounded-md">
                      <div className="flex justify-end">
                        <button
                          className="text-red-500 hover:text-gray-700"
                          onClick={handleCloseModalne}
                        >
                          Close
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {image.map((imageUrl, index) => (
                          <div
                            key={index}
                            className="w-full mb-4"
                            onClick={() => updateImg2(imageUrl)}
                          >
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
              {/* FEMALE */}
              {/* <div className="flex items-center justify-center w-10/12 mx-auto my-2 border rounded-md shadow-md">
                <div>
                  <button
                    type=" submit"
                    className="flex items-center bg-gray-100 rounded-l-md border border-white justify-center w-[36px] h-[36px] text-white "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={26}
                      height={26}
                      viewBox="0 0 24 24"
                      style={{
                        fill: "rgba(0, 0, 0, 1)",
                        transform: "",
                        msfilter: "",
                      }}
                    >
                      <circle cx={12} cy={4} r={2} />
                      <path d="M14.948 7.684A.997.997 0 0 0 14 7h-4a.998.998 0 0 0-.948.684l-2 6 1.775.593L8 18h2v4h4v-4h2l-.827-3.724 1.775-.593-2-5.999z" />
                    </svg>
                  </button>
                </div>
                <div className="w-full ">
                  <input
                    type="search"
                    x-model="input1"
                    className="w-full h-[36px] px-4 py-4 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none"
                    placeholder="Name Female"
                    onChange={(e) => setNameFemale(e.target.value)}
                  />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      {/* MOBILE */}

      <div className="flex justify-between pb-32 mx-9 lg:hidden">
        <div>
          <div
            style={{
              backgroundImage: `url(${nam2})`,
              height: `120px`,
              width: `116px`,
            }}
            alt=""
            className="relative"
          >
            <div
              className="absolute top-[5%] right-[12.5%]  cursor-pointer w-[95px] h-[95.5px]  rounded-[50%] mt-4 bg-center bg-no-repeat bg-cover"
              style={
                showImg.img1
                  ? { backgroundImage: `url(${showImg.img1})` }
                  : null
              }
            ></div>
            <input
              onChange={(e) => handleChangeImage(e, setImage1, "img1")}
              id="img1"
              style={
                image1
                  ? { backgroundImage: `url(${image1})` }
                  : { backgroundImage: `url(${uil})` }
              }
              type="file"
              accept="image/*"
              className={
                image1
                  ? " opacity-0 cursor-pointer w-[95px] h-[95.5px] rounded-[50%] absolute bg-center bg-no-repeat bg-cover"
                  : "opacity-0 cursor-pointer w-[95px] h-[95.5px] rounded-[50%] absolute bg-center bg-no-repeat"
              }
            />
          </div>

          <div className="text-center lg:mt-16 my-3 text-2xl slab text-[#7A1E3E] font-semibold">
            {/* MALE */}
            {/* <div className="flex items-center justify-center w-10/12 mx-auto my-2 border rounded-md shadow-md">
              <div className="w-full max-w-[120px]">
                <input
                  type="search"
                  x-model="input1"
                  className="w-full h-[28px] px-4 py-4 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none"
                  placeholder="Male"
                  onChange={(e) => setNameMale(e.target.value)}
                />
              </div>
            </div> */}
          </div>
        </div>

        {/*  */}
        <div
          onClick={() => fetchData()}
          className="flex items-center justify-center mx-auto transition-transform duration-300 hover:scale-125"
        >
          <img
            src={bsHeart}
            alt=""
            className="cursor-pointer lg:w-32 lg:h-28 W-[70px] h-[90px] bg-center bg-no-repeat"
          />
        </div>
        {/*  */}

        <div>
          <div
            style={{
              backgroundImage: `url(${nu2})`,
              height: `120px`,
              width: `116px`,
            }}
            alt=""
            className="relative"
          >
            <div
              className="absolute top-[-9.5%] right-[2%]  cursor-pointer w-[95px] h-[95.5px]  rounded-[50%] mt-4 bg-center bg-no-repeat bg-cover"
              style={
                showImg.img2
                  ? { backgroundImage: `url(${showImg.img2})` }
                  : null
              }
            ></div>
            <input
              onChange={(e) => handleChangeImage(e, setImage2, "img2")}
              id="img2"
              style={
                image2
                  ? { backgroundImage: `url(${image2})` }
                  : { backgroundImage: `url(${uil})` }
              }
              type="file"
              accept="image/*"
              className={
                image2
                  ? " opacity-0 cursor-pointer w-[95px] h-[95.5px] rounded-[50%] absolute bg-center bg-no-repeat bg-cover"
                  : "opacity-0 cursor-pointer w-[95px] h-[95.5px] rounded-[50%] absolute bg-center bg-no-repeat"
              }
            />
          </div>
          <div className="text-center lg:mt-16 my-3  text-2xl slab text-[#7A1E3E] font-semibold">
            {/* FEMALE */}
            {/* <div className="flex items-center justify-center w-10/12 mx-auto my-2 border rounded-md shadow-md">
              <div className="w-full max-w-[120px]">
                <input
                  type="search"
                  x-model="input1"
                  className="w-full h-[28px] px-4 py-4 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none"
                  placeholder="Female"
                  onChange={(e) => setNameFemale(e.target.value)}
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {isModelWarning ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative max-w-3xl mx-auto my-6 w-96">
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                <div className="relative flex-auto p-6">
                  <p className="my-4 text-3xl leading-relaxed text-slate-500 slab">
                    Please select a photo to continue
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                  <button
                    className="text-[#FF2C61] slab hover:bg-[#ED709D] hover:text-white font-bold uppercase px-6 py-3 rounded-xl text-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setIsModelWarning(false);
                    }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
      <div className="relative" style={{ zIndex: 60 }}>
        {/* Nội dung khác của bạn */}
        {isModalVisible && (
          <div className="fixed z-50 flex flex-col items-center p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg top-1/2 left-1/2">
            <button
              className="absolute text-gray-500 top-2 right-2 hover:text-gray-700"
              onClick={handleCloseModal}
            >
              {/* Bạn có thể thay thế 'X' bằng biểu tượng đóng hoặc bất kỳ văn bản nào bạn muốn */}
              X
            </button>
            <div className="flex-grow"></div>
            <img
              className="h-auto max-w-full lg:max-w-lg md:max-w-md sm:max-w-sm"
              src={selectedImage.url}
              alt=""
            />
            <div className="flex-grow"></div>
            <p className="text-center">{selectedImage.description}</p>
            {/* Thêm nút đóng hoặc bất kỳ phần tử nào khác nếu cần */}
          </div>
        )}
      </div>

      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative max-w-3xl mx-auto my-6 w-96">
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                <div className="relative flex-auto p-6">
                  <p className="my-4 text-3xl leading-relaxed text-slate-500 slab">
                    Can't recognize faces
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                  <button
                    className="text-[#FF2C61] slab hover:bg-[#ED709D] hover:text-white font-bold uppercase px-6 py-3 rounded-xl text-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      closeUploadImg();
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
      {showModals22 ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto outline-none focus:outline-none">
            <div className="relative w-[1000px]  max-w-3xl">
              <div className="lg:-ml-16 ml-6 lg:w-[680px] lg:py-4 lg:px-8 w-[400px] border-0 rounded-lg shadow-lg relative flex flex-col bg-black outline-none focus:outline-none">
                <div className="relative px-10 flex-auto  lg:h-[700px] h-[600px] text-white">
                  <h1 className="mt-40 text-center text-black-500 slab max-lg:pt-8 text-4xl md:text-[32px] leading-relaxed text-white">
                    Complete upload
                  </h1>
                  <div className="text-3xl text-white md:mt-10">
                    <div className="my-8">
                      <h1 className="flex text-4xl text-green-600 md:py-1">
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
                  <div className="text-3xl text-white md:mt-10">
                    <div className="my-8">
                      <h1 className="flex text-4xl text-red-600 md:py-1">
                        <img
                          className="h-[30px]"
                          src="https://i.ibb.co/bJ517B1/close-removebg-preview.png"
                          alt=""
                        />{" "}
                        Bad photos
                      </h1>
                      <p className="w-[350px] max-lg:text-2xl">
                        Group pics, face small or not visible, sunglass, animal
                      </p>
                    </div>
                    <div className="flex gap-3 overflow-x-scroll">
                      {images?.map((item, index) => (
                        <div
                          key={index}
                          className="relative lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] rounded-lg overflow-hidden"
                          onClick={() => handleImageClick(item)}
                        >
                          <img
                            src={item.url}
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
                </div>
                <div className="mt-40 relative lg:left-[540px] lg:-top-[700px] left-[340px] -top-[610px] w-[50px] flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
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
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}

      {/* footer */}

      <div className="ocean">
        <div className="absolute wave2"></div>
        <div className="wave"></div>
      </div>
    </div>
  );
}

export default Home;

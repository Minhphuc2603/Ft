import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import boy from "../components/image/nam.png";
import nen from "../components/image/phucnen4.jpeg"
import imgBg from "../components/image/backgroundLove.jpg";
import ReactLoading from "react-loading";
import dl1 from "../components/image/dl1.webp"
import "react-toastify/dist/ReactToastify.css";
import * as faceapi from "face-api.js";
import "../css/AddEvent.css";
import RenderRandomWaitImage from "../components/randomImages";
import { toast } from "react-toastify";

function Video() {
  const serverGenarateSK = "https://thinkdiff.us";
  const [showModal, setShowModal] = React.useState(false);
  const [nam1, setBoy] = useState(boy);
  const [image1, setImage1] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showImg, setShowImg] = useState({ img1: null });
  const [randomImages, setRandomImages] = useState(null);
  const [modelAlert, setModelAlert] = useState({ status: false, message: "" });
  const userInfo = JSON.parse(window.localStorage.getItem("user-info"));
  const token = userInfo && userInfo.token;
  
  const totalPages = 100;

  const handlePageChange = (page) => {
    // Kiểm tra giới hạn trang để đảm bảo rằng trang không vượt quá giới hạn
    const newPage = Math.min(Math.max(1, page), totalPages);
    setCount(newPage);
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
    ]).then(() => { });
  };

  const idUser = userInfo && userInfo.id_user;
  const [apiKeys, setApiKeys] = useState([]);
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/sonnh7289/python3-download/main/key-ios.json?fbclid=IwAR0CQmAJ4L10gG-po0-LcEja-gNZoNaz01J9CLvGP4shGFnUhcmZvBw-3O0')
      .then(response => response.json())
      .then(data => {
        const keys = data.map(item => item.APIKey);
        setApiKeys(keys);
      })
      .catch(error => console.error('Lỗi:', error));
  }, []);
  useEffect(() => {
    if (apiKeys.length > 0) {
      const apiKey = chooseAPIKey();
      console.log(apiKey);
    }
  }, [apiKeys]);
  function chooseAPIKey() {
    const randomIndex = Math.floor(Math.random() * apiKeys.length);
    return apiKeys[randomIndex];
  }
  const uploadImage = async (image, setImage) => {
    const formData = new FormData();
    formData.append("image", image);
    try {
      if (image) {
        const input = document.getElementById(
          setImage === setImage1 ? "male" : "female"
        );
        if (input) {
          input.style.display = "none";
        }
        const apiKey = chooseAPIKey();
        const apiResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          formData
        );
        setImage(apiResponse.data.data.url);
        return { success: apiResponse.data.data.url };
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const closeUploadImg = async () => {
    setImage1(null);
    setShowModal(false);
    setIsLoading(false);
    setShowImg({ img1: null });
    document.querySelector("#img1").value = "";
    return;
  };
  const validImage = async (image) => {
    try {
      const imageElement = document.createElement("img");
      imageElement.src = image;
      const netInput = imageElement;
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
  const handleChangeImage = async (event, setImage, atImg) => {
    let file = event.target.files[0];
    if (!file) {
      return;
    }
    setIsLoading(true);
    try {
      if (!URL.createObjectURL(file)) return setShowModal(true);
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

      setIsLoading(false);
      if (atImg == "img1") {
        let send = showImg;
        send.img1 = URL.createObjectURL(file);
        setShowImg(send);
        // Gọi hàm uploadImage với file ảnh
        await uploadImage(file, setImage1);
      }
    } catch (error) {
      console.log(error);
      setShowModal(true);
      setIsLoading(false);
      closeUploadImg();
    }
  };

  //
  const [video, setVideo] = useState("")

  const [count, setCount] = useState(1);

  useEffect(() => {
    axios.get(`https://metatechvn.store/lovehistory/video/${count}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        const errorMessage = "exceed the number of pages!!!";
        if (response.data === errorMessage) {
          // Nếu response.data trùng với chuỗi thông báo, hiển thị alert
          toast.error(errorMessage);
        } else {
          // Nếu không trùng, cập nhật state như bình thường
          setVideo(response.data);
          console.log("list video", response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [count, token]);



  const getMyDetailUser = async () => {
    try {
      const { data } = await axios.get("https://api.ipify.org/?format=json");

      if (data.ip) {
        const browser = window.navigator.userAgent;
        return {
          browser: browser,
          ip: data.ip,
        };
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };


  const [selectedVideo, setSelectedVideo] = useState(null);
  function handleDownloadClick(videoURL) {
    setSelectedVideo(videoURL);
    playSelectedVideo();
  }

  function playSelectedVideo() {
    const videoElement = document.getElementById('selected-video');
    if (videoElement) {
      videoElement.load();
      videoElement.play();
    }
  }



  useEffect(() => { }, [image1]);
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
            className="absolute -translate-x-2/4 opacity-100 -translate-y-2/4 left-2/4 top-2/4 z-20"
          >
            <ReactLoading type={"bars"} color={"#C0C0C0"} />
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <div
      style={{
        backgroundImage: `url(${nen})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%',
      }}
      className="bg-no-repeat bg-cover"
    >
      <Header />
      {randomImages !== null && (
        <RenderRandomWaitImage images1={randomImages} />
      )}
      {isLoading ? renderLoading() : ""}
      

      <div className="video-container">
        <p className="font-serif font-medium p-9 italic text-white" style={{ fontSize: '3em' }}>
          Results video</p>
        {video && video.list_sukien_video.map((v) => (
          <Link to={`/detailVideo/${v.sukien_video[0].id_video}`}>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 inline-block border border-gray-300 rounded-lg shadow-lg text-center" key={v.sukien_video[0].id_video}>
            <video className="w-full h-auto" controls>
              <source src={v.sukien_video[0].link_vid_swap} type="video/mp4" />
            </video>
            <div className="uppercase text-white tracking-wide text-sm font-semibold">{v.sukien_video[0].ten_su_kien}</div>
            <p className="mt-2 text-white">{v.sukien_video[0].thoigian_taosk}</p>
          </div>
          </Link>
        ))}
      </div>
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
      {/* <div className="pagination text-4xl flex justify-center my-6" >
        <button onClick={() => setCount(count - 1)} disabled={count === 1}
          className="py-2 px-3 bg-[#ff9f9f] rounded hover:bg-[#ff9f9f8c]">
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
        <button
          className="mx-3 text-white font-medium py-2 px-4 rounded bg-red-700"
        >
          {count}
        </button>
        <button onClick={() => setCount(count + 1)}
          className="py-2 px-3 bg-[#ff9f9f] rounded hover:bg-[#ff9f9f8c]">
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
      </div> */}

    </div >
  );
}

export default Video;

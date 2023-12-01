import React, { useEffect, useState } from "react";
import img1 from "../../../components/image/finish.png";
import img2 from "../img/phaitren1.png";
import img3 from "../img/phaiduoi1.png";
import img4 from "../img/traitren1.png";
import img5 from "../img/traiduoi1.png";
import CmtPopup from "../CmtPopup";
import Clock from "../../../components/CLockEvent";
import moment from "moment";
import { useParams } from "react-router";
import axios from "axios";
import nam1 from "../img/nam1.png";
import nu1 from "../img/nu1.png";

function Template1(props) {
  const { id } = useParams();

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const data = props.data;
  const stt = data.so_thu_tu_su_kien;
  const tolll = data.real_time;
  const handleOpenImagePopup = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsImagePopupOpen(true);
  };
  console.log(tolll)
  useEffect(() => {
    if (isOpenPopup) {
      const formData = new FormData();
      formData.append("id_toan_bo_su_kien", id);
      formData.append("so_thu_tu_su_kien", stt);

      axios
        .post("https://sakaivn.online/countview", formData)
        .then((response) => {
          console.log("API response:", response.data.count_view);
        })
        .catch((error) => {
          console.error("Lỗi khi gửi request API:", error);
        });
    }
  }, [isOpenPopup, id, stt]);
  document.addEventListener('DOMContentLoaded', function() {
    const ogImageMeta = document.querySelector('meta[property="og:image"]');
    ogImageMeta.setAttribute('content', data.link_da_swap);
  });
   
  
  const cmt =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096950-1@2x.png";
  const view =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096951-1@2x.png";
  if (tolll === undefined) return <div></div>;
  return (
    


    <div className="h-full flex flex-col items-center justify-center overflow-hidden">
      <div className="mb-10 mt-20">
        <Clock
          data={String(tolll)
            }
        />
      </div>
      <div className="lg:hidden scroll-container lg:h-[30%] lg:w-[100%] flex items-center justify-center mt-4">
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
            src={data.link_nam_goc}
            alt=""
            className="lg:w-[80%] lg:h-[80%] w-[80%] h-[80%] object-cover  rounded-full lg:mt-[25px] lg:ml-[6px] mt-6 ml-2"
            onClick={() => handleOpenImagePopup(data.link_nam_goc)}
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
            src={data?.link_nu_goc}
            alt=""
            className="lg:w-[80%] lg:h-[80%] w-[80%] h-[80%] object-fill  rounded-full lg:mt-[25px] ml-6 mt-2 lg:ml-9"
            onClick={() => handleOpenImagePopup(data.link_nu_goc)}
          />
        </div>
      </div>
      <div
        className={`border-8 border-pink-300 w-full lg:h-[550px] bg-white rounded-[36px] flex lg:flex-row flex-col-reverse mt-[50px] items-center justify-center relative gap-x-20 overflow-hidden`}
      >
        <div className="-ml-2 bg-no-repeat bg-cover lg:w-[55%] w-full flex flex-col justify-between mt-8">
          <div>
            <img
              src={img2}
              alt=""
              className="lg:ml-[5px] lg:mt-[3px] absolute top-0 left-0"
            />
          </div>
          {/* image love */}
          <div className="flex flex-col lg:ml-[100px] mx-14 items-center justify-center mt-[100px]">
            <span
              key={data.id}
              to={`/ array / ${data.id}`}
              className="text-5xl mt-[-100px] "
            >
              {data.ten_su_kien}
            </span>
            <p className="text-3xl font-[Montserrat] max-w-lg pt-3 max-h-[42rem] overflow-y-auto mt-[50px] text-center lg:text-left">
              {data.noi_dung_su_kien}
            </p>
            <div className="flex flex-row ">
              <div className="flex mt-[30px]">
                <img className="h-[28px] w-[35px] " src={cmt} />
                <div className="text-2xl ml-[10px]">{data.count_comment}</div>
              </div>
              <div className="flex mt-[30px] ml-[100px]">
                <img className="h-[28px] w-[35px] " src={view} />
                <div className="text-2xl ml-[10px]">{data.count_view}</div>
              </div>
            </div>
            <div className="lg:my-4 my-10">
              <span
                style={{ fontStyle: "normal" }}
                className="text-time text-3xl mb-4 block"
              >
                {(data.real_time)
                  }
              </span>
            </div>
          </div>
          {/* image swap */}
          <div className="absolute left-0 bottom-0">
            <img src={img3} alt="" className="" />
          </div>
        </div>
        <div className="bg-no-repeat bg-cover w-[55%] flex flex-col justify-between ">
          <div className="absolute right-0 top-0">
            <img src={img4} alt="" />
          </div>
          <div
            className="flex align-center items-center justify-center"
            onClick={() => setIsOpenPopup(true)}
          >
            <div>
              <div
                style={{ backgroundImage: `url(${data.link_da_swap})` }}
                className=" lg:w-[450px] lg:h-[450px]  rounded-full bg-center bg-no-repeat bg-cover 5  "
              >
                <div
                  style={{ backgroundImage: `url(${img1})` }}
                  className="rounded-[32px] bg-no-repeat bg-cover lg:w-[495px] lg:h-[465px] w-[300px] h-[300px] ml-[-35px] mt-6"
                />
              </div>
              {/* first event */}
            </div>
          </div>
          <div className="absolute right-0 bottom-0">
            <img src={img5} alt="" className="" />
          </div>
        </div>
        {isOpenPopup && (
          <CmtPopup
            setIsOpenPopup={setIsOpenPopup}
            data={data}
            TemplateCmt="TemplateCmt1"
            stt={props.stt}
          />
        )}
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
      </div>
    </div>
  
  );
}

export default Template1;

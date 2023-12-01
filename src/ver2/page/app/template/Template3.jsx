import React, { useState, useEffect } from "react";
import axios from "axios";
import tron1 from "../img/tron2.png";
import bg1 from "../img/bg4.jpeg";
import CmtPopup from "../CmtPopup";
import Clock from "../../../components/CLockEvent";
import moment from "moment";
import { useParams } from "react-router";

function Template3(props) {
  const { id } = useParams();
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const data = props.data;
  const stt = data.so_thu_tu_su_kien
  
  const cmt =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096950-1@2x.png";
  const view =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096951-1@2x.png";
  useEffect(() => {
    if (isOpenPopup) {
      const formData = new FormData();
      formData.append("id_toan_bo_su_kien", id);
      formData.append("so_thu_tu_su_kien", stt);

      axios.post("http://14.225.7.221:8989/countview", formData)
        .then(response => {
          console.log("API response:", response.data.count_view);
        })
        .catch(error => {
          console.error("Lỗi khi gửi request API:", error);
        });
    }
  }, [isOpenPopup, id, stt]);
  const handlePopupClick = (e) => {
    e.preventDefault();
    setIsOpenPopup(true);
  };
  console.log(data.real_time)

  const handleClosePopup = () => {
    setIsOpenPopup(false);
  };
  return (
    <div className="min-w-full min-h-full overflow-hidden"
    >
      <div className="mt-20 mb-10 flex flex-col items-center ">
        <Clock data={data.real_time } />
      </div>
      <div
        style={{ backgroundImage: `url(${bg1})` }}
        className={`border-8 border-pink-300 w-full lg:h-[550px] bg-white rounded-[36px] flex lg:flex-row flex-col-reverse mt-[50px] items-center justify-center relative gap-x-20 overflow-hidden`}
        onClick={handlePopupClick}
      >
        <div className="grid grid-cols-3" >
          <div className="bg-no-repeat bg-cover lg:w-96 lg:h-96 w-48 h-48 relative">
            < div className="flex justify-center items-center">
              <div
                style={{
                  backgroundImage: `url(${tron1})`
                  , marginTop: "20%"
                }}
                className="bg-no-repeat bg-cover lg:w-96 lg:h-96 w-48 h-48 z-10"
              ></div>
              <div
                style={{
                  backgroundImage: `url(${data.link_da_swap})`,
                  borderRadius: '50%',
                  backgroundSize: 'cover',

                  marginTop: '20%',  // Thay đổi khoảng cách dọc giữa các ảnh
                  backgroundPosition: 'center',
                }}
                className="bg-no-repeat bg-cover lg:w-72 lg:h-72 w-36 h-36 absolute"
              ></div>
            </div>


          </div>
          <div className="flex flex-col justify-center items-center mt-12">
            {/* image love */}
            <span
              key={data.id}
              to={`/ array / ${data.id
                }`}
              className="lg:text-[24px] starborn leading-tight mb-4"
            >
              {data.ten_su_kien}
            </span>
            <div className="box lg:h-52 h-36 mt-3">
              <p className="slab font-semibold lg:text-[16px]"
              >
                {
                  data
                    .noi_dung_su_kien
                }
              </p>
            </div>

            <div className="my-4 slab font-semibold lg:text-[16px]">
              <span className="mt-4 block text-time">
                {(data.real_time)}
              </span>
            </div>
          </div>
          <div className="bg-no-repeat bg-cover lg:w-96 lg:h-96 w-48 h-48 relative ml-auto">
            < div className="flex justify-center items-center">
              <div
                style={{
                  backgroundImage: `url(${tron1})`
                  , marginTop: "20%"
                }}
                className="bg-no-repeat bg-cover lg:w-96 lg:h-96 w-48 h-48 z-10"
              ></div>
              <div
                style={{
                  backgroundImage: `url(${data.link_da_swap})`,
                  borderRadius: '50%',
                  backgroundSize: 'cover',

                  marginTop: '20%',  // Thay đổi khoảng cách dọc giữa các ảnh
                  backgroundPosition: 'center',
                }}
                className="bg-no-repeat bg-cover lg:w-72 lg:h-72 w-36 h-36 absolute"
              ></div>
            </div>
          </div>
        </div>
      </div>

      {isOpenPopup && (
        <CmtPopup
          setIsOpenPopup={handleClosePopup}
          data={data}
          TemplateCmt="TemplateCmt3"
          stt={props.stt}
        />
      )}


    </div>
  );
}

export default Template3;

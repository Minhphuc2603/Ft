import React, { useState, useEffect } from "react";
import CmtPopup from "../CmtPopup";
import Clock from "../../../components/CLockEvent";
import moment from "moment";
import axios from "axios";
import { useParams } from "react-router";
import nam1 from "../img/nam1.png";
import nu1 from "../img/nu1.png";

function Template4(props) {
  const { id } = useParams();
  console.log(id);

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const data = props.data;
  console.log("====================================");
  console.log("Props, ", props);
  const stt = data.so_thu_tu_su_kien;
  console.log("====================================");
  const cmt =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096950-1@2x.png";
  const view =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096951-1@2x.png";

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

  return (
    <div className="flex flex-col items-center overflow-hidden ">
      <div className="my-20">
        <Clock
          data={data.real_time
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
              // onClick={() => handleOpenImagePopup(dataUser.link_nam_goc)}
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
              // onClick={() => handleOpenImagePopup(dataUser.link_nu_goc)}
            />
          </div>
        </div>
      <div
        className={` lg:w-[1019px] w-[400px] h-full  border-8 border-pink-300  bg-white rounded-[36px] flex lg:flex-row flex-col gap-x-10 overflow-hidden`}
      >
        <div
          className="h-[300px] lg:h-auto lg:w-[60%] w-full"
          style={{
            backgroundImage: `url(${data.link_da_swap})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
          onClick={setIsOpenPopup.bind(this, true)}
        />
        <div className="h-[auto] lg:mt-[70px] mt-[30px] lg:ml-[20px] text-center lg:text-left flex flex-col items-center my-8">
          {/* <div className="content-none absolute border-[100px 0 0 173.2px]"> */}
          <span
            key={data.id}
            to={`/ array / ${data.id}`}
            className="lg:text-5xl text-4xl "
          >
            {data.ten_su_kien}
          </span>
          <p className="lg:text-3xl text-2xl font-[Montserrat] max-w-lg overflow-y-auto  lg:mt-[50px] mt-[20px] text-center">
            {data.noi_dung_su_kien}
          </p>
          <div className="flex flex-row ">
            <div className="flex mt-[10px]">
              <img className="h-[28px] w-[35px] " src={cmt} alt="" />
              <div className="text-2xl ml-[10px]">{data.count_comment}</div>
            </div>
            <div className="flex mt-[10px] ml-[100px]">
              <img className="h-[28px] w-[35px] " src={view} alt="" />
              <div className="text-2xl ml-[10px]">{data.count_view}</div>
            </div>
          </div>
          <div className="my-4 ">
            <span
              style={{ fontStyle: "normal" }}
              className="text-time text-3xl "
            >
              {
              (data.real_time)
                }
            </span>
          </div>
          {/* </div> */}
        </div>
        {isOpenPopup && (
          <CmtPopup
            setIsOpenPopup={setIsOpenPopup}
            data={data}
            TemplateCmt="TemplateCmt4"
            stt={props.stt}
          />
        )}
      </div>
    </div>
  );
}

export default Template4;

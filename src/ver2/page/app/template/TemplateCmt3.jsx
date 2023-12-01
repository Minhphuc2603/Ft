import React, { useState, useEffect } from "react";
import bgr from "../img/bg4.jpeg";
import moment from "moment";
import tron1 from "../img/tron2.png";

function TemplateCmt3(props) {
  // const { id } = useParams();
  const { data, onClick } = props;

  const cmt =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096950-1@2x.png";
  const view =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096951-1@2x.png";

  return (
    <div className="relative  lg:w-[1024px] h-full flex justify-center overflow-hidden">
      <div
        style={{ backgroundImage: `url(${bgr})`,
       }}
        className={
          // "absolute z-20  min-w-full min-h-full lg:w-full w-[auto] border-8 border-pink-300  lg:h-[380px] rounded-[36px] flex flex-row items-center justify-center overflow-visible"
          "lg:w-full w-[auto] flex flex-row items-center justify-center h-full border-8 border-pink-300  bg-white  rounded-[36px] overflow-hidden"
        }
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
                onClick={onClick}
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
              <span
                style={{ fontStyle: "normal", marginTop: 100 }}
                className="text-time"
              >
                {/* {array.sukien[array.sukien.length - 1].real_time} */}
                {moment(
                  data.real_time
                )
                  .add(7, "hours")
                  .format("YYYY-MM-DD HH:mm:ss")}
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
                onClick={onClick}
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

    </div>
  );
}

export default TemplateCmt3;

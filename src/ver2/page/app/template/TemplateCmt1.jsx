
import img1 from "../../../components/image/finish.png";
import img2 from "../img/phaitren1.png";
import img3 from "../img/phaiduoi1.png";
import img4 from "../img/traitren1.png";
import img5 from "../img/traiduoi1.png";
import moment from "moment";

function TemplateCmt1(props) {
  // const { id } = useParams();
  const { data, onClick } = props;

  const cmt =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096950-1@2x.png";
  const view =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096951-1@2x.png";

  return (
    <div className=" flex rounded-t-[36px] h-full relative">
      <div
        className={`lg:w-full w-[380px] border-8 border-pink-300  rounded-[36px] flex lg:flex-row flex-col-reverse justify-center items-center overflow-hidden`}
      >
        <div className="-ml-2 bg-no-repeat bg-cover w-[70%] flex flex-col justify-between items-center">
          <div className="absolute top-4 left-4 lg:w-[20%] w-[30%]">
            <img src={img2} alt="" className="" />
          </div>
          <div className="flex items-center justify-around">
            {/* image love */}
            <div className="flex flex-col items-center lg:ml-[100px]">
              <span
                key={data.id}
                to={`/ array / ${data.id}`}
                className="lg:text-5xl text-3xl text-center lg:mt-[60px] lg:mb-[16px] mt-[20px]"
              >
                {data.ten_su_kien}
              </span>
              <p className="lg:text-3xl text-xl font-[Montserrat] max-w-lg lg:pt-3 overflow-y-auto 2 lg:mt-5 mt-3 text-center ">
                {data.noi_dung_su_kien}
              </p>
              <div className="flex flex-row items-center justify-center">
                <div className="flex mt-[30px]">
                  <img className="h-[28px] w-[35px] " src={cmt} alt="" />
                  <div className="text-2xl ml-[10px]">{data.count_comment}</div>
                </div>
                <div className="flex mt-[30px] ml-[100px]">
                  <img className="h-[28px] w-[35px] " src={view} alt="" />
                  <div className="text-2xl ml-[10px]">{data.count_view}</div>
                </div>
              </div>
              <div className="my-8">
                <span
                  style={{ fontStyle: "normal" }}
                  className="text-time text-3xl"
                >
                  {moment(data.real_time)
                    .add(7, "hours")
                    .format("YYYY-MM-DD HH:mm:ss")}
                </span>
              </div>
            </div>
            {/* image swap */}
          </div>
          <div className="absolute bottom-4 left-4 lg:w-[20%] w-[30%]">
            <img src={img3} alt="" className="" />
          </div>
        </div>
        <div className="bg-no-repeat bg-cover w-[55%] flex flex-col justify-between ">
          <div className="absolute top-4 right-4 lg:w-[20%] w-[30%]">
            <img src={img4} alt="" />
          </div>
          <div className="flex items-center justify-center">
            <div
              style={{ backgroundImage: `url(${data.link_da_swap})` }}
              className=" lg:w-[250px] lg:h-[240px] w-[120px] h-[120px] rounded-full bg-center bg-no-repeat bg-cover"
              onClick={onClick}
            >
              <div
                style={{ backgroundImage: `url(${img1})` }}
                className="rounded-[32px] bg-no-repeat bg-cover lg:w-[265px] lg:h-[245px] w-[120px] h-[120px]"
              />
            </div>
          </div>
          <div className="absolute bottom-4 right-4 lg:w-[20%] w-[30%]">
            <img src={img5} alt="" className="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplateCmt1;

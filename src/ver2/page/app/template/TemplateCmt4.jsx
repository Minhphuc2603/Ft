import moment from "moment";


function TemplateCmt4(props) {
  // const { id } = useParams();
  const { data, onClick } = props;

  const cmt =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096950-1@2x.png";
  const view =
    "https://generation-sessions.s3.amazonaws.com/a6c87cf4275ca96f7141a113f2447e31/img/group-48096951-1@2x.png";

  return (
    <div className=" flex overflow-hidden h-full relative">
      <div
        className={` lg:w-[1019px] w-[380px]  rounded-t-[36px] border-8 border-pink-300  h-full bg-white flex lg:flex-row flex-col gap-y-6 overflow-hidden gap-x-10`}
      >
        <div
          className="h-[260px] lg:w-full lg:h-full"
          style={{
            backgroundImage: `url(${data.link_da_swap})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          onClick={onClick}
        />
        <div className="h-[80%] lg:mt-[50px] lg:ml-[20px] lg:w-full mx-6 flex flex-col items-center justify-center">
          {/* <div className="content-none absolute border-[100px 0 0 173.2px]"> */}
          <span
            key={data.id}
            to={`/ array / ${data.id}`}
            className="lg:text-5xl text-4xl text-center  lg:mt-[40px] "
          >
            {data.ten_su_kien}
          </span>
          <p className="lg:text-3xl text-2xl font-[Montserrat] max-w-lg pt-3  text-center overflow-y-auto lg:mt-[20px] lg:mb-[20px]">
            {data.noi_dung_su_kien}
          </p>
          <div className="flex flex-row ">
            <div className="flex mt-[10px]">
              <img className="h-[28px] w-[35px] " src={cmt} alt="cmt" />
              <div className="text-2xl ml-[10px]">{data.count_comment}</div>
            </div>
            <div className="flex mt-[10px] ml-[100px]">
              <img className="h-[28px] w-[35px] " src={view} alt="view" />
              <div className="text-2xl ml-[10px]">{data.count_view}</div>
            </div>
          </div>
          <div className="my-1">
            <span
              style={{ fontStyle: "normal" }}
              className="text-time lg:text-3xl text-2xl "
            >
              {moment(data.real_time)
                .add(7, "hours")
                .format("YYYY-MM-DD HH:mm:ss")}
            </span>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default TemplateCmt4;

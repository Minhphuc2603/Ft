import { Fragment, useEffect, useState, useRef } from "react";
import "./About.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import useEvenStore from "../utils/store";

function ViewResult() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const setEvent = useEvenStore((state) => state.setEvent);
  const eventRefs = useRef([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://sakaivn.online/lovehistory/${id}`
      );
      setData(response.data);
      setEvent(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleEventClick = (index) => {
    const eventElement = eventRefs.current[index];
    if (eventElement) {
      eventElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="wrapper-about flex flex-col justify-center content-center">
      <div className="about-top">
        <div className="male">
          <div
            className="image"
            style={{ backgroundImage: `url(${data[0]?.link_nam_goc})` }}
          ></div>
          <div className="name">
            <p>Name Male</p>
          </div>
        </div>
        <div className="icon-heart"> </div>
        <div className="female">
          <div
            className="image"
            style={{ backgroundImage: `url(${data[0]?.link_nu_goc})` }}
          ></div>
          <div className="name">Name Female</div>
        </div>
      </div>
      {data?.map((dt, index) => (
        <Fragment key={index}>
          <div className="img-swap">
            <div
              className="img-swap-image "
              ref={(el) => (eventRefs.current[index] = el)}
              id={dt.ten_su_kien}
              style={{ backgroundImage: `url(${dt.link_da_swap})` }}
            ></div>
            <div className="name">{dt.ten_su_kien}</div>
          </div>
          <div className="about-main flex justify-center">
            <div className="future-love max-w-7xl">{dt.noi_dung_su_kien}</div>
          </div>
        </Fragment>
      ))}
      <div className="flex justify-center mt-4">
        <button className="border-solid border-2 h-28 w-[246px] border-sky-500 font-semibold text-6xl bg-[#ff9f9f] rounded-[10px] p-2 hover:bg-fuchsia-200">
          Comment
        </button>
      </div>
    </div>
  );
}

export default ViewResult;

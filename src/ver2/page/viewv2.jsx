import Headers from "../components/Header";
import { Fragment, useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Viewer2() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://metatechvn.store/getdata${id}`);
      setData(response.data);

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="flex flex-col h-screen">
      <div className="p-6 fixed">
        <Headers />
      </div>
      <div className="flex overflow-x-auto">
        <div className="flex-row flex">
          {data?.map((dt, index) => (
            <Fragment key={index}>
              <div className="w-[350px] flex justify-center">
                <div className="flex flex-col w-full px-2  text-center">
                  <div
                    className="h-screen w-full bg-center bg-cover bg-no-repeat "
                    style={{ backgroundImage: `url(${dt.link_da_swap})` }}
                  />
                  <span className="text-6xl text-red-500">
                    {dt.ten_su_kien}
                  </span>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Viewer2;

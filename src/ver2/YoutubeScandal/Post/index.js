import React, { useEffect, useState } from "react";
import { CommentIcon, ShareIcon, ViewIcon } from "./../common/CustomIcon/index";
import axios from "axios";
import Comment from "../Comment";
import { useParams } from "react-router-dom";

const Post = ({ showModal }) => {
  const { idVideo } = useParams();
  const [radomEvent, setRandomEvent] = useState({});
  const [showThumbnail, setShowThumbnail] = useState(true);

   const toggleDisplay = () => {
     setShowThumbnail(!showThumbnail);
   };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/db/sk-data.json");
        const data = response.data;

        const dataArrays = Object.values(data);

        const flattenedData = dataArrays.reduce(
          (acc, curr) => acc.concat(curr),
          []
        );

        const shuffledData = flattenedData.sort(() => Math.random() - 0.5);

        const randomIndex = Math.floor(Math.random() * shuffledData.length);
        const selectedData = shuffledData[randomIndex];

        setRandomEvent(selectedData);
      } catch (error) {
        console.error("Error fetching JSON data:", error);
      }
    }
    fetchData();
  }, []);
  //https://www.youtube.com/watch?v=m55PTVUrlnA
  return (
    <div className="grid grid-cols-1 mt-[40px] lg:grid-cols-3 ">
      <div className="rounded-tl-[20px] rounded-bl-[20px] bg-white ml-[10px] h-full">
        {showThumbnail ? (
          <img
            className="h-[35rem] my-5 w-[90%] mx-3 rounded-[20px] object-contain"
            src={`https://img.youtube.com/vi/${idVideo}/hqdefault.jpg`}
            alt="Thumbnail"
            onClick={toggleDisplay}
          />
        ) : (
          <iframe
            className="h-[35rem] my-5 w-[90%] mx-3 rounded-[20px] object-contain"
            src={`https://www.youtube.com/embed/${idVideo}?autoplay=1`}
            allowFullScreen={true}
            allow="autoplay"
          ></iframe>
        )}
      </div>
      <div className="w-full bg-white rounded-tr-[20px] rounded-br-[20px]">
        <div className="flex items-center my-5 mx-3">
          <div className="w-fit h-fit mr-2">
            <img
              src={radomEvent.User_Avatar}
              alt="User Avatar"
              className="w-12 h-12 object-cover rounded-full mx-auto items-center"
            />
          </div>
          <div className="text-lg font-bold">{radomEvent.User_Name}</div>
        </div>
        <div className="mt-3 mb-6 font-semibold ml-3 mr-3">
          {radomEvent.Name}
        </div>
        <div className="flex ml-3">
          <div className="flex grow">
            <ViewIcon width={24} height={24} />
            <p className="font-semibold ml-2">13.2k views</p>
          </div>
          <div className="flex grow-0">
            <p className="font-semibold mr-2">14</p>
            <ShareIcon width={24} height={24} />
          </div>
          <div className="flex grow-0 ml-2 mr-3">
            <p className="font-semibold mr-2">14</p>
            <CommentIcon showModal={showModal} width={24} height={24} />
          </div>
        </div>
      </div>
      <Comment />
    </div>
  );
};

export default Post;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { EnterIcon } from "./../common/CustomIcon/index";
// import parse from "html-react-parser";
// import cheerio from "cheerio";

const Comment = () => {
    const [radomEvents, setRandomEvents] = useState([]);
    const [comments, setComment] = useState([]);
    const [eventOnClick, setEventOnClick] = useState(null);
    const [showReplies, setShowReplies] = useState({});

    useEffect(() => {
        async function fetchEventData() {
            try {
                const response = await axios.get("/db/sk-data.json");
                const data = response.data;
                const flattenedEventData = Object.entries(data).reduce(function (
                    currentValue,
                    accumulateValue
                ) {
                    const [key, value] = accumulateValue;

                    return [
                        ...currentValue,
                        ...value.map((val) => ({ ...val, idParent: key })),
                    ];
                },
                    []);

                const shuffledEventData = flattenedEventData.sort(
                    () => Math.random() - 0.5
                );

                const selectedEventData = shuffledEventData.slice(0, 10);
                setRandomEvents(selectedEventData);
            } catch (error) {
                console.error("Error fetching JSON data:", error);
            }
        }
        fetchEventData();
    }, []);

    useEffect(() => {
        async function fetchCommentData() {
            const response = await axios.get("/db/comment-data.json");
            const data = response.data;

            const flattenedCommentData = Object.entries(data).reduce(function (
                currentValue,
                accumulateValue
            ) {
                const [key, value] = accumulateValue;

                return [
                    ...currentValue,
                    ...value.map((val) => ({ ...val, idParent: key })),
                ];
            },
                []);

            setComment(flattenedCommentData);
        }
        fetchCommentData();
    }, []);

    const handleViewMore =  (eventSTT, eventIdParent) => {
        setEventOnClick({ STT: eventSTT, idParent: eventIdParent });
        setShowReplies((prevShowReplies) => ({
            ...prevShowReplies,
            [eventSTT]: true,
        }));
    };

    const handleHideReplies =  (eventSTT) => {
        setEventOnClick(null)
        setShowReplies((prevShowReplies) => ({
            ...prevShowReplies,
            [eventSTT]: false,
        }));
    };
    return (
      <div className="w-[95%] bg-white ml-3 rounded-[20px]">
        <div className="text-center py-6 relative text-2xl font-extrabold">
          Comments
          <div className="absolute left-0 right-0 h-0.5 bg-gray-200 bottom-0"></div>
        </div>
        <div className="h-[30rem] overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-gray-400 scrollbar-track-gray-300">
          {radomEvents.map((content, index) => (
            <div className="p-5" key={index + 1}>
              <div className="flex">
                <div>
                  <img
                    src={content.User_Avatar}
                    alt="User Avatar"
                    className="w-7 h-7 object-cover rounded-full mx-auto items-center"
                  />
                </div>
                <div className="ml-3 w-full">
                  <div className="border-black bg-gray-custom rounded-mlarge h-auto w-full px-3 pb-2 mb-2">
                    <div>
                      <span className="font-bold">{content.User_Name}</span>
                    </div>
                    <div className="w-full">{content.Name}</div>
                  </div>
                  <div className="flex justify-between w-6/12 text-sm pl-1">
                    <div className="font-bold bg-gradient-to-l from-purple-500 to-pink-500 text-transparent bg-clip-text">
                      Reply
                    </div>
                    <div className="font-bold bg-gradient-to-l from-purple-500 to-pink-500 text-transparent bg-clip-text">
                      Edit
                    </div>
                    <div className="font-bold bg-gradient-to-l from-purple-500 to-pink-500 text-transparent bg-clip-text">
                      2 day ago
                    </div>
                  </div>
                </div>
              </div>
              {(!showReplies[content.STT] && (
                <div
                  className="flex pl-10 pt-3 cursor-pointer"
                  onClick={() => handleViewMore(content.STT, content.idParent)}
                >
                  <EnterIcon width={24} height={24} />
                  <p className="font-bold">View more replies ...</p>
                </div>
              )) || (
                <div className="flex pl-10 pt-3 cursor-pointer">
                  <p
                    className="font-bold"
                    onClick={() => handleHideReplies(content.STT)}
                  >
                    Hide replies ...
                  </p>
                </div>
              )}
              {eventOnClick && eventOnClick.STT === content.STT && (
                <div>
                  {comments
                    .filter(
                      (comment) =>
                        comment.STT_SK === content.STT &&
                        comment.idParent.toLowerCase() ===
                          content.idParent.toLowerCase()
                    )
                    .map((comment, i) => (
                      <div className="p-2 ml-5" key={i}>
                        <div className="flex">
                          <div>
                            <img
                              src={comment.User_Avatar}
                              alt="User Avatar"
                              className="w-7 h-7 object-cover rounded-full mx-auto items-center"
                            />
                          </div>
                          <div className="ml-3 w-full">
                            <div className="border-black bg-gray-custom rounded-mlarge h-auto w-full px-3 pb-2 mb-2">
                              <div className="font-bold text-ellipsis overflow-hidden ...">
                                {comment.User_Name}
                              </div>
                              <div className="w-full">{comment.Comment}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
}

export default Comment
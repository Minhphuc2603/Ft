import React, { useEffect, useState } from "react";
import { CommentIcon, ShareIcon, ViewIcon } from "./../common/CustomIcon/index";
import axios from "axios";

const HomeCart = () => {
    const [radomEvents, setRandomEvents] = useState([]);
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

                const selectedData = shuffledData.slice(0, 5);

                setRandomEvents(selectedData);
            } catch (error) {
                console.error("Error fetching JSON data:", error);
            }
        }
        fetchData();
    }, []);
    return (
        <div className="grid grid-rows-5 grid-cols-1 gap-6 h-fit">
            {radomEvents.map((item, index) => {
                return (
                    <div
                        className="bg-white rounded-[20px] p-2 h-fit drop-shadow-md"
                        key={index + 1}
                    >
                        <div className=" w-full">
                            <img
                                src={item.User_Avatar}
                                alt="User Avatar"
                                className="w-full h-[240px] object-cover rounded-[20px]"
                            />
                        </div>
                        <div className="flex py-6">
                            <div className="flex ml-4">
                                <ViewIcon width={24} height={24} />
                                <p className="font-semibold">13.2k views</p>
                            </div>
                            <div className="flex ml-6">
                                <p className="font-semibold mr-2">14</p>
                                <ShareIcon width={24} height={24} />
                            </div>
                            <div className="flex ml-6">
                                <p className="font-semibold mr-2">14</p>
                                <CommentIcon width={24} height={24} />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default HomeCart;
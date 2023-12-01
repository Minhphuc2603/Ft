import React, { useEffect, useState } from "react";
import axios from "axios";
import { ViewIcon, ShareIcon, CommentIcon } from "../common/CustomIcon";

const Cart = () => {
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

                const selectedData = shuffledData.slice(0, 4);

                setRandomEvents(selectedData);
            } catch (error) {
                console.error("Error fetching JSON data:", error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className='ml-3 pb-[50px] pr-[10px]'>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {radomEvents.map((content,index) => (
                    <div className=" bg-white px-2 pt-2 rounded-[20px] drop-shadow-md h-screen" key={index+1}>
                        <div className="mb-5 h-3/5">
                            <img
                                src={content.User_Avatar}
                                alt="Card Avatar"
                                className="object-cover w-full h-full rounded-mlarge"
                            />
                        </div>
                        <div className="flex mb-3">
                            <div>
                                <img
                                    src={content.User_Avatar}
                                    alt="User Avatar"
                                    className="w-12 h-12 object-cover rounded-full mx-auto items-center"
                                />
                            </div>
                            <div className="pl-3 font-bold text-2xl ml-3">{content.User_Name}</div>
                        </div>
                        <div className="truncate mb-8 font-[Montserrat] text-2xl">{content.Name}</div>
                        <div className="flex justify-end">
                            <div className="flex">
                                <ViewIcon width={24} height={24} />
                                <p className="font-[Montserrat] text-2xl ml-2">13.2k views</p>
                            </div>
                            <div className="flex ml-2">
                                <p className="font-[Montserrat] text-2xl mr-2">14</p>
                                <ShareIcon width={24} height={24} />
                            </div>
                            <div className="flex ml-2">
                                <p className="font-[Montserrat] text-2xl mr-2">14</p>
                                <CommentIcon width={24} height={24} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Cart
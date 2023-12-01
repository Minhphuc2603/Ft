import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ViewIcon,
  ShareIcon,
  CommentIcon,
} from "./../common/CustomIcon/index";

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
                                    className="w-7 h-7 object-cover rounded-full mx-auto items-center"
                                />
                            </div>
                            <div className="pl-3 font-bold">{content.User_Name}</div>
                        </div>
                        <div className="truncate font-semibold mb-8">{content.Name}</div>
                        <div className="flex justify-end">
                            <div className="flex">
                                <ViewIcon width={24} height={24} />
                                <p className="font-semibold ml-2">13.2k views</p>
                            </div>
                            <div className="flex ml-2">
                                <p className="font-semibold mr-2">14</p>
                                <ShareIcon width={24} height={24} />
                            </div>
                            <div className="flex ml-2">
                                <p className="font-semibold mr-2">14</p>
                                <CommentIcon width={24} height={24} />
                            </div>
                        </div>
                    </div>
                ))}
                {/* <div class="group relative">
                    <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <img src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg" alt="Front of men&#039;s Basic Tee in black." class="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                    </div>
                    <div class="mt-4 flex justify-between">
                        <div>
                            <h3 class="text-sm text-gray-700">
                                <a href="#">
                                    <span aria-hidden="true" class="absolute inset-0"></span>
                                    Basic Tee
                                </a>
                            </h3>
                            <p class="mt-1 text-sm text-gray-500">Black</p>
                        </div>
                        <p class="text-sm font-medium text-gray-900">$35</p>
                    </div>
                </div>
                <div class="group relative">
                    <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <img src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg" alt="Front of men&#039;s Basic Tee in black." class="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                    </div>
                    <div class="mt-4 flex justify-between">
                        <div>
                            <h3 class="text-sm text-gray-700">
                                <a href="#">
                                    <span aria-hidden="true" class="absolute inset-0"></span>
                                    Basic Tee
                                </a>
                            </h3>
                            <p class="mt-1 text-sm text-gray-500">Black</p>
                        </div>
                        <p class="text-sm font-medium text-gray-900">$35</p>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Cart
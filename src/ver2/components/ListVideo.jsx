import imgBg from "../components/image/phucnen1.png";
import banner from "../components/image/banner.jpg"
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "./Header";
import img from "../components/image/Screenshot_1.png";


const ListVideo = () => {
    const [category, setCategory] = useState(0)
    const [listVideo, setListVideo] = useState([])
    const [count, setCount] = useState(1)
    const totalPages = 40;

    const handlePageChange = (page) => {
        // Kiểm tra giới hạn trang để đảm bảo rằng trang không vượt quá giới hạn
        const newPage = Math.min(Math.max(1, page), totalPages);
        setCount(newPage);
    };

    useEffect(() => {
        axios
            .get(`https://metatechvn.store/lovehistory/listvideo/${count}?category=${category}`)
            .then((response) => {
                const errorMessage = "exceed the number of pages!!!";

                if (response.data === errorMessage) {
                    // Nếu response.data trùng với chuỗi thông báo, hiển thị alert
                    toast.error(errorMessage);
                } else {
                    // Nếu không trùng, cập nhật state như bình thường
                    setListVideo(response.data.list_sukien_video);
                    console.log("list video", response.data);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [count, category]);
    const BackHome = () => {
        navigate("/");
      };
     const navigate= useNavigate()


    return (
        <>


            <div className="flex justify-center items-start h-full relative">
                <img src={banner} style={{ width: '100%', height: '500px' }} alt="Banner" />
                <div className="flex items-center">

                    <img src={img} alt="" className=" absolute top-0 left-0 lg:w-28 w-24 lg:h-24 h-20 lg:mt-0" />
                    <p
                        className="absolute top-0 left-20 text-pink-600 p-4 lg:text-6xl text-3xl flex items-center starborn "
                        onClick={BackHome}
                    >
                        <Link>FUTURE LOVE</Link>
                    </p>
                    
                </div>
                <div className="absolute bottom-0 left-0 text-gray-800 p-4">

                    <h1 className="font-serif font-semibold text-4xl lg:text-5xl" >A.I Video</h1>
                    <p className="font-serif font-semibold text-4xl" >Predict the future of your journey and love</p>
                </div>
            </div>
            <div className="bg-no-repeat bg-cover">
                <p className="font-serif font-medium p-9 italic text-4xl lg:text-5xl  ">Original video archive :</p>
                <div className=" flex justify-center items-center font-serif font-semibold" style={{ fontSize: '1.5em' }}>
                    <select>
                        {listVideo.map((c) => (
                            <option key={c.id} value={c.id_categories}>
                                {c.name_categories}
                            </option>
                        ))}
                    </select>
                </div>
                {listVideo && listVideo.map((v) => (
                    <Link to={`/make-video?link=${v.link_video}&id=${v.id}`} key={v.id}>
                        <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 p-2 inline-block border border-gray-300 rounded-lg shadow-lg text-center">
                            <video className="w-full h-auto" controls>
                                <source src={v.link_video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <p className="mt-2 font-serif font-semibold" style={{ fontSize: '1.5em' }}>{v.noi_dung}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="overflow-x-auto">
                <div className="pagination text-4xl flex justify-start items-center my-6">
                    <button
                        onClick={() => handlePageChange(count - 1)}
                        disabled={count === 1}
                        className="py-2 px-3 bg-[#ff9f9f] rounded hover:bg-[#ff9f9f8c]"
                    >
                        <svg
                            fill="white"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                        >
                            <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
                            <path d="M13.293 7.293 8.586 12l4.707 4.707 1.414-1.414L11.414 12l3.293-3.293-1.414-1.414z" />
                        </svg>
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`mx-1 text-white font-medium py-2 px-3 rounded ${count === index + 1 ? 'bg-red-700' : 'bg-[#ff9f9f]'
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(count + 1)}
                        disabled={count === totalPages}
                        className="py-2 px-3 bg-[#ff9f9f] rounded hover:bg-[#ff9f9f8c]"
                    >
                        <svg
                            fill="white"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                        >
                            <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
                            <path d="M9.293 8.707 12.586 12l-3.293 3.293 1.414 1.414L15.414 12l-4.707-4.707-1.414 1.414z" />
                        </svg>
                    </button>
                </div>
            </div>


        </>

    );
}

export default ListVideo;
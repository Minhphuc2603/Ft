import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const HistoryCommentList = (props) => {
  // console.log(datas);
  const [datas, setDatas] = useState([]);
  const server = "https://metatechvn.store";
  const [currentPage, setCurrentPage] = useState(1);
  const [actionCMT, setActionCMT] = useState({ status: false, value: 0 });
  const [count, setCount] = useState(1);
  const resultsPerPage = 10;
  const [nameUser, setNameUser] = useState();

  useEffect(() => {
    setDatas(props.datas);
  }, [props.datas]);

  const checkId = useParams().id;
  if (!datas || datas == null)
    return (
      <>
        <h2 className="text-center py-6">
          <div
            role="status"
            className="flex justify-center items-center w-full"
          >
            <svg
              aria-hidden="true"
              className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </h2>
      </>
    );
  if (datas.length == 0) {
    return <div className="text-center text-3xl py-3">No comments yet</div>;
  }
  const dataSort = datas;
  console.log(dataSort);
  console.log(dataSort.id_toan_bo_su_kien);

  const deleteComment = async (idComment) => {
    try {
      const response = await axios.delete(
        `${server}/lovehistory/delete/${idComment}`
      );
      toast.success(response.data.message);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // const dataSort = datas.reverse();
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = dataSort.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(dataSort.length / resultsPerPage);
  const changePageUp = () => {
    if (count < totalPages) {
      setCount(count + 1);
      setCurrentPage(count + 1);
      // fetchData();
    }
  };
  const changePageDown = () => {
    if (count > 1) {
      setCount(count - 1);
      setCurrentPage(count - 1);
      //   fetchData();
    }
  };

  //   console.log(datas);
  //   console.log(totalPages);
  // console.log(currentResults);
  function getTime(time_core) {
    const providedTime = new Date(time_core); // Lưu ý: Tháng bắt đầu từ 0 (0 - 11)
    const currentTime = new Date();
    // Tính khoảng thời gian (tính bằng mili giây)
    const timeDifference = currentTime - providedTime;
    // Chuyển đổi khoảng thời gian từ mili giây sang phút
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    // Tính số ngày, giờ và phút
    const days = Math.floor(minutesDifference / (60 * 24));
    const hours = Math.floor((minutesDifference % (60 * 24)) / 60);
    const minutes = minutesDifference % 60;
    // Tạo kết quả dựa trên số ngày, giờ và phút
    let result = "";
    if (days > 0) {
      result = `${days} days`;
    } else if (hours > 0) {
      result = `${hours} hours`;
    } else {
      result = `${minutes} minutes`;
    }
    return result;
  }
  // const fetchDataUser = async (id_toan_bo_su_kien) => {
  //   try {
  //     const response = await axios.get(
  //       `https://sakaivn.online/lovehistory/${id_toan_bo_su_kien}`
  //     );

  //     setNameUser(response.data.sukien[0].user_name_tao_sk
  //     );
  //     console.log(response.data)

  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  return (
    <>
      <div className="flex justify-center">
        <div className="lg:py-7 shadow-[rgba(0,0,0,0.05)_0px_6px_24px_0px,rgba(0,0,0,0.08)_0px_0px_0px_1px] my-16 lg:w-[1200px] w-[350px] mt-8 lg:mt-0 h-fit bg-white lg:rounded-[36px] max-lg:py-4 rounded-[10px] text-center font-[Montserrat] items-center content-center">
          {currentResults.map((item, index) => (
            <aside key={index} className="px-4">
              <div className="flex justify-between border-b border-[#ff000000] hover:border-gray-300 transition-all">
                <div className="max-lg: lg:max-w-[85%]">
                  <Link
                    to={`/detail/${item.id_toan_bo_su_kien}/${item.so_thu_tu_su_kien}`}
                  >
                    <div className="flex py-2 lg:py-3">
                      <div className="lg:hidden">
                        <div className="w-[40px] h-[40px] bg-white overflow-hidden rounded-full">
                          <img
                            src={item.avatar_user}
                            alt="Avatar user notfound"
                            className="w-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="max-lg:hidden max-lg:w-[50px] max-lg:h-[50px] lg:w-[80px] lg:h-[80px] rounded-full overflow-hidden">
                        <img
                          src={item.avatar_user}
                          alt=""
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="max-lg:pl-2 max-lg:pr-2 lg:w-[85%] lg:ml-4 flex flex-col justify-center lg:gap-3 text-left">
                        <h2 className="line-clamp-1 max-lg:text-xl lg:text-2xl font-medium">
                          {checkId !== undefined ? "His" : "You"} commented on
                          the event of{" "}
                          <span className="underline">{item.user_taosk}</span>
                        </h2>
                        <h5 className="line-clamp-1 max-lg:text-sm text-base">
                          {item.noi_dung_cmt}
                        </h5>
                        {item.imageattach ? (
                          <img
                            className="w-[60px] h-[50px]"
                            src={item.imageattach}
                            alt=""
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="flex justify-center items-center max-lg:gap-2 lg:gap-3 lg:max-w-[15%]">
                  <span className="font-medium max-lg:text-base text-2xl text-gray-700">
                    {getTime(item.thoi_gian_release)}
                  </span>
                  <div className="relative">
                    <button
                      className="lg:text-[5px] max-lg:text-[3px] flex gap-1 py-3"
                      onClick={() =>
                        setActionCMT({
                          status: !actionCMT.status,
                          value: item.id_comment,
                        })
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
                      </svg>
                    </button>
                    {actionCMT.status && actionCMT.value == item.id_comment && (
                      <div className="shadow-[rgba(0,0,0,0.1)_0px_1px_3px_0px,rgba(0,0,0,0.06)_0px_1px_2px_0px] absolute mt-[140%] top-0 right-0 z-10 py-2 px-2 rounded-sm bg-slate-100 text-lg text-black">
                        <button className="py-1 px-3 hover:bg-blue-400 hover:text-white w-full">
                          Edit
                        </button>
                        <button
                          className="py-1 px-3 hover:bg-red-400 hover:text-white"
                          onClick={() => deleteComment(item.id_comment)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </aside>
          ))}
        </div>
      </div>
      <div className="pagination text-4xl flex justify-center my-6">
        <button
          type="button"
          className="py-2 px-3 bg-[#ff9f9f] rounded hover:bg-[#ff9f9f8c]"
          onClick={() => changePageDown()}
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
        <button
          type="button"
          className="mx-3 text-white font-medium py-2 px-4 rounded bg-red-700"
        >
          {count}
          <span className="text-2xl font-bold px-2">/</span>
          {totalPages}
        </button>
        <button
          type="button"
          className="py-2 px-3 bg-[#ff9f9f] rounded hover:bg-[#ff9f9f8c]"
          onClick={() => changePageUp()}
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
    </>
  );
};

export default HistoryCommentList;

import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import send from "./img/send.png";
import TemplateCmt1 from "./template/TemplateCmt1";
import TemplateCmt2 from "./template/TemplateCmt2";
import TemplateCmt3 from "./template/TemplateCmt3";
import TemplateCmt4 from "./template/TemplateCmt4";
import { Link, json, useNavigate, useParams } from "react-router-dom";
import noAvatar from "../app/img/no-avatar.png";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import { Modal } from "antd";

const templateComponents = {
  TemplateCmt1: TemplateCmt1,
  TemplateCmt2: TemplateCmt2,
  TemplateCmt3: TemplateCmt3,
  TemplateCmt4: TemplateCmt4,
};
const userInfo = JSON.parse(window.localStorage.getItem("user-info"));
const idUser = userInfo ? userInfo.id_user : 0;
console.log(idUser);

function CmtPopup(props) {
  const [actionCMT, setActionCMT] = useState({ status: false, value: 0 });
  const param = useParams();
  const [dataCmt, setDataCmt] = useState([]);
  const [location, setLocation] = useState([]);
  const user = JSON.parse(localStorage.getItem("user-info"));
  const userInfo = JSON.parse(window.localStorage.getItem("user-info"));
  const token = userInfo && userInfo.token;
  
  console.log(props);
  const [imgComment, setImgComment] = useState("");
  const templateCmt = props.TemplateCmt;
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [isImageUploading, setIsImageUploading] = useState(false);
  const downloadImg = () => {
    saveAs(selectedImage, "image.png");
  };
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [reportContent, setReportContent] = useState("");
  const [commentId, setCommentId] = useState(null);
  const [commentIdUser, setCommentIdUser] = useState(null);
  const showModal = (commentId, commentIdUser) => {
    setOpen(true);
    setCommentId(commentId); // Lưu id_comment vào state
    setCommentIdUser(commentIdUser);
  };

  const handleOk = async () => {
    try {
      if (!reportContent.trim()) {
        toast.warning("Please enter report content.");
        return;
      }

      // Gửi nội dung report lên API
      const response = await axios.post(
        "https://metatechvn.store/report/comment",
        {
          report_reson: reportContent,
          id_comment: commentId,
          id_user_comment: commentIdUser,
          id_user_report: idUser,
        }
      );
      toast.success(response.data.message);
      setOpen(false);

    } catch (error) {
      console.error("Error sending report:", error);

      alert("Error sending report. Please try again later.");
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

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

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  const maxCharsPerLine = 100; // Số ký tự tối đa cho mỗi dòng
  const maxRows = 10; // Số dòng tối đa cho <textarea>

  const [numLines, setNumLines] = useState(1);

  // Sử dụng useEffect để tính số dòng và cập nhật chiều cao
  useEffect(() => {
    const numNewLines = Math.ceil(inputValue.length / maxCharsPerLine);
    setNumLines(numNewLines > maxRows ? maxRows : numNewLines || 1); // Đảm bảo numLines luôn là ít nhất là 1
  }, [inputValue, maxRows, maxCharsPerLine]);

  // Sử dụng numLines để tính chiều cao dựa trên số dòng
  const textareaStyle = {
    height: `${numLines * 20}px`, // Chiều cao được tính dựa trên số dòng và độ cao mỗi dòng
  };

  //edit cmt
  const [isEditing, setIsEditing] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [websckt,setWebsckt] = useState("");

  const startEdit = (comment) => {
    setIsEditing(true);
    setEditingCommentId(comment.id_comment);
    setEditedComment(comment.noi_dung_cmt);
    setActionCMT({ status: false, value: 0 });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingCommentId(null);
    setEditedComment("");
  };

  const handleEditInputChange = (event) => {
    const newValue = event.target.value;
    setEditedComment(newValue);
  };
  console.log(editingCommentId);
  const updateComment = async () => {
    try {
      const response = await axios.patch(
        `https://metatechvn.store/lovehistory/edit/${editingCommentId}`,
        { content: editedComment },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const updatedDataCmt = dataCmt.map((comment) => {
        if (comment.id_comment === editingCommentId) {
          return {
            ...comment,
            noi_dung_cmt: editedComment,
          };
        }
        return comment;
      });

      setDataCmt(updatedDataCmt);
      cancelEdit();
      toast.success(response.data.message);
    } catch (error) {
      console.error("Lỗi khi cập nhật comment:", error);
      toast.error("Cập nhật comment thất bại");
    }
  };


  //delete cmt
  const deleteComment = async (idComment) => {
    try {
      const response = await axios.delete(
        `https://metatechvn.store/lovehistory/delete/${idComment}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      );
      toast.success(response.data.message);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenImagePopup = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsImagePopupOpen(true);
  };
  const closePopup = () => {
    props.setIsOpenPopup(false);
  };
  const fetchDataCmt = async () => {
    console.log(1234);
    try {
      const response = await axios.get(
        `https://metatechvn.store/lovehistory/comment/${props.data.so_thu_tu_su_kien}?id_toan_bo_su_kien=${param.id}&id_user=${idUser}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.data.comment;
      console.log(response.data.comment);
      setDataCmt(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDataCmt();
  }, []);

  const ne = window.navigator.userAgent;
  const userAgent = window.navigator.userAgent;

  // Tách thông tin trình duyệt và phiên bản từ chuỗi User-Agent
  const browserInfo = userAgent.match(
    /(chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
  );
  const browserName = browserInfo[1];
  const browserVersion = browserInfo[2];

  console.log("Browser:", browserName);
  console.log("Version:", browserVersion);

  const platform = window.navigator.platform;
  console.log("User Operating System:", platform);
  const ipComment = localStorage.getItem("ip");
  const ip = navigator.geolocation;
  console.log("====================================");
  console.log(ip);
  console.log("====================================");
  useEffect(() => {
  const url = "ws://localhost:8888/ws/" + 2;
  const ws = new WebSocket(url);
  ws.onopen = (event) => {
  ws.send("Connect");
  };
  setWebsckt (ws);
  //clean up function when we close page
  return () => ws.close();
  }, []);
  useEffect(() => {
    fetch(`https://api.ip.sb/geoip/${ipComment}`)
      .then((resp) => resp.json())
      .then((data) => {
        setLocation(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [ipComment]);



  const HandleSendCmt = async (e) => {
    setIsImageUploading(true);
    const url = "https://metatechvn.store/lovehistory/comment";
    let comment = {};
    let comment2 = {}

    comment = {
      device_cmt: userAgent,
      id_toan_bo_su_kien: param.id,
      ipComment: ipComment,
      so_thu_tu_su_kien: props.data.so_thu_tu_su_kien,
      imageattach: imgComment ? imgComment : "",
      id_user: user?.id_user,
      location: location.city,
    };
    comment2 = {
      id_toan_bo_su_kien: param.id,
      ipComment: ipComment,
      so_thu_tu_su_kien: props.data.so_thu_tu_su_kien,
      id_user: user?.id_user
    }
    if (!inputValue.trim() && !imgComment) {
      toast.warning("Comment cannot be empty!");
      return;
    }
    const data = { ...comment, noi_dung_cmt: inputValue };
    const jsonData = JSON.stringify(comment2)
    websckt.send(jsonData)
    await axios
      .post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data"
          , Authorization: `Bearer ${token}`
        },
      })
      .then((response) => {
        setInputValue("");
        console.log(response.data);        
        setDataCmt((prev) => [...prev, response.data.comment]);
        setImgComment("");
        setIsImageUploading(false);
        toast.success("Commented!!!");
        fetchDataCmt()

      })
      .catch((error) => {
        toast.error("comment failed");
        console.error("Lỗi khi gửi dữ liệu:", error);
      });
  };
  const TemplateComponent = templateComponents[templateCmt];
  const onSubmitComment = (event) => {
    event.preventDefault();
  };
  const onChangeImgComment = async (event) => {
    setIsImageUploading(true);
    const formData = new FormData();
    formData.append("image", event.target.files[0]);
    const apiResponse = await axios.post(
      `https://api.imgbb.com/1/upload?key=283182a99cb41ed4065016b64933524f`,
      formData
    );
    setImgComment(apiResponse.data.data.url);
    setIsImageUploading(false);
  };
  const removeImgComment = () => {
    setImgComment("");
  };
  // Handle Popup
  const [isImgPopup, setImgPopup] = useState(false);
  const handlePopup = () => {
    setImgPopup(!isImgPopup);
  };
  const customModalCSS = `
    .custom-modal .ant-modal-footer .ant-btn-primary  {
      background-color: red;
      color: white;
      border-color: pink;
    }
  `;
  return (
    <div
      style={{
        position: "fixed",
        background: "rgba(0,0,0,0.6)",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        overflow: "auto",
        display: "flex",
        // flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99,
      }}
    >
      <div className="w-[full] h-full z-[9999]" onClick={closePopup}></div>
      {isImageUploading ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <i
            className="fas fa-circle-notch fa-spin"
            style={{ fontSize: "30px", color: "blue" }}
          />
        </div>
      ) : (
        <>
          {/* {isImgPopup ? (
            <ImagePopup imgSrc={props.data.link_da_swap} closeImg={closePopup} />
          ) : ( */}
          <div className="rounded-lg rounded-t-[36px] flex flex-col h-[95%] w-max bg-white gap-y-4 overflow-y-auto">
            <div
              className="w-full h-[95%] relative"
              onClick={() => handleOpenImagePopup(props.data.link_da_swap)}
            >
              <TemplateComponent data={props.data} onClick={handlePopup} />
            </div>

            <div className="mt-5 flex flex-col gap-y-2 max-h-[60vh] overflow-y-auto">
              {dataCmt?.length > 0 &&
                dataCmt.map((cmt, index) => (
                  <>
                    <div
                      className="flex items-stretch gap-x-4 justify-between relative"
                      key={index}
                    >
                      <div className="overflow-hidden rounded-[50%] w-[40px] h-[40px] ml-[20px]">
                        {cmt && cmt.avatar_user && cmt.avatar_user.startsWith("https") ? (
                          <Link to={cmt.id_user === 0 ? "" : `/user/${cmt.id_user}`}>
                            <img src={cmt && cmt.avatar_user} alt="Avatar" />
                          </Link>
                        ) : (
                          <img src={noAvatar} alt="Avatar" />
                        )}




                      </div>
                      <div className="flex flex-col gap-x-2 font-[Montserrat]">
                        <span className="lg:text-[18px] text-lg font-semibold">
                          {cmt && cmt.user_name ? cmt && cmt.user_name : "Guest"}
                        </span>

                        <>
                          <span
                            className="lg:text-[16px] text-base mt-3 max-w-[25vw] "
                            style={{ whiteSpace: "pre-wrap" }}
                          >
                            {cmt && cmt.noi_dung_cmt}
                          </span>
                          {cmt && cmt.imageattach ? (
                            <img
                              className="w-[60px] h-[50px]"
                              src={cmt.imageattach}
                              alt=""
                              onClick={() =>
                                handleOpenImagePopup(cmt?.imageattach)
                              }
                            />
                          ) : (
                            ""
                          )}
                          <span className="lg:text-base text-sm">
                            {cmt && cmt.device_cmt}
                          </span>
                        </>
                      </div>
                      <div className="lg:text-[13px] text-sm ml-auto font-[Montserrat]">
                        {cmt && cmt.thoi_gian_release}
                      </div>
                      <div className="lg:w-[15%] w-[20%] lg:text-[13px] text-sm font-[Montserrat]">
                        <p> {cmt && cmt.dia_chi_ip}</p>
                        <p> {cmt && cmt.location}</p>
                      </div>
                      <div className="lg:text-[13px] text-sm font-[Montserrat] relative flex gap-3">
                        <button
                          className="lg:text-[5px] max-lg:text-[3px] flex gap-1 py-3"
                          onClick={() =>
                            setActionCMT({
                              status: !actionCMT.status,
                              value: cmt?.id_comment,
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
                        <div className="flex gap-3">
                          {idUser === cmt?.id_user
                            ? actionCMT.status &&
                            actionCMT.value == cmt.id_comment && (
                              <div className="shadow-[rgba(0,0,0,0.1)_0px_1px_3px_0px,rgba(0,0,0,0.06)_0px_1px_2px_0px] absolute  right-12   rounded-sm bg-slate-100 text-lg text-black">
                                <button
                                  className=" flex gap-3 py-1 px-3 hover:bg-blue-400 hover:text-white w-full"
                                  onClick={() => startEdit(cmt)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="py-1 px-3 flex gap-3 hover:bg-red-400 hover:text-white w-full"
                                  onClick={() =>
                                    deleteComment(cmt.id_comment)
                                  }
                                >
                                  Delete
                                </button>
                              </div>
                            )
                            : actionCMT.status &&
                            actionCMT.value == cmt.id_comment && (
                              <div className="shadow-[rgba(0,0,0,0.1)_0px_1px_3px_0px,rgba(0,0,0,0.06)_0px_1px_2px_0px] absolute right-12 rounded-sm bg-slate-100 text-lg text-black">
                                <button
                                  className="py-1 px-3 hover:bg-red-400 hover:text-white w-full"
                                  onClick={() =>
                                    showModal(cmt.id_comment, cmt.id_user)
                                  }
                                >
                                  Report
                                </button>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </>
                ))}
            </div>
            <div className="flex items-center justify-around mx-3 gap-x-4 rounded-full shadow-sm shadow-slate-300">
              <div className="overflow-hidden rounded-full w-[50px]">
                <img
                  src={user?.id_user ? user.link_avatar : noAvatar}
                  alt=""
                  className="w-[100%] h-[100%] object-cover"
                />
              </div>
              {isEditing ? (
                <div className="w-full py-3 px-4 border bg-white border-gray-500 rounded-full ">
                  <form
                    onSubmit={onSubmitComment}
                    className="flex items-center gap-x-4"
                  >
                    <textarea
                      type="text"
                      value={editedComment}
                      onChange={handleEditInputChange}
                      className="w-full h-[50px] border-none outline-none font-[Montserrat]"
                    ></textarea>
                    <div className="inline-block relative">
                      <label htmlFor="edit-file-input">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/685/685655.png"
                          width="20px"
                          height="20px"
                          alt=""
                        />
                        <input
                          type="file"
                          onChange={onChangeImgComment}
                          accept=".jpg"
                          id="edit-file-input"
                          className="absolute left-0 top-0 opacity-0 w-[100%] h-[100%]"
                        />
                      </label>
                    </div>
                    <button
                      className="w-[30px] float-right mr-3"
                      onClick={updateComment}
                    >
                      <img
                        src={send}
                        alt=""
                        className="w-[100%] h-[100%] object-cover"
                      />
                    </button>
                  </form>
                  {imgComment && (
                    <div className="mt-2 flex items-center gap-2">
                      <img
                        className="w-[80px] h-[70px]"
                        src={imgComment}
                        alt="Uploaded"
                      />
                      <button className="mt-[-50px]" onClick={removeImgComment}>
                        <i className="fas fa-times font-bold" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full py-3 px-4 border bg-white border-gray-500 rounded-2xl mb-2">
                  <form
                    onSubmit={onSubmitComment}
                    className="flex items-center gap-x-4"
                  >
                    <textarea
                      style={textareaStyle} // Sử dụng style để cập nhật chiều cao
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      className="w-full h-[100px] h-max-[400px] border-none outline-none font-[Montserrat]"
                    ></textarea>
                    <div className="flex items-center gap-x-4 p-2">
                      <label className="inline-block relative">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/685/685655.png"
                          width="20px"
                          height="20px"
                          alt=""
                        />
                        <input
                          type="file"
                          onChange={onChangeImgComment}
                          accept=".jpg"
                          className="absolute left-0 top-0 opacity-0 w-[0] h-[0]"
                        />
                      </label>
                      <button
                        className="w-[30px] h-[30px]"
                        onClick={HandleSendCmt}
                      >
                        <img
                          src={send}
                          alt=""
                          className="w-[100%] h-[100%]"
                        />
                      </button>
                    </div>


                  </form>
                  {imgComment && (
                    <div className="mt-2 flex items-center gap-2">
                      <img className="w-[80px] h-[70px]" src={imgComment} />
                      <button className="mt-[-50px]" onClick={removeImgComment}>
                        <i className="fas fa-times font-bold" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
      <div className=" h-full z-[100]" onClick={closePopup}>
        <button
          onClick={closePopup}
          className="mt-2 mr-2 px-2 py-1 bg-red-500 hover:bg-red-600 rounded-lg absolute top-0 right-0 text-sm text-white"
          style={{ zIndex: 1 }} // Đảm bảo nút close có độ ưu tiên cao hơn các phần tử khác
        >
          Close
        </button>
      </div>
      <Modal
        title="Report Comment"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Confirm"
        className="custom-modal"
      >
        <style>{customModalCSS}</style>

        <div>
          <label>Report Content:</label>
          <textarea
            style={{ borderColor: "black" }}
            value={reportContent}
            onChange={(e) => setReportContent(e.target.value)}
            rows="4"
            cols="50"
          />
        </div>
      </Modal>

      {isImagePopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="max-w-screen-xl w-80% p-4 bg-white rounded-lg shadow-lg text-center relative">
            <button
              onClick={() => setIsImagePopupOpen(false)}
              className="mt-2 mr-2 px-2 py-1 bg-red-500 hover:bg-red-600 rounded-lg absolute top-0 right-0 text-sm text-white"
              style={{ zIndex: 1 }} // Đảm bảo nút close có độ ưu tiên cao hơn các phần tử khác
            >
              Close
            </button>
            <img
              src={selectedImage}
              alt="Ảnh lớn"
              className="w-100 h-auto mx-auto z-99999"
              style={{ maxHeight: "80vh", zIndex: 0 }} // Đảm bảo ảnh có độ ưu tiên thấp hơn nút close
            />
            <button
              onClick={downloadImg}
              className="mt-2 mr-2 px-2 py-1 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm text-white"
              style={{ zIndex: 1 }} // Đảm bảo nút download có độ ưu tiên cao hơn các phần tử khác
            >
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CmtPopup;

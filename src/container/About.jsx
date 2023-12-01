import { useEffect, useState } from "react";
//import "./About.scss";
import axios from "axios";
import ReactLoading from "react-loading";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../utils/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { getFullFaceDescription, createMatcher, loadModels } from "../api/face";

function About() {
  // const Api_key = "4b92af7f16b0fb074cc5e1c7adfa512a";
  const Api_key = "c9b98b0eb1ba623a2fcb1c3fe6b1f35b";
  const server = "https://sakaivn.online/getdata";

  // Import face profile
  const JSON_PROFILE = require("../descriptors/bnk48.json");

  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [link, setLink] = useState(null);
  const navigate = useNavigate();

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [faceMatcher, setFaceMatcher] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      await loadModels();
      setFaceMatcher(await createMatcher(JSON_PROFILE));
    };

    initialize();
  }, []);

  const uploadImage = async (image, setImage) => {
    const formData = new FormData();
    formData.append("image", image);
    try {
      if (image) {
        const input = document.getElementById(
          setImage === setImage1 ? "male" : "female"
        );
        if (input) {
          input.style.display = "none";
        }
        const apiResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${Api_key}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        let apiImage = apiResponse.data.data.url;

        await getFullFaceDescription(apiImage).then((fullDesc) => {
          if (fullDesc.length == 0) {
            setImage(null);
            window.alert("no face detected");
          } else {
            setImage(apiImage);
          }
        });
      }
    } catch (error) {
      throw error;
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      await uploadImage(image1, setImage1);
      await uploadImage(image2, setImage2);
      const response = await axios.post(
        `${server}`,
        {},
        {
          headers: {
            Link1: image1,
            Link2: image2,
          },
        }
      );
      setData(response.data);
      console.log(response.data);
      const docRef = await addDoc(collection(db.getFirestore(), "futurelove"), {
        data: response.data,
        image1,
        image2,
        timestamp: serverTimestamp(),
      });
      setLink(response.data.id);
      setIsLoading(false);
      toast.success("Upload và lưu dữ liệu thành công");
      navigate("/" + response.data.json2[0].id_toan_bo_su_kien);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const handleChangeImage = async (event, setImage) => {
    event.preventDefault();
    let file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  useEffect(() => {
    uploadImage(image1, setImage1);
  }, [image1]);
  useEffect(() => {
    uploadImage(image2, setImage2);
  }, [image2]);

  const renderLink = () => {
    if (link) {
      return (
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "40px",
          }}
        >
          <a
            href={
              link ? `${window.location.href.replace("About", "")}${link}` : "#"
            }
          >
            Xem lại kết quả của bạn tại đây
          </a>
        </p>
      );
    }
    return null;
  };

  const renderLoading = () => {
    if (isLoading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReactLoading type={"bars"} color={"#000000"} />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="wrapper-about">
      <div className="about-top">
        <div className="male">
          <label htmlFor="male" className="file-input-label">
            Choose File
            <input
              type="file"
              id="male"
              onChange={(e) => handleChangeImage(e, setImage1)}
              accept="image/*"
            />
          </label>
          <div
            className="image"
            style={{ backgroundImage: `url(${image1})` }}
          ></div>
          <div className="name">
            <p>Name Male</p>
          </div>
        </div>
        <div className="icon-heart"> </div>
        <div className="female">
          <label htmlFor="female" className="file-input-label">
            Choose File
            <input
              type="file"
              id="female"
              onChange={(e) => handleChangeImage(e, setImage2)}
              accept="image/*"
            />
          </label>
          <div
            className="image"
            style={{ backgroundImage: `url(${image2})` }}
          ></div>
          <div className="name">
            <p>Female name</p>
          </div>
        </div>
      </div>

      {image1 != null && image2 != null && (
        <div className="about-bottom">
          <button onClick={fetchData}>
            {data.length > 0 ? "Try again" : "Start"}
            <i className="fas fa-sync-alt"></i>
          </button>
        </div>
      )}
      {renderLink()}
      {renderLoading()}
    </div>
  );
}

export default About;

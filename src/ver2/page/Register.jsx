import React, { useEffect, useState } from "react";
import img2 from "../../ver2/components/image/Onboarding.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../css/Header.css";
import axios from "axios";

export default function Register() {
  const [user_name, usernamechange] = useState("");
  const [email, emailchange] = useState("");
  const [password, passwordchange] = useState("");
  const [loading, isLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageName, setImageName] = useState("");
  const navigate = useNavigate();

  const server = "https://metatechvn.store";
  const redirect = () => {
    navigate("/login");
  };

  const IsValidate = () => {
    let isproceed = true;
    let errormessage = "Please enter the value in ";
    if (user_name === null || user_name === "") {
      isproceed = false;
      errormessage += " Username";
    }
    if (email === null || email === "") {
      isproceed = false;
      errormessage += " Email";
    }
    if (password === null || password === "") {
      isproceed = false;
      errormessage += " Password";
    }
    if (imageSrc === null) {
      isproceed = false;
      errormessage += "Image";
    }
    if (!isproceed) {
      toast.warning(errormessage);
    }
    // else {
    //   if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
    //   } else {
    //     isproceed = false;
    //     toast.warning("Please enter the valid email");
    //   }
    // }
    return isproceed;
  };

  const [ipAddress, setIpAddress] = useState(null);

  useEffect(() => {
    fetch('https://api.ipify.org/?format=json')
      .then(response => response.json())
      .then(data => {
        setIpAddress(data.ip);
      })
      .catch(error => console.error('Error:', error));
  }, []);
  const [device , setDevice] = useState("")
  const userAgent = navigator.userAgent;

  useEffect(() => {
    if (userAgent.match(/iPhone/i) || userAgent.match(/iPad/i)) {
      setDevice("iPhone");
    } else if (userAgent.match(/Android/i)) {
      setDevice("Android");
    } else if (userAgent.match(/Macintosh/i)) {
      setDevice("Macbook");
    } else {
      setDevice("Laptop");
    }
  }, []); 



  const handlesubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (IsValidate()) {
      isLoading(true);
      await uploadImg();
      formData.append("link_avatar", `https://i.ibb.co/vjVvZL5/${imageName}`);
      formData.append("user_name", user_name);
      formData.append("password", password);
      formData.append("email", email);
      formData.append("ip_register", ipAddress);
      formData.append("device_register",device)
      try {
        const response = await axios.post(`${server}/register/user`, formData);

        console.log(response.data.account);
        if (response.data.account) {
          navigate("/");
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        // Handle errors, if any
        console.log("sda", error);
      } finally {
        isLoading(false);
      }
    }
  };
  const handleImage = async (e) => {
    setImageSrc(e.target.files[0]);
    setImageName(e.target.files[0].name);
  };
  const uploadImg = async (e) => {
    try {
      var formData = new FormData();
      formData.append("image", imageSrc);
      const apiKey = "dc602cd2409c2f9f06d21dc9f6b26502";
      let body = new FormData();
      body.set("key", apiKey);
      body.append("image", imageSrc);

      await axios({
        method: "post",
        url: "https://api.imgbb.com/1/upload",
        data: body,
      });
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <div
      style={{ backgroundImage: `url(${img2})` }}
      className="h-screen bg-no-repeat bg-cover slab lg:flex lg:items-center"
    >
      <div className="bg-gradient-to-r from-slate-900 to-slate-500 lg:w-[40%] h-[100%] z-30 opacity-75 flex">
        <form className="z-40" onSubmit={handlesubmit}>
          <div className="flex flex-col items-center text-center mx-5">
            <div className="text-white mt-28">
              <h1 className=" text-8xl">Register</h1>
              <p className="text-3xl mt-12">
                Lorem ipsum dolor sit amet consectetur. Lacus pulvinar vitae
                tempor
              </p>
            </div>
            <div className="mt-24">
              <div className="">
                <div className="font-bold">
                  <input
                    value={user_name}
                    onChange={(e) => usernamechange(e.target.value)}
                    className="form-control lg:w-[400px] lg:h-[35px] w-[300px] h-[35px] font-extrabold"
                    placeholder="User Name"
                  />
                </div>
                <div className="mt-12">
                  <input
                    value={email}
                    onChange={(e) => emailchange(e.target.value)}
                    className="form-control lg:w-[400px] lg:h-[35px] w-[300px] h-[35px] font-extrabold"
                    placeholder="Email"
                  />
                </div>
                <div className="mt-12">
                  <input
                    value={password}
                    onChange={(e) => passwordchange(e.target.value)}
                    type="password"
                    className="font-extrabold form-control lg:w-[400px] lg:h-[35px] w-[300px] h-[35px]"
                    placeholder="Password"
                  />
                </div>
                <div className="mt-12">
                  <div>
                    <input
                      onChange={handleImage}
                      type="file"
                      className=" form-control lg:w-[400px] lg:h-[35px] w-[300px] h-[35px]"
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 flex justify-center">
              <button
                type="submit"
                className="mt-3 register-title rounded-full lg:w-[300px] h-[35px] w-[200px] text-4xl  bg-white"
              >
                {loading ? (
                  <div role="status" className="flex justify-center">
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
                  </div>
                ) : (
                  "Register"
                )}
              </button>
            </div>
            <button
              onClick={redirect}
              type="submit"
              className="lg:hidden block buttons rounded-full lg:w-[300px] h-[35px] w-[200px] text-4xl lg:mt-12 my-14 text-white shadow-lg shadow-white-500"
            >
              <div className="flex justify-center items-center">
                <svg
                  className="mr-4"
                  fill="#ffffff"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                </svg>
                <div>Login</div>
              </div>
            </button>
          </div>
        </form>
      </div>

      <div className="lg:w-[60%] lg:block hidden mx-6">
        <div className="text-white flex flex-col items-center">
          <p className="text-3xl mt-12 text-center">
            Lorem ipsum dolor sit amet consectetur. Lacus pulvinar vitae tempor
          </p>
          <button
            onClick={redirect}
            type="submit"
            className="buttons rounded-full lg:w-[300px] h-[35px] w-[200px] text-4xl lg:mt-12 my-14 text-white shadow-lg shadow-white-500"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

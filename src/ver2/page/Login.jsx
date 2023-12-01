import React, { useEffect, useState } from "react";
import img2 from "../../ver2/components/image/Onboarding.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../css/Header.css";
import axios from "axios";

export default function Login() {
  const [email_or_username, usernameupdate] = useState("");
  const [password, passwordupdate] = useState("");
  const [loading, isLoading] = useState(false);
  const [reset, setReset] = useState(false);
  const [emailReset, setEmailReset] = useState("");
 

  const navigate = useNavigate();

  const redirect = () => {
    navigate("/register");
  };
  const ProceedLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email_or_username", email_or_username);
    formData.append("password", password);

    if (validate()) {
      try {
        const response = await axios.post(
          "https://metatechvn.store/login",
          formData
        );
        if (response.data.message) {
          toast.error(response.data.message);
        } else {
          navigate("/");
          // toast.success("Login success")
          window.location.reload();
          response.data = JSON.stringify(response.data);
          localStorage.setItem("user-info", response.data);
        }
      } catch (error) {
        return toast.error("Account or password is incorrect !!!")
      } finally {
        isLoading(false);
      }
    }
  };

  const sendReset = async (e) => {
    e.preventDefault();
    // const param = {
    //     email: emailReset
    // }
    const formData = new FormData();
    formData.append("email", emailReset);

    try {
      isLoading(true);
      const response = await axios.post(
        "https://metatechvn.store/reset",
        formData
      );
      console.log("okoko", response);
      if (
        response.data.message === "Đã reset mật khẩu thành công và gửi email!"
      ) {
        toast.success(response.data.message);
        isLoading(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("sda", error);
    } finally {
      isLoading(false);
    }
  };

  const showReset = () => {
    setReset(true);
  };

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const validate = () => {
    let result = true;
    if (email_or_username === "" || email_or_username === null) {
      result = false;
      toast.warning("Please Enter Username");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Password");
    }
    return result;
  };

  return (
    <div>
      {!reset ? (
        <div
          style={{ backgroundImage: `url(${img2})` }}
          className="h-screen bg-no-repeat bg-cover slab lg:flex lg:items-center"
        >
          <div className="w-[60%] lg:block hidden">
            <div className="text-white flex flex-col items-center">
              <p className="text-3xl mt-12 text-center">
                Lorem ipsum dolor sit amet consectetur. Lacus pulvinar vitae
                tempor
              </p>
              <button
                onClick={redirect}
                type="submit"
                className="buttons rounded-full lg:w-[300px] h-[35px] w-[100px] text-4xl my-14 text-white shadow-lg shadow-white-500"
              >
                Register
              </button>
            </div>
          </div>

          <div className="w-[40%] h-[100%]">
            <div className="bg-gradient-to-r from-slate-900 to-slate-500 w-[100%] h-[100%] z-30 opacity-75 flex">
              <form className="z-40" onSubmit={ProceedLogin}>
                <div className="flex flex-col items-center text-center mx-16">
                  <div className="text-white mt-36">
                    <h1 className="text-8xl text-center">Login</h1>
                    <p className="text-3xl mt-12 text-center">
                      Lorem ipsum dolor sit amet consectetur. Lacus pulvinar
                      vitae tempor
                    </p>
                  </div>
                  <div className="mt-24">
                    <div className="">
                      <div className="font-bold">
                        <input
                          value={email_or_username}
                          onChange={(e) => usernameupdate(e.target.value)}
                          className="form-control lg:w-[400px] lg:h-[35px] w-[300px] h-[35px] font-extrabold"
                          placeholder="User Name"
                        ></input>
                      </div>
                      <div className="mt-12">
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => passwordupdate(e.target.value)}
                          className="form-control lg:w-[400px] lg:h-[35px] w-[300px] h-[35px] font-extrabold"
                          placeholder="Password"
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="mt-10">
                    {/* <button type="submit" className="btn btn-primary">Register</button> */}
                    <button
                      type="submit"
                      className="register-title rounded-full lg:w-[300px] h-[35px] w-[200px] text-4xl bg-white"
                    >
                      Login
                    </button>
                    <p className="text-3xl text-white mt-12">
                      Do you want to{" "}
                      <b className="cursor-pointer" onClick={showReset}>
                        reset password?
                      </b>
                    </p>
                  </div>
                  <button
                    onClick={redirect}
                    type="submit"
                    className="buttons rounded-full lg:hidden block h-[35px] w-[150px] text-4xl my-14 text-white shadow-lg shadow-white-500"
                  >
                    <div className="flex justify-center items-center">
                      <svg
                        className="mr-2"
                        fill="#ffffff"
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 448 512"
                      >
                        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                      </svg>
                      <div>Register</div>
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{ backgroundImage: `url(${img2})` }}
          className="w-[100%] h-screen bg-no-repeat bg-cover flex justify-center items-center slab"
        >
          <div className="">
            <div className="flex flex-col items-center mx-7">
              <b className="text-[24px] mb-3">Forgot password</b>
              <p className="text-[16px]">
                A link with code to reset your password has been sent to your
                email.{" "}
              </p>
              <input
                value={emailReset}
                onChange={(e) => setEmailReset(e.target.value)}
                type="text"
                className="form-control-flush text-[26px] mt-6 lg:w-[500px] "
              />
              <button
                onClick={sendReset}
                className="bg-[#FFFFFF] mt-5 px-36 rounded-full py-1 starborn text-[24px]"
              >
                {loading ? (
                  <div role="status" className="flex justify-center py-3 px-5">
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
                  "Send"
                )}
              </button>
              <button
                className="w-[40px] mt-4 hover:scale-125 transition-all duration-150"
                onClick={() => setReset(false)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M12.4755 5.18341L7.49766 9.60815C6.56708 10.4353 6.10179 10.8489 5.93032 11.3373C5.77974 11.7662 5.77974 12.2335 5.93032 12.6624C6.10179 13.1508 6.56708 13.5644 7.49766 14.3916L12.4755 18.8163C12.8978 19.1917 13.1089 19.3794 13.2883 19.3861C13.4441 19.3919 13.5937 19.3247 13.6929 19.2044C13.807 19.0659 13.807 18.7834 13.807 18.2184V15.4284C16.2351 15.4284 18.7996 16.2083 20.6723 17.5926C21.6471 18.3133 22.1346 18.6737 22.3203 18.6595C22.5012 18.6456 22.6161 18.575 22.71 18.4196C22.8063 18.2603 22.7212 17.7624 22.5511 16.7666C21.4461 10.3004 16.9961 8.57129 13.807 8.57129V5.78134C13.807 5.21632 13.807 4.93381 13.6929 4.79531C13.5937 4.67498 13.4441 4.6078 13.2883 4.61363C13.1089 4.62034 12.8978 4.80803 12.4755 5.18341Z"
                      fill="#fff"
                    ></path>{" "}
                    <g opacity="0.5">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.81777 3.98966C9.53592 3.68613 9.06137 3.66856 8.75784 3.95041L3.54163 8.79403C2.5947 9.67333 2.05664 10.9072 2.05664 12.1994C2.05664 13.5616 2.65432 14.8553 3.69163 15.7382L8.78205 20.0711C9.09747 20.3396 9.57081 20.3016 9.8393 19.9861C10.1078 19.6707 10.0697 19.1974 9.75431 18.9289L4.66389 14.596C3.9614 13.998 3.55664 13.122 3.55664 12.1994C3.55664 11.3243 3.92102 10.4887 4.56231 9.89322L9.77852 5.0496C10.082 4.76775 10.0996 4.2932 9.81777 3.98966Z"
                        fill="#fff"
                      ></path>
                    </g>
                  </g>
                </svg>
                <span className="text-white text-xl mt-2">Back</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

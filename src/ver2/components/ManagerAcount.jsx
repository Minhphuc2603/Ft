import React, { useState } from "react";
import { Link } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import RemoveAccount from "./RemoveAccount";

const ManagerAcount = (props) => {
  
  const [switchOutlet, setSwitchOutlet] = useState("changePassword");
  const user = JSON.parse(window.localStorage.getItem("user-info"));
  if (!user)
    return <div className="text-xl text-center py-3">Loadding ...</div>;
  return (
    <>
      <section className="fixed top-0 left-0 min-w-full h-screen z-10 font-[Montserrat]">
        <div
          className="absolute top-0 left-0 bg-black opacity-25 min-w-full h-screen z-20"
          onClick={() => props.close()}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-full lg:px-44 lg:w-3/4 lg:h-[80vh] bg-white h-screen z-[30] flex justify-center items-center rounded-lg bg-gradient-to-r from-fuchsia-200 to-violet-300"
          style={{
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-full min-h-full">
            <header className="relative w-full top-0">
              <h1 className="text-center lg:text-7xl py-6 lg:py-12 text-4xl">
                Settings Account
              </h1>
              <div className="absolute right-1 top-1">
                <button
                  className="text-[#FF2C61] slab hover:bg-[#ED709D] hover:text-white font-bold uppercase px-6 py-3 rounded-xl text-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => props.close()}
                >
                  X
                </button>
              </div>
            </header>
            <main className="w-full min-h-full flex max-lg:flex-col-reverse py-2 lg:py-6">
              <div className="order-1 lg:w-1/5 text-3xl text-white flex flex-col gap-2 px-2">
                <div className="w-full text-center">
                  <button
                    className="py-3 hover:bg-pink-600 bg-pink-500 px-4 rounded-md block w-full"
                    onClick={() => setSwitchOutlet("changePassword")}
                  >
                    Change Password
                  </button>
                </div>
                <div className="w-full text-center">
                  <button
                    className="py-3 hover:bg-red-600 bg-red-400 px-4 rounded-md  block w-full"
                    onClick={() => setSwitchOutlet("removeAccount")}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
              <div className="order-2 lg:w-4/5">
                {switchOutlet == "changePassword" && <ChangePassword />}
                {switchOutlet == "removeAccount" && (
                  <RemoveAccount close={props.close} />
                )}
              </div>
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default ManagerAcount;

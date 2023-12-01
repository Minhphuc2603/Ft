import React, { useEffect, useState } from "react";
import Rose from "./image/Rose.png";
import Girls from "./image/girl.jpg";
import axios from "axios";
import EventListProfile from "./EventListProfile";
import { useNavigate } from "react-router";
function EventResults() {
  const [listEvent, setListEvent] = useState([]);
  const navigate = useNavigate();
  const server = "https://metatechvn.store";
  const user = window.localStorage.getItem("user-info");
  const dataUser = JSON.parse(user);
  console.log("====================================");
  console.log(JSON.parse(user));
  console.log("====================================");
  const getAllEventUser = async (idUser) => {
    try {
      const { data } = await axios.get(`${server}/lovehistory/user/${idUser}`);
      console.log(data);
      setListEvent(data.list_sukien);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllEventUser(dataUser.id_user);
  }, []);
  const nic = listEvent;
  return (
    <div className="w-1/5 h-screen flex justify-center">
      {nic.length > 0 ? (
        <EventListProfile closeTab={() => navigate("/")} data={nic} />
      ) : null}
      {nic.length == 0 ? (
        <div className="w-full text-center py-5 ">
          <h1 className="text-xl lg:text-4xl">You don't have any event yet</h1>
        </div>
      ) : null}
    </div>
  );
}

export default EventResults;

import "./App.scss";
import "./container/tailwincss.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Historyv2 from "./ver2/page/Historyv2";
import Home from "./ver2/page/Home";
import NewHistory from "./ver2/components/NewHistory";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Register from "./ver2/page/Register";
import Login from "./ver2/page/Login";
import Profile from "./ver2/components/Profile";
import "./ver2/css/index.css";
import LayoutGuest from "./ver2/layouts/LayoutGuest";
import LayoutUser from "./ver2/layouts/LayoutUser";
import NotFound from "./ver2/components/NotFound";
import ProfileGuest from "./ver2/components/ProfileGuest";
import axios from "axios";
import EventResults from "./ver2/components/EventResults";
import TiktokScandal from "./ver2/tiktok-scandal";
import YoutubeScandal from "./ver2/YoutubeScandal";
import Policy from "./ver2/components/Policy";
import Video from "./ver2/components/Video";
import ListVideo from "./ver2/components/ListVideo";
import MakeVideo from "./ver2/components/MakeVideo";
import DetailVideo from "./ver2/components/DetailVideo";


function App() {
  const user = window.localStorage.getItem("user-info");
  useEffect(() => {
    async function getIPAddress() {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        localStorage.setItem("ip", response.data.ip);
      } catch (error) {
        console.error("Error getting IP address:", error);
        return null;
      }
    }
    getIPAddress();
  }, []);
  if (!user)
    return (
      <Routes>
        <Route path="" element={<LayoutGuest />}>
          <Route index element={<Historyv2 />} />
          <Route path="detailVideo/:id" element={<DetailVideo />} />
          <Route path="home" element={<Historyv2 />} />
          <Route path="event/:id" element={<Historyv2 />} />
          <Route path="love" element={<Home />} />
          <Route path="detail/:id/:stt" element={<NewHistory />}></Route>
          <Route path="viewEvent" element={<EventResults />} />
          <Route path="policy" element={<Policy />} />
          <Route path="video" element={<Video/>}/>
          <Route path="listvideo" element={<ListVideo/>}/>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="user/:id" element={<ProfileGuest />} />
          <Route path="make-video" element={<MakeVideo/>}/>
          

        </Route>
        <Route path="youtube/:idVideo" element={<YoutubeScandal />} />
        <Route path="tiktok/:idVideo" element={<TiktokScandal />} />
        <Route path="*" exact={true} element={<NotFound />} />
      </Routes>
    );

  return (
    <Routes>
      <Route path="" element={<LayoutUser />}>
        <Route index element={<Historyv2 />} />
        <Route path="detailVideo/:id" element={<DetailVideo />} />
        <Route path="home" element={<Historyv2 />} />
        <Route path="event/:id" element={<Historyv2 />} />
        <Route path="love" element={<Home />} />
        <Route path="detail/:id/:stt" element={<NewHistory />}></Route>
        <Route path="viewEvent" element={<EventResults />} />
        <Route path="video" element={<Video/>}/>
        <Route path="listvideo" element={<ListVideo/>}/>
        <Route path="make-video" element={<MakeVideo/>}/>
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="policy" element={<Policy />} />
        <Route path="user/:id" element={<ProfileGuest />} />
        

      </Route>
      <Route path="tiktok/:idVideo" element={<TiktokScandal />} />
      <Route path="youtube/:idVideo" element={<YoutubeScandal />} />
      <Route path="*" exact={true} element={<NotFound />} />
    </Routes>
  );
}

export default App;

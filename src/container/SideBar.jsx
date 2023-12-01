import { NavLink, useLocation } from "react-router-dom";
import { Fragment, useRef } from "react";
import "./SideBar.scss";
import useEvenStore from "../utils/store";

function SideBar() {
  const event = useEvenStore((state) => state.event);
  const location = useLocation();
  const eventRefs = useRef([]);

  const handleEventClick = (index) => {
    const eventElement = eventRefs.current[index];
    if (eventElement) {
      eventElement.scrollIntoView({ behavior: "auto" });
    }
  };

  return (
    <div className="wrapper-side-bar">
      <div className="side-bar">
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              History
            </NavLink>
          </li>
          {!["/Home", "/", "/History"].includes(location.pathname) &&
            event.map((item, index) => (
              <Fragment key={item.ten_su_kien}>
                <a
                  href={"#" + item.ten_su_kien}
                  ref={(el) => (eventRefs.current[index] = el)}
                  onClick={() => handleEventClick(index)}
                >
                  {item.ten_su_kien}
                </a>
              </Fragment>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;

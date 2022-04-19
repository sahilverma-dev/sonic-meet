import React from "react";
import { sideMenuData } from "../constants/SideMenuData";

import { Link, NavLink } from "react-router-dom";

// icons
import { FiSettings as SettingIcon } from "react-icons/fi";

const Sidebar = () => {
  return (
    <div className="bg-darkBlue1 flex flex-col items-center justify-between p-2 w-[70px] h-screen border-r-2 border-lightGray">
      <div className="my-3">
        <Link to="/">
          <img className="h-9 w-9" src="/images/logo.png" alt="logo" />
        </Link>
      </div>
      <div className="flex-grow my-2">
        {sideMenuData?.map((item, index) => (
          <NavLink
            to={item.route}
            key={index}
            className={({ isActive }) =>
              `relative flex items-center justify-center h-9 w-9 my-3 mx-auto  text-xl text-white group
              duration-75 hover:bg-lightGray hover:border-[1px] rounded-lg border-slate-700
              ${
                isActive
                  ? "bg-lightGray border-[1px] rounded-lg border-slate-700"
                  : "bg-blue-500"
              }`
            }
          >
            <div>
              {item?.icon}
              <span className="absolute z-20 bottom-[-5px] w-auto py-2 px-3 m-2 min-w-max left-12 rounded-md shadow-md bg-gray text-white bg-gray-900 text-xs font-bold transition-all duration-100 scale-0 origin-left group-hover:scale-100">
                {item.text}
              </span>
            </div>
          </NavLink>
        ))}
      </div>
      <div className="bg-lightGray border-2 border-gray p-2.5 cursor-pointer rounded-xl text-slate-300">
        <SettingIcon />
      </div>
    </div>
  );
};

export default Sidebar;

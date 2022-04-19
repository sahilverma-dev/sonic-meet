import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { AiOutlineLogout as LogOutIcon } from "react-icons/ai";

const Header = () => {
  const { user, login, logout } = useAuth();
  return (
    <div className="h-16 px-3 bg-darkBlue1 text-slate-300 w-full flex items-center border-b-2 border-lightGray">
      <div className="flex-grow font-semibold">
        <Link to="/">Sonic Meet</Link>
      </div>
      <div>
        {user ? (
          <div className="relative group h-9 w-9 rounded-full overflow-hidden aspect-square">
            <img
              className="h-full w-full rounded-full aspect-square object-cover"
              src={user?.photoURL}
              alt={user?.displayname}
            />
            <button
              className="absolute flex opacity-0 transition-all pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100  items-center justify-center top-0 left-0 h-full w-full bg-black/70"
              onClick={logout}
              title="Logout"
            >
              <LogOutIcon />
            </button>
          </div>
        ) : (
          <button
            className="bg-yellow py-1 px-5 text-white  font-semibold text-xs cursor-pointer rounded border-2 border-transparent hover:border-yellow hover:bg-transparent hover:text-yellow duration-200"
            onClick={login}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;

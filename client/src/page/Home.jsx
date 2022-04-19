import React, { useEffect, useState } from "react";
import HomeCard from "../components/HomeCard";

import { v4 as uuid } from "uuid";

// icons
import { MdVideoCall as NewCallIcon } from "react-icons/md";
import { MdAddBox as JoinCallIcon } from "react-icons/md";
import { BsCalendarDate as CalenderIcon } from "react-icons/bs";
import { MdScreenShare as ScreenShareIcon } from "react-icons/md";
import { Link } from "react-router-dom";

const roomId = uuid();

const Home = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [date, setDate] = useState(new Date());

  function refreshClock() {
    setDate(new Date());
  }
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="bg-darkBlue1 min-h-screen text-slate-400">
      <div className="flex h-full md:gap-2 flex-col md:flex-row">
        <div className="p-3 w-auto h-auto items-center">
          <div className="flex gap-2 md:gap-6 mb-3 md:mb-6">
            <Link to={`/room/${roomId}`} className="block w-full">
              <HomeCard
                title="New Meeting"
                desc="Create a new meeting"
                icon={<NewCallIcon />}
                iconBgColor="lightYellows"
                bgColor="bg-yellow"
                route={`/room/`}
              />
            </Link>
            <HomeCard
              title="Join Meeting"
              desc="via invitation link"
              icon={<JoinCallIcon />}
              bgColor="bg-blue"
            />
          </div>
          <div className="flex gap-2 md:gap-6">
            <HomeCard
              title="Schedule"
              desc="schedule your meeting"
              icon={<CalenderIcon size={20} />}
              bgColor="bg-blue"
            />
            <HomeCard
              title="Screen Share"
              desc="show your work"
              icon={<ScreenShareIcon size={22} />}
              bgColor="bg-blue"
            />
          </div>
          <div>
            <div className="p-3 md:p-4 md:rounded-xl rounded md:text-base text-sm md:mt-6 mt-2 text-white md:font-semibold text-center w-full bg-blue">
              Made with love by
              <a
                href="https://github.com/theviralboy"
                target={"_blank"}
                rel="noreferrer"
              >
                {" "}
                Sahil Verma
              </a>
            </div>
          </div>
        </div>
        <div className="flex-grow md:h-screen md:border-l-2 border-lightGray p-3 md:p-4">
          <div className="relative md:h-52 w-full bg-slate-500 rounded md:rounded-2xl p-3">
            <div className="md:absolute bottom-2 left-2 md:bottom-6 md:left-6">
              <p className="md:text-7xl text-4xl text-white">
                {`${
                  date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
                }:${
                  date.getMinutes() < 10
                    ? `0${date.getMinutes()}`
                    : date.getMinutes()
                }`}
              </p>
              <p className="text-slate-300 font-thin my-1">
                {`${days[date.getDay()]},${date.getDate()} ${
                  months[date.getMonth()]
                } ${date.getFullYear()}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

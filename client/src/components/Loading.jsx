import React from "react";

const Loading = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex flex-col items-center">
        <div
          style={{ borderTopColor: "transparent" }}
          className="w-16 h-16 border-8 border-slate-900 dark:border-slate-100 border-solid rounded-full animate-spin"
        ></div>
        <p className="mt-5 text-xl font-bold dark:text-slate-100">
          Loading ...
        </p>
      </div>
    </div>
  );
};

export default Loading;

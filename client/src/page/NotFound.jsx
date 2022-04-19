import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="relative flex items-center justify-center h-full bg-darkBlue2">
      <div className="xl:pb-20 flex flex-col">
        <main className="flex-grow flex flex-col text-white justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16">
            <div className="text-center">
              <p className="text-sm font-semibold text-blue uppercase tracking-wide">
                <font style={{ verticalAlign: "inherit" }}>
                  <font style={{ verticalAlign: "inherit" }}>Error 404</font>
                </font>
              </p>
              <h1 className="mt-2 text-4xl font-extrabold text-gris dark:text-white tracking-tight sm:text-5xl">
                <font style={{ verticalAlign: "inherit" }}>
                  <font style={{ verticalAlign: "inherit" }}>
                    Page not found.
                  </font>
                </font>
              </h1>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-100">
                <font style={{ verticalAlign: "inherit" }}>
                  <font style={{ verticalAlign: "inherit" }}>
                    We are sorry, but this page does not exist.
                  </font>
                </font>
              </p>
              <div className="mt-6">
                <Link to="/" className="text-base font-medium text-blue">
                  <font style={{ verticalAlign: "inherit" }}>
                    <font style={{ verticalAlign: "inherit" }}>
                      Back to home{" "}
                    </font>
                  </font>
                  <span aria-hidden="true">
                    <font style={{ verticalAlign: "inherit" }}>
                      <font style={{ verticalAlign: "inherit" }}>→</font>
                    </font>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </main>
  );
};

export default NotFound;

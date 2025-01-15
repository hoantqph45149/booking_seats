import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="container mt-8 py-4 text-center">
      <Link
        to={"/send"}
        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
      >
        Send Notification
      </Link>
      <Link
        to={"/get"}
        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
      >
        Get Notification
      </Link>
    </div>
  );
};

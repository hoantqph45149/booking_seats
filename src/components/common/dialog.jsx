import React from "react";

const Dialog = ({ type, title, message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div
        className={`max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden ${
          type === "success"
            ? "border-green-400"
            : type === "warning"
            ? "border-yellow-400"
            : "border-red-400"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div
            className={`flex items-center space-x-3 ${
              type === "success"
                ? "text-green-700"
                : type === "warning"
                ? "text-yellow-700"
                : "text-red-700"
            }`}
          >
            <span className={`text-xl`}>
              {type === "success" ? "✔️" : type === "warning" ? "⚠️" : "❌"}
            </span>
            <h2 className="font-semibold text-lg">{title}</h2>
          </div>
          <button
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="p-4">
          <p className="text-gray-700">{message}</p>
        </div>
        <div className="flex justify-end p-4 border-t">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;

/** @format */

import React from "react";

export default function Dashboard() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>
        <p className="text-lg text-gray-600 mt-1">Good Morning!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: "Total Posts", number: "144" },
          { name: "Total Categories", number: "7" },
          { name: "Total Products", number: "10" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200">
            <h2 className="text-gray-500 text-lg font-medium mb-2">
              {item.name}
            </h2>
            <span className="text-3xl font-bold text-gray-800">
              {item.number}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

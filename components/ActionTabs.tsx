import React from "react";
import { Hammer, MessageCircle, Edit, Box, BarChart } from "lucide-react";

const ActionTabs = () => {
  const buttons = [
    { label: "Build", icon: <Hammer />, active: true },
    { label: "Engage", icon: <MessageCircle />, active: false },
    { label: "Customize", icon: <Edit />, active: false },
    { label: "Embed", icon: <Box />, active: false },
    { label: "Analytics", icon: <BarChart />, active: false },
  ];

  return (
    <div className="flex space-x-4 bg-white pb-8 rounded-lg ">
      {buttons.map((button, index) => (
        <button
          key={index}
          className={`flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            button.active
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <span className="mr-2">{button.icon}</span>
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default ActionTabs;

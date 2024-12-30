import React from "react";
import { Hammer, MessageCircle, Edit, Box, BarChart } from "lucide-react";
import { useActionTabsStore } from "../store/useActionTabsStore";

const ActionTabs = () => {
  const { activeTab, setActiveTab } = useActionTabsStore();
  
  const buttons = [
    { label: "Build", icon: <Hammer /> },
    { label: "Engage", icon: <MessageCircle /> },
    { label: "Customize", icon: <Edit /> },
    { label: "Embed", icon: <Box /> },
    { label: "Analytics", icon: <BarChart /> },
  ];

  return (
    <div className="flex space-x-4 bg-white pb-8 rounded-lg ">
      {buttons.map((button) => (
        <button
          key={button.label}
          onClick={() => setActiveTab(button.label)}
          className={`flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            activeTab === button.label
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

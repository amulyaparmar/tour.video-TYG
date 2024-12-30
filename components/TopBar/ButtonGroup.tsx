import React, { useRef, useEffect, useState } from 'react';

interface ButtonGroupProps {
  buttons: Array<{
    label: string;
    isActive: boolean;
    onClick: () => void;
    badge?: number;
  }>;
}

export function ButtonGroup({ buttons }: ButtonGroupProps) {
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeButton = buttonsRef.current.find((_, index) => buttons[index].isActive);
    if (activeButton) {
      setIndicatorStyle({
        width: `${activeButton.offsetWidth}px`,
        transform: `translateX(${activeButton.offsetLeft}px)`,
      });
    }
  }, [buttons]);

  return (
    <div className="bg-gray-100 rounded-lg p-1 flex relative overflow-hidden">
      <div
        className="absolute bg-blue-500/90 backdrop-blur-sm rounded-md transition-all duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] h-[calc(100%-8px)] top-1 shadow-sm"
        style={indicatorStyle}
      />
      {buttons.map((button, index) => (
        <button
          key={button.label}
          ref={(el) => (buttonsRef.current[index] = el)}
          onClick={button.onClick}
          className={`
            px-6 py-2 rounded-md text-sm font-medium relative transition-colors duration-150 z-10
            ${button.isActive ? 'text-white' : 'text-gray-600 hover:text-gray-900'}
          `}
        >
          <span className="flex items-center">
            {button.label}
            {button.badge && (
              <span className={`ml-1.5 flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full 
                ${button.isActive ? 'bg-white text-blue-500' : 'bg-blue-500 text-white'}`}>
                {button.badge}
              </span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
}
import { useInView } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";

function AnimatedChatBubble() {
    const [typing, setTyping] = useState(true);
    const [ref, inView] = useInView({
       threshold: 0.5,
       triggerOnce: false,
    });

 
    useEffect(() => {
       if (inView) {
          setTyping(true);
          const timer = setTimeout(() => {
             setTyping(false);
          }, 2000);
          return () => clearTimeout(timer);
       }
    }, [inView]);
 
    return (
       <div ref={ref} className="flex items-center justify-start  text-xs">
          <div
             className={`
               bg-blue-500 px-4 py-2 rounded-3xl transition-all duration-500 ease-out
               ${typing ? "w-20" : "w-full"}
             `}
          >
             <div className={`${typing ? "w-20" : "w-full"} overflow-hidden transition-all duration-500 ease-out`}>
                {typing ? (
                   <div className="flex gap-2 justify-center items-center h-4">
                      <div
                         style={{
                            width: "8px",
                            minWidth: "8px",
                         }}
                         className=" w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"
                      ></div>
                      <div
                         style={{
                            width: "8px",
                            minWidth: "8px",
                         }}
                         className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"
                      ></div>
                      <div
                         style={{
                            width: "8px",
                            minWidth: "8px",
                         }}
                         className="w-2 h-2 bg-white rounded-full animate-bounce"
                      ></div>
                   </div>
                ) : (
                   <p className="text-white opacity-0 animate-fade-in whitespace-nowrap">Hey there! How are you doing today?</p>
                )}
             </div>
          </div>
       </div>
    );
 }
 
 // Add custom animation
 const style = document.createElement("style");
 style.textContent = `
   @keyframes fade-in {
     from { opacity: 0; }
     to { opacity: 1; }
   }
   .animate-fade-in {
     animation: fade-in 0.5s ease-out forwards;
     animation-delay: 0.3s;
   }
 `;
 document.head.appendChild(style);
 

 export default AnimatedChatBubble;
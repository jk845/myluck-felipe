import React from "react";

const CheckIcon: React.FC = () => (
  <div className="w-5 h-5 relative">
    <div className="w-5 h-5 left-0 top-0 absolute bg-zinc-300/50 rounded" />
    <div className="left-[5px] top-[6px] absolute">
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.7072 7.99992C3.7024 7.99992 3.69741 7.99992 3.69242 7.99969C3.5389 7.99483 3.39324 7.91638 3.28807 7.78146L0.156526 3.77025C-0.0614806 3.49116 -0.0503499 3.05169 0.181091 2.7888C0.412531 2.52613 0.776963 2.53932 0.99497 2.81842L3.72812 6.31958L9.02592 0.193183C9.25505 -0.072025 9.61987 -0.0632309 9.8398 0.213779C10.0599 0.490558 10.0522 0.930026 9.82272 1.19547L4.1056 7.80692C3.99832 7.93096 3.85535 7.99992 3.7072 7.99992Z" fill="black" fillOpacity="0.3" />
      </svg>
    </div>
  </div>
);

export default CheckIcon;
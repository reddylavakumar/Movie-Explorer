"use client";

import { useEffect, useState } from "react";

type TransitionWrapperProps = {
  children: React.ReactNode;
  triggerKey: string; // any value that changes will re-trigger animation
};

export default function TransitionWrapper({
  children,
  triggerKey,
}: TransitionWrapperProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const timeout = setTimeout(() => setVisible(true), 30); // minimal delay for smoother transition
    return () => clearTimeout(timeout);
  }, [triggerKey]);

  return (
    <div
      className={`transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform opacity-0 scale-95 translate-y-4
        ${visible ? "opacity-100 scale-100 translate-y-0" : ""}
      `}
    >
      {children}
    </div>
  );
}

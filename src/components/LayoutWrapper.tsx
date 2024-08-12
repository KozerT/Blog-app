import React from "react";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  return (
    <div className="max-w-screen-xl px-4 py-8 mx-auto md:px-8 lg:px-16 xl:px-24">
      {children}
    </div>
  );
};

import React, { ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
}

export const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <h2 className=" text-teal-500 neon-teal londrina-solid-light text-2xl text-left py-1 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
      {children}
    </h2>
  );
};

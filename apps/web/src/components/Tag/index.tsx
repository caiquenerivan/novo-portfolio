import React, { ReactNode } from "react";

interface SubtitleProps {
  children: ReactNode;
}

export const Tag: React.FC<SubtitleProps> = ({ children }) => {
  return (
    <p className="text-zinc-500 josefin-slab-regular md:text-2xl xl:text-3xl">
      {children}
    </p>
  );
};

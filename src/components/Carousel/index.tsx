//import { motion } from "framer-motion";
import { Hobbies } from "../../data/hobbiesPosts";
import React, { useContext } from "react";
//import React, { useContext, useEffect, useRef, useState } from "react";
import { FaDeezer, FaSpotify } from "react-icons/fa6";
import { SiYoutubemusic } from "react-icons/si";
import { LanguageContext } from "../../context/LanguageContext";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface CarouselProps {
  hobbies: Hobbies[];
  active: string;
}

const Carousel: React.FC<CarouselProps> = ({ hobbies, active }) => {
  const { language } = useContext(LanguageContext);

  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={2}
        slidesPerView={1}
        className="p-2 my-4 w-56 h-96"
      >
        {hobbies.map((hobbie, index) => (
          <SwiperSlide key={index}>
            <div className="h-full w-48 bg-teal-100 rounded-md p-2 justify-around">
              <img
                src={hobbie.imageUrl}
                alt={`${
                  language === "pt"
                    ? `capa de ${hobbie.titlePt}`
                    : `${hobbie.titlePt} cover`
                }`}
                className={`${
                  active === "music" ? "h-48" : ""
                } w-48 rounded-md pointer-events-none object-cover border-4 border-teal-50`}
              />
              <div className="flex flex-col justify-around">
                <h3 className="text-teal-600 text-xl pt-2 londrina-solid-regular pl-2">
                  <span className={`${language === "pt" ? "" : "hidden"}`}>
                    {hobbie.titlePt}
                  </span>
                  <span className={`${language === "en" ? "" : "hidden"}`}>
                    {hobbie.titleEn}
                  </span>
                </h3>
                <p className="text-teal-600 text-lg londrina-solid-light pl-2">
                  {hobbie.mainArtist}
                </p>
                <p className="text-teal-600 text-lg londrina-solid-light pl-2">
                  {hobbie.year}
                </p>
                <div className="flex flex-row items-center justify-between pt-4 px-4">
                  <a
                    href={hobbie.spotify}
                    className={`${!hobbie.spotify ? "hidden" : ""} h-8 w-8`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaSpotify color="#0d9488" size={30} />
                  </a>
                  <a
                    href={hobbie.deezer}
                    className={`${hobbie.deezer ? "" : "hidden"} h-8 w-8`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaDeezer color="#0d9488" size={30} />
                  </a>
                  <a
                    href={hobbie.youtube}
                    className={`${!hobbie.youtube ? "hidden" : ""} h-8 w-8`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiYoutubemusic color="#0d9488" size={30} />
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;

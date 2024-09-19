import { Hobbies } from "../../data/hobbiesPosts";
import React, { useContext } from "react";
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

const CarouselHobbies: React.FC<CarouselProps> = ({ hobbies, active }) => {
  const { language } = useContext(LanguageContext);

  return (
    <div className="py-2">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        loop={true}
        spaceBetween={2}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 250,
          },
        }}
        className="p-2 mx-4"
      >
        {hobbies.map((hobbie, index) => (
          <SwiperSlide key={index} className="p-0 m-0 h" >
            <div className="card-responsivo bg-teal-100 rounded-md flex flex-col p-2 items-center pb-4 swiper">
              <img
                src={hobbie.imageUrl}
                alt={`${
                  language === "pt"
                    ? `capa de ${hobbie.titlePt}`
                    : `${hobbie.titlePt} cover`
                }`}
                className={`${
                  active === "music" ? "h-48 md:h-full xl:h-72" : active === "more" ? "md:h-72" : ""
                } img-card w-48 md:w-full xl:w-72 rounded-md pointer-events-none object-cover border-4 border-teal-50 `}
              />
              <div className="flex flex-col justify-between my-2 px-2 w-full ">
                <h3 className="text-teal-600 text-xl pt-2 londrina-solid-regular pl-2 md:text-2xl lg:text-2xl ">
                  <span className={`${language === "pt" ? "" : "hidden"}`}>
                    {hobbie.titlePt}
                  </span>
                  <span className={`${language === "en" ? "" : "hidden"}`}>
                    {hobbie.titleEn}
                  </span>
                </h3>
                <div className="flex justify-between flex-col w-full">
                  <p className="text-teal-600 text-lg londrina-solid-light pl-2 text-left md:text-2xl lg:text-2xl ">
                    {hobbie.mainArtist}
                  </p>
                  <p className="text-teal-600 text-lg londrina-solid-light pl-2 text-left md:text-2xl lg:text-2xl ">
                    {hobbie.year}
                  </p>
                </div>
                <p className="text-teal-600 text-base londrina-solid-light pl-2 text-left md:text-2xl lg:text-2xl ">
                  <span className={`${language === "pt" || !hobbie.descPt ? "" : "hidden"}`}>
                    {hobbie.descPt}
                  </span>
                  <span className={`${language === "en" || !hobbie.descEn ? "" : "hidden"}`}>
                    {hobbie.descEn}
                  </span>
                </p>

                <div className="flex flex-row items-center justify-between w-full pt-4 px-4">
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

export default CarouselHobbies;

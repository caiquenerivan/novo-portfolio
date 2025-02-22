import React, { useContext, useState } from "react";
import "./Carousel.css";
import useServices from "../../data/useServices";
import { LanguageContext } from "../../context/LanguageContext";


const Carousel: React.FC = () => {
  const { services, loading, error } = useServices();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language } = useContext(LanguageContext);

  if (loading)
    return (
      <div
        className={`noWrap neon-red uppercase px-4 py-1 text-red-600 josefin-slab-regular text-left text-xs sm:text-sm md:text-md`}
      >
        {`${
          language === "en" ? "Loading services... " : "Carregando Serviços... "
        }`}{" "}
      </div>
    );
  if (error)
    return (
      <div
        className={`noWrap neon-red uppercase px-4 py-1 text-red-600 josefin-slab-regular text-left text-xs sm:text-sm md:text-md`}
      >
        {`${language === "en" ? "Error: " : "Erro: "}`} {error}
      </div>
    );

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? services.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = currentIndex === services.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  services.map;

  return (
    <div className="carousel bg-teal-200 border-teal-600 border-4 pb-8">
      <div
        className="carousel-inner"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {services.map((item, index) => (
          
          
          <div
            key={index}
            className={`carousel-item ${
              index === currentIndex ? "active" : ""
            }`}
          >
            <img
              src={item.image}
              alt={item.title_pt}
              className="img-card object-cover"
            />
            <h3 className="carousel-title text-teal-600 londrina-solid-regular">
              {`${language==='en' ? item.title_en : item.title_pt}`}
            </h3>
            <p className="carousel-caption text-teal-600 londrina-solid-light mx-8 text-justify">
            {`${language==='en' ? item.desc_en : item.desc_pt}`}

            </p>
          </div>
        ))}
      </div>
      <button className="prev" onClick={prevSlide}>
        ❮
      </button>
      <button className="next" onClick={nextSlide}>
        ❯
      </button>
    </div>
  );
};

export default Carousel;

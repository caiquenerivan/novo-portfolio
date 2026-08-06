import React, { useContext, useState, useEffect } from "react";
import useServices from "../../data/useServices";
import { LanguageContext } from "../../context/LanguageContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const Carousel: React.FC = () => {
  const { services, loading, error } = useServices();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language } = useContext(LanguageContext);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  if (loading)
    return (
      <div className="noWrap neon-teal uppercase px-4 py-3 text-teal-400 josefin-slab-regular text-left text-sm md:text-md">
        {language === "en" ? "Loading services..." : "Carregando Serviços..."}
      </div>
    );

  if (error)
    return (
      <div className="noWrap neon-teal uppercase px-4 py-3 text-teal-400 josefin-slab-regular text-left text-sm md:text-md">
        {language === "en" ? "Error: " : "Erro: "} {error}
      </div>
    );

  const maxIndex = Math.max(0, services.length - itemsPerPage);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 py-6">
      {/* Container do Carrossel */}
      <div className="overflow-hidden rounded-2xl p-2">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
          }}
        >
          {services.map((item, index) => (
            <div
              key={item.service_id || index}
              className="px-3 flex-shrink-0 transition-all duration-300"
              style={{ width: `${100 / itemsPerPage}%` }}
            >
              <div className="bg-slate-900/80 backdrop-blur-md border border-teal-500/30 hover:border-cyan-400/80 rounded-2xl p-4 h-full flex flex-col justify-between shadow-xl hover:shadow-[0_0_20px_rgba(45,212,191,0.25)] hover:-translate-y-1 transition-all duration-300 group">
                <div className="overflow-hidden rounded-xl h-40 mb-4 bg-slate-950/60 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={language === "en" ? item.title_en : item.title_pt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between text-center">
                  <h3 className="text-xl font-bold text-teal-300 group-hover:text-cyan-300 londrina-solid-regular mb-2 tracking-wide">
                    {language === "en" ? item.title_en : item.title_pt}
                  </h3>
                  <p className="text-slate-300 open-sans-regular text-sm leading-relaxed text-center px-1">
                    {language === "en" ? item.desc_en : item.desc_pt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botões de Navegação */}
      {services.length > itemsPerPage && (
        <>
          <button
            onClick={prevSlide}
            aria-label="Anterior"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 bg-slate-900/90 text-teal-400 border border-teal-500/40 p-3 rounded-full hover:bg-teal-500 hover:text-slate-950 hover:shadow-[0_0_15px_rgba(45,212,191,0.4)] transition-all duration-300 z-20 cursor-pointer"
          >
            <FaChevronLeft size={18} />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Próximo"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 bg-slate-900/90 text-teal-400 border border-teal-500/40 p-3 rounded-full hover:bg-teal-500 hover:text-slate-950 hover:shadow-[0_0_15px_rgba(45,212,191,0.4)] transition-all duration-300 z-20 cursor-pointer"
          >
            <FaChevronRight size={18} />
          </button>
        </>
      )}

      {/* Indicadores de Página / Pontos */}
      {services.length > itemsPerPage && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx
                  ? "w-8 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.6)]"
                  : "w-2.5 bg-slate-700 hover:bg-teal-500/60"
              }`}
              aria-label={`Ir para slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;

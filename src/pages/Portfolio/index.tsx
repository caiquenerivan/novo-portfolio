import { useContext } from "react";
import Tags from "../../data/tags";
import { LanguageContext } from "../../context/LanguageContext";
import works from "../../data/works";

export default function Portfolio() {
  const { language } = useContext(LanguageContext);

  return (
    <div className="flex flex-col min-h-screen w-full pl-16 justify-center max-w-screen-3xl my-9">
      <div className="flex flex-col px-8 py-4">
        <p className="text-zinc-500 josefin-slab-regular md:text-2xl xl:text-3xl">
          {Tags.abrirH2}
        </p>
        <div className="flex flex-col w-full px-4">
          <div className="lg:flex">
            <div className="w-3/5">
              <h2 className=" text-teal-500 londrina-solid-light text-2xl text-left py-1 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                <span className={`${language === "pt" ? "" : "hidden"}`}>
                  Portfólio
                </span>
                <span className={`${language === "en" ? "" : "hidden"}`}>
                  Portfolio
                </span>
              </h2>
            </div>
          </div>
        </div>
        <p className="text-zinc-500 pb-4 josefin-slab-regular md:text-2xl xl:text-3xl">
          {Tags.fecharH2}
        </p>
        <p className="text-zinc-500 josefin-slab-regular md:text-2xl xl:text-3xl">
          {Tags.abrirP}
        </p>
        <div className="w-full flex flex-col h-3/5 lg:flex-row">
          <div className="w-full">
            <p
              className={`${
                language === "pt" ? "" : "hidden"
              } px-4 py-1 text-stone-50 open-sans-regular text-justify text-sm sm:text-xl md:text-xl`}
            >
              Mussum Ipsum, cacilds vidis litro abertis. Si num tem leite então
              bota uma pinga aí cumpadi! Aenean aliquam molestie leo, vitae
              iaculis nisl. Posuere libero varius.
            </p>
            <p
              className={`${
                language === "en" ? "" : "hidden"
              }  px-4 py-1 text-stone-50 open-sans-regular text-justify text-sm sm:text-md md:text-xl`}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <p className="text-zinc-500 josefin-slab-regular md:text-2xl xl:text-3xl">
          {Tags.fecharP}
        </p>
        <p className="text-zinc-500 josefin-slab-regular md:text-2xl xl:text-3xl mt-4">
          {Tags.abrirSection}
        </p>
        <div className="flex flex-col w-full justify-center items-center">
          <div className="flex py-4 flex-col lg:grid grid-cols-3">
            {works.map((work, index) => (
              <div
                key={index}
                style={{ borderColor: work.mainLanguage.colorHexa }}
                className={`py-8 min-w-60 max-w-80 h-50 mb-8  mx-2 border-t-4 border-${work.colorName} rounded-sm shadow-lg p-4`}
              >
                <p
                  style={{ color: work.mainLanguage.colorHexa }}
                  className={`my-1 text-${work.colorName} uppercase josefin-slab-regular text-left text-sm sm:text-xl md:text-xl`}
                >
                  {work.mainLanguage.name}
                </p>
                <h2
                  className={`${
                    language === "pt" ? "line-clamp-1" : "hidden"
                  } text-stone-300 londrina-solid-regular text-md text-left py-1 sm:text-xl md:text-5xl lg:text-2xl xl:text-3xl`}
                >
                  {work.titlePt}
                </h2>
                <h2
                  className={`${
                    language === "en" ? "line-clamp-1" : "hidden"
                  } text-stone-300 londrina-solid-regular text-md text-left py-1 sm:text-xl md:text-5xl lg:text-2xl xl:text-3xl`}
                >
                  {work.titleEn}
                </h2>
                <p
                  className={`${
                    language === "pt" ? "line-clamp-2" : "hidden"
                  } my-1 twoLineText text-stone-300 open-sans-regular text-left text-sm sm:text-xl md:text-xl`}
                >
                  {work.descriptionPt}
                </p>
                <p
                  className={`${
                    language === "en" ? "line-clamp-2" : "hidden"
                  } my-2 twoLineText text-stone-300 open-sans-regular text-left text-sm sm:text-md md:text-xl`}
                >
                  {work.descriptionEn}
                </p>
                <button
                  style={{ color: work.mainLanguage.colorHexa, borderColor: work.mainLanguage.colorHexa }}
                  className={`${
                    language === "pt" ? "" : "hidden"
                  } mt-4 border-2 p-2 rounded-2xl open-sans-regular text-left text-sm hover:bg-gray-600 sm:text-xl md:text-xl`}
                >
                  Ver Mais
                </button>
                <button
                  style={{ color: work.mainLanguage.colorHexa, borderColor: work.mainLanguage.colorHexa }}
                  className={`${
                    language === "en" ? "" : "hidden"
                  } mt-4 border-2 p-2 rounded-2xl open-sans-regular text-left text-sm hover:bg-gray-200 sm:text-xl md:text-xl`}
                >
                  See More
                </button>
              </div>
            ))}
          </div>
          <button className="text-teal-500 text-center ">Ver Mais</button>
        </div>
        <p className="text-zinc-500 josefin-slab-regular md:text-2xl xl:text-3xl">
          {Tags.fecharSection}
        </p>
      </div>
    </div>
  );
}

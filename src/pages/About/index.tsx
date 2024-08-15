import { useContext } from "react";
import Tags from "../../data/tags";
import { LanguageContext } from "../../context/LanguageContext";
import skills from "../../data/skills";

export default function About() {
  const { language } = useContext(LanguageContext);

  return (
    <div className="flex flex-col min-h-screen w-full pl-16 justify-center max-w-screen-3xl">
      <div className="flex flex-col px-8 py-4">
        <p className="text-zinc-500 josefin-slab-regular md:text-2xl xl:text-3xl">
          {Tags.abrirH2}
        </p>
        <div className="flex flex-col w-full px-4">
          <div className="lg:flex">
            <div className="w-3/5">
              <h2 className=" text-teal-500 londrina-solid-light text-2xl text-left py-1 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                <span className={`${language === "pt" ? "" : "hidden"}`}>
                  Sobre Mim
                </span>
                <span className={`${language === "en" ? "" : "hidden"}`}>
                  About Me
                </span>
              </h2>
            </div>
            <div className="w-2/5 pl-8">
              <h2 className="text-teal-500 londrina-solid-light text-2xl text-left py-1 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                Skills
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
          <div className="w-3/5">
            <p
              className={`${
                language === "pt" ? "" : "hidden"
              } px-4 py-1 text-stone-50 open-sans-regular text-left text-sm sm: text-md md:text-2xl`}
            >
              Mussum Ipsum, cacilds vidis litro abertis. Si num tem leite então
              bota uma pinga aí cumpadi! Aenean aliquam molestie leo, vitae
              iaculis nisl. Posuere libero varius. Nullam a nisl ut ante blandit
              hendrerit. Aenean sit amet nisi. Viva Forevis aptent taciti
              sociosqu ad litora torquent.
            </p>
            <p
              className={`${
                language === "en" ? "" : "hidden"
              }  px-4 py-1 text-stone-50 open-sans-regular text-justify text-sm sm: text-md md:text-2xl`}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          </div>
          <div className="w-2/5 grid grid-cols-3">
            {skills.map((item, index) => (
              <p
                key={index}
                className={`noWrap uppercase px-4 py-1 text-red-600 open-sans-regular text-left text-xs sm:text-sm md:text-md`}
              >
                {item}
              </p>
            ))}
          </div>
        </div>
        <p className="text-zinc-500 josefin-slab-regular md:text-2xl xl:text-3xl">
          {Tags.fecharP}
        </p>
        <p className="text-zinc-500 josefin-slab-regular md:text-2xl xl:text-3xl mt-4">
          {Tags.abrirButton}
        </p>
        <button className="border-solid border-2 border-teal-500 rounded-3xl ml-4 my-4 w-48 h-20 hover:bg-teal-500 text-gray-700">
          <p className={`${language=== "pt" ? "" : "hidden"} text-teal-500 hover:text-gray-700 w-full h-full flex justify-center items-center uppercase`}>Baixar Currículo</p>
          <p className={`${language=== "pt" ? "hidden" : ""} text-teal-500 hover:text-gray-700 w-full h-full flex justify-center items-center uppercase`}>Download Resumè</p>
        </button>
        <p className="text-zinc-500 josefin-slab-regular md:text-2xl xl:text-3xl">
          {Tags.fecharButton}
        </p>
      </div>
    </div>
  );
}

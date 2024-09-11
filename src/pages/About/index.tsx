import { useContext } from "react";
import Tags from "../../data/tags";
import { LanguageContext } from "../../context/LanguageContext";
import skills from "../../data/skills";
import { Tag } from "../../components/Tag";
import { Title } from "../../components/Title";

export default function About() {
  const { language } = useContext(LanguageContext);

  return (
    <div className="flex flex-col min-h-screen w-full pl-16 justify-center max-w-screen-3xl 3xl:pl-96">
      <div className="flex flex-col px-8 py-4 mxl:flex-row">
        <div className="w-full flex flex-col mxl:w-1/2">
          <Tag>{Tags.abrirH2}</Tag>
          <div className="flex flex-col w-full pl-4">
            <div className="lg:flex">
              <Title>
                <span className={`${language === "pt" ? "" : "hidden"}`}>
                  Sobre Mim
                </span>
                <span className={`${language === "en" ? "" : "hidden"}`}>
                  About Me
                </span>
              </Title>
            </div>
          </div>
          <Tag>{Tags.fecharH2}</Tag>
          <Tag>{Tags.abrirP}</Tag>
          <div className="px-4">
            <p
              className={`${
                language === "pt" ? "" : "hidden"
              } py-1 text-stone-50 open-sans-regular text-left text-sm sm:text-md md:text-2xl`}
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
              }  py-1 text-stone-50 open-sans-regular text-left text-sm sm:text-md md:text-2xl`}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          </div>
          <Tag>{Tags.fecharP}</Tag>
        </div>
        <div className="mxl:w-1/2">
          <Tag>{Tags.abrirH2}</Tag>
          <div className="w-2/5 pl-4">
            <Title>Skills</Title>
          </div>
          <Tag>{Tags.fecharH2}</Tag>
          <Tag>{Tags.abrirP}</Tag>

          <div className="grid grid-cols-2 mxl:grid-cols-3">
            {skills.map((item, index) => (
              <p
                key={index}
                className={`noWrap neon-red uppercase px-4 py-1 text-red-600 open-sans-regular text-left text-xs sm:text-sm md:text-md`}
              >
                {item}
              </p>
            ))}
          </div>
          <Tag>{Tags.fecharP}</Tag>
          <Tag>{Tags.abrirButton}</Tag>

          <button className="border-solid border-2 border-teal-500 rounded-3xl m-4 w-48 h-12 hover:bg-teal-500 text-gray-700">
            <p
              className={`${
                language === "pt" ? "" : "hidden"
              } text-teal-500 hover:text-gray-700 w-full h-full flex justify-center items-center uppercase`}
            >
              Baixar Currículo
            </p>
            <p
              className={`${
                language === "pt" ? "hidden" : ""
              } text-teal-500 hover:text-gray-700 w-full h-full flex justify-center items-center uppercase`}
            >
              Download Resumè
            </p>
          </button>
          <Tag>{Tags.fecharButton}</Tag>
        </div>
      </div>
    </div>
  );
}

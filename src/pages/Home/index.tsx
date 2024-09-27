import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { Tag } from "../../components/Tag";

export default function Home() {
  const { language } = useContext(LanguageContext);

  return (
    <div className="flex flex-col h-screen w-full pl-16 justify-center max-w-screen-3xl  3xl:pl-96 z-10">
      <Tag>{'<html>'}</Tag>
      <div className="px-4">
        <Tag>{'<body>'}</Tag>
      </div>
      <div className="flex flex-col px-8 py-4">
        <Tag>{'<h1>'}</Tag>
        <div className="flex flex-col w-full px-4">
          <h1 className="text-stone-50 londrina-solid-regular text-2xl text-left py-1 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            <span className={`${language === "pt" ? "" : "hidden"}`}>Olá,</span>
            <span className={`${language === "en" ? "" : "hidden"}`}>
              Hello,
            </span>
          </h1>
          <h1 className="text-stone-50 londrina-solid-regular text-2xl text-left py-1 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            <span className={`${language === "pt" ? "" : "hidden"}`}>
              Eu sou o
            </span>
            <span className={`${language === "en" ? "" : "hidden"}`}>I'm</span>
            <span className="text-red-600 text-shadow"> C</span>aique
            <span className="text-red-600 text-shadow"> N</span>erivan
          </h1>
          <h1 className="text-stone-50 londrina-solid-regular text-2xl text-left py-1 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            <span className={`${language === "pt" ? "" : "hidden"}`}>
              Desenvolvedor Fullstack
            </span>
            <span className={`${language === "en" ? "" : "hidden"}`}>
              Fullstack Developer
            </span>
          </h1>
        </div>
        <Tag>{'</h1>'}</Tag>

        <Tag>{'<p>'}</Tag>
        <p
          className={`${
            language === "pt" ? "" : "hidden"
          } px-4 py-1 text-stone-50 open-sans-regular text-left text-sm sm:text-md md:text-4xl`}
        >
          Desenvolvedor Java | Typescript
        </p>
        <p
          className={`${
            language === "en" ? "" : "hidden"
          } px-4 py-1 text-stone-50 open-sans-regular text-left text-sm sm:text-md md:text-4xl`}
        >
          Java | Typescript Developer
        </p>
        <Tag>{'</p>'}</Tag>

      </div>
    </div>
  );
}

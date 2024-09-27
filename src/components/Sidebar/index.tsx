import { useContext } from "react";
import { MdToggleOff, MdToggleOn } from "react-icons/md";
import brasil from "../../assets/imgs/brasil.png";
import gbr from "../../assets/imgs/gbr.png";
import {
  FaAt,
  FaCode,
  FaGithub,
  //FaGuitar,
  FaInstagram,
  FaLinkedin,
  FaPerson,
  FaWhatsapp,
  FaLaptop,
} from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { IconType } from "react-icons";
import { LanguageContext } from "../../context/LanguageContext";
import { Link } from "react-router-dom";

interface Menu {
  titleEn: string;
  titlePt: string;
  src: IconType;
  portuguese: boolean;
  gap: boolean;
  linkTo: string;
}

export default function Sidebar() {
  const { language, switchLanguage } = useContext(LanguageContext);

  function trocaIdioma(idioma: string) {
    if (idioma === "en") {
      switchLanguage("pt");
    } else if (idioma === "pt") {
      switchLanguage("en");
    }
  }

  const Menus = [
    { titleEn: "Home", titlePt: "Página Inicial", src: FaHome, linkTo: "" },
    { titleEn: "About", titlePt: "Sobre Mim", src: FaPerson, linkTo: "about" },
    {
      titleEn: "Services",
      titlePt: "Serviços",
      src: FaLaptop,
      linkTo: "services",
    },
    {
      titleEn: "Portfolio",
      titlePt: "Portfolio",
      src: FaCode,
      linkTo: "portfolio",
    },
    { titleEn: "Contact", titlePt: "Contato", src: FaAt, linkTo: "contact" },
    /*
    { titleEn: "Hobbies", titlePt: "Hobbies", src: FaGuitar, gap: true, linkTo:"hobbies" },
     */
  ] as Menu[];

  return (
    <div className="fixed h-screen z-50 hidden 3xl:flex">
      <div
        className={`w-80 duration-300 h-screen bg-gray-800 relative justify-center flex-col`}
      >
        <div
          className={`w-full h-1/5 bg-gray-900 m-0 flex justify-center items-center flex-col`}
        >
          <h1 className="text-shadow londrina-solid-regular font-extrabold text-red-600 text-6xl">
            CN
          </h1>
          <h2
            className={`${
              language === "pt" ? "" : "hidden"
            } font-normal text-stone-300 text-3xl text-center`}
          >
            Desenvolvedor Full Stack
          </h2>
          <h2
            className={`${
              language === "pt" ? "hidden" : ""
            } font-normal text-stone-300 text-3xl`}
          >
            Full Stack Developer
          </h2>
        </div>
        <div
          className={` w-full h-3/5 flex justify-center items-center flex-col`}
        >
          <div className="py-10 text-stone-300 uppercase items-center text-2xl w-full">
            <ul className="items-center justify-center text-center w-full border-y-2 border-solid border-gray-700">
              {Menus.map((Menu, index) => (
                <li
                  key={index}
                  className={`${
                    language === "pt" ? "" : ""
                  } py-2 border-y-2 border-solid border-gray-700 `}
                >
                  <Link
                    to={`/${Menu.linkTo}`}
                    className="flex items-center justify-center"
                  >
                    <Menu.src />
                    <p className={`px-2 ${language === "en" ? "" : "hidden"}`}>
                      {Menu.titleEn}
                    </p>
                    <p className={`px-2 ${language === "pt" ? "" : "hidden"}`}>
                      {Menu.titlePt}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex">
            <a href="https://www.instagram.com/caiquenerivan" target="blank">
              <FaInstagram size={30} color="#d6d3d1" className="mx-2" />
            </a>
            <a
              href="https://github.com/caiquenerivan"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={30} color="#d6d3d1" className="mx-2" />
            </a>
            <a
              href="https://www.linkedin.com/in/caiquenerivan/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={30} color="#d6d3d1" className="mx-2" />
            </a>
            <a
              href="https://wa.me/5511956540311"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp size={30} color="#d6d3d1" className="mx-2" />
            </a>
          </div>
        </div>
        <div className="w-full h-1/5 flex pt-8">
          <div className={`w-full flex flex-row justify-center duration-300`}>
            <img
              src={brasil}
              alt="bandeira do Brasil, brazil's flag"
              className="h-10 mx-2"
            />
            <button
              onClick={() => trocaIdioma(language)}
              className="w-10 h-10 flex justify-center items-center"
            >
              <MdToggleOn
                size={50}
                color="#d6d3d1"
                className={`${language === "pt" ? "hidden" : ""}`}
              />
              <MdToggleOff
                size={50}
                color="#d6d3d1"
                className={`${language === "pt" ? "" : "hidden"}`}
              />
            </button>
            <img
              src={gbr}
              alt="bandeira do grã bretanha, graet britain's flag"
              className="h-10 mx-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

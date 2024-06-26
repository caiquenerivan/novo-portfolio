import React, { useState } from "react";
import { MdClose, MdMenu, MdToggleOff, MdToggleOn } from "react-icons/md";
import brasil from "../../assets/imgs/brasil.png";
import gbr from "../../assets/imgs/gbr.png";
import {
  FaAt,
  FaCode,
  FaGithub,
  FaGuitar,
  FaInstagram,
  FaLinkedin,
  FaPerson,
  FaWhatsapp,
} from "react-icons/fa6";
import { FaHome } from "react-icons/fa";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [isPortuguese, setIsPortuguese] = useState<boolean>(false);

  const Menus = [
    { title: "Home", src: FaHome, portuguese: false },
    { title: "Página Inicial", src: FaHome, portuguese: true},
    { title: "About", src: FaPerson, portuguese: false  },
    { title: "Sobre Mim", src: FaPerson , portuguese: true},
    { title: "Portfolio", src: FaCode, portuguese: false  },
    { title: "Portfolio", src: FaCode , portuguese: true},
    { title: "Contact", src: FaAt, portuguese: false  },
    { title: "Contato", src: FaAt, portuguese: true},
    { title: "Hobbies", src: FaGuitar, portuguese: false, gap: true},
    { title: "Hobbies", src: FaGuitar, portuguese: true, gap: true},
  ];

  const menuPt = Menus.filter(function(Menus){
    return Menus.portuguese == true;
  })

  const menuEn = Menus.filter(function(Menus){
    return Menus.portuguese == false;
  })

  return (
    <div className="fixed sm:static">
      <div
        className={`${
          open ? "w-80" : "w-2/6 min-w-10"
        } duration-300 h-screen bg-gray-800 relative justify-center flex-col `}
      >
        <div
          className={`m-5 w-10 h-10 bg-gray-700 border-solid border-4 ${
            open ? "border-gray-900" : "border-gray-800"
          }  rounded-full flex justify-center items-center absolute top-1 -right-10`}
        >
          <button
            className="cursor-pointer size-full flex items-center justify-center p-1"
            onClick={() => setOpen(!open)}
          >
            <MdClose
              size={60}
              color="#1e293b"
              className={`${open ? "" : "hidden"}`}
            />
            <MdMenu
              size={60}
              color="#1e293b"
              className={`${open ? "hidden" : ""}`}
            />
          </button>
        </div>
        <div
          className={`w-full h-1/5 bg-gray-900 m-0 flex justify-center items-center flex-col ${
            open ? "" : "hidden"
          }`}
        >
          <h1 className="font-extrabold text-red-500 text-6xl">CN</h1>
          <h2
            className={`${
              isPortuguese ? "" : "hidden"
            } font-normal text-stone-300 text-3xl text-center`}
          >
            Desenvolvedor Full Stack
          </h2>
          <h2
            className={`${
              isPortuguese ? "hidden" : ""
            } font-normal text-stone-300 text-3xl`}
          >
            Full Stack Developer
          </h2>
        </div>
        <div
          className={`${
            open ? "" : "hidden"
          } w-full h-3/5 flex justify-center items-center flex-col`}
        >
          <div className="py-10 text-stone-300 uppercase items-center text-2xl w-full">
            <ul className="items-center justify-center text-center w-full border-y-2 border-solid border-gray-700">
              
              {menuPt.map((Menu, index)=>(
                <li
                  key={index}
                  className={`${
                    isPortuguese ? "" : "hidden"
                  } py-2 border-y-2 border-solid border-gray-700`}
                >
                  <a href="#" className="flex items-center justify-center">
                    
                    <p className="px-2">{Menu.title}</p>
                  </a>
                </li>

              ))}

              {menuEn.map((Menu, index)=>(
                <li
                  key={index}
                  className={`${
                    isPortuguese ? "hidden" : ""
                  } py-2 border-y-2 border-solid border-gray-700`}
                >
                  <a href="#" className="flex items-center justify-center">
                    
                    <p className="px-2">{Menu.title}</p>
                  </a>
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
        <div className="w-full h-1/5 flex">
          <div
            className={`w-full flex flex-row justify-center ${
              open ? "" : "hidden"
            } duration-300`}
          >
            <img
              src={brasil}
              alt="bandeira do Brasil, brazil's flag"
              className="h-10 mx-2"
            />
            <button
              onClick={() => setIsPortuguese(!isPortuguese)}
              className="w-10 h-10 flex justify-center items-center"
            >
              <MdToggleOn
                size={50}
                color="#d6d3d1"
                className={`${isPortuguese ? "hidden" : ""}`}
              />
              <MdToggleOff
                size={50}
                color="#d6d3d1"
                className={`${isPortuguese ? "" : "hidden"}`}
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

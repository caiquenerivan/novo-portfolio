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

  return (
    <div className="fixed">
      <div
        className={`${
          open ? "w-80" : "w-10"
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
            } font-normal text-stone-300 text-xl`}
          >
            Desenvolvedor Full Stack
          </h2>
          <h2
            className={`${
              isPortuguese ? "hidden" : ""
            } font-normal text-stone-300 text-xl`}
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
              <li
                className={`${
                  isPortuguese ? "hidden" : ""
                } py-2 border-y-2 border-solid border-gray-700`}
              >
                <a href="#" className="flex items-center justify-center">
                  <FaHome />
                  <p className="px-2">Home</p>
                </a>
              </li>

              <li
                className={`${
                  isPortuguese ? "" : "hidden"
                } py-2 border-y-2 border-solid border-gray-700`}
              >
                <a href="#" className="flex items-center justify-center">
                  <FaHome />
                  <p className="px-2">Página Inicial</p>
                </a>
              </li>

              <li
                className={`${
                  isPortuguese ? "hidden" : ""
                } py-2 border-y-2 border-solid border-gray-700`}
              >
                <a href="#about" className="flex items-center justify-center">
                  <FaPerson />
                  <p className="px-2">About</p>
                </a>
              </li>

              <li
                className={`${
                  isPortuguese ? "" : "hidden"
                } py-2 border-y-2 border-solid border-gray-700`}
              >
                <a href="#about" className="flex items-center justify-center">
                  <FaPerson />
                  <p className="px-2">Sobre Mim</p>
                </a>
              </li>

              <li className="py-2 border-y-2 border-solid border-gray-700">
                <a
                  href="#portfolio"
                  className="flex items-center justify-center"
                >
                  <FaCode />
                  <p className="px-2">Portfolio</p>
                </a>
              </li>
              <li
                className={`${
                  isPortuguese ? "hidden" : ""
                } py-2 border-y-2 border-solid border-gray-700`}
              >
                <a href="#contact" className="flex items-center justify-center">
                  <FaAt />
                  <p className="px-2">Contact</p>
                </a>
              </li>
              <li
                className={`${
                  isPortuguese ? "" : "hidden"
                } py-2 border-y-2 border-solid border-gray-700`}
              >
                <a href="#contact" className="flex items-center justify-center">
                  <FaAt />
                  <p className="px-2">Contato</p>
                </a>
              </li>

              <li className="py-2 border-y-2 border-solid border-gray-700">
                <a href="#hobbies" className="flex items-center justify-center">
                  <FaGuitar />
                  <p className="px-2">Hobbies</p>
                </a>
              </li>
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

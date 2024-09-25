import { useContext } from "react";
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
          <Tag>{"<h2>"}</Tag>
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
          <Tag>{"</h2>"}</Tag>
          <Tag>{"<p>"}</Tag>
          <div className="px-4">
            <p
              className={`${
                language === "pt" ? "" : "hidden"
              } py-1 text-stone-50 open-sans-regular text-left text-sm sm:text-md md:text-2xl`}
            >
              Sou desenvolvedor full-stack, formado em Análise e Desenvolvimento
              de Sistemas (2017) e pós-graduado em Computação em Nuvem.
              Especializado em sites e apps personalizados com React,
              TypeScript, Java e AWS, sempre focado na experiência do usuário.
              Atualmente, estou desenvolvendo um projeto de auxílio de treino
              que conecta personal trainers e alunos por meio de uma plataforma
              interativa. Meu objetivo é ajudar empresas a crescerem com
              soluções sob medida e responsivas, de estratégias de SEO a
              aplicativos móveis de impacto.
            </p>
            <p
              className={`${
                language === "en" ? "" : "hidden"
              }  py-1 text-stone-50 open-sans-regular text-left text-sm sm:text-md md:text-2xl`}
            >
              I’m a full-stack developer with a degree in Systems Analysis and
              Development (2017) and a postgrad in Cloud Computing. I specialize
              in custom websites and apps using React, TypeScript, Java, and
              AWS, always focused on user experience. Currently, I’m developing
              a fitness project that connects trainers and clients through an
              interactive platform. My goal is to help businesses grow with
              tailored, responsive solutions, from SEO strategies to impactful
              mobile apps.
            </p>
          </div>
          <Tag>{"</p>"}</Tag>
        </div>
        <div className="mxl:w-1/2">
          <Tag>{"<h2>"}</Tag>
          <div className="w-2/5 pl-4">
            <Title>Skills</Title>
          </div>
          <Tag>{"</h2>"}</Tag>
          <Tag>{"<p>"}</Tag>

          <div className="grid grid-cols-2 mxl:grid-cols-3">
            {skills.map((item, index) => (
              <p
                key={index}
                className={`noWrap neon-red uppercase px-4 py-1 text-red-600 josefin-slab-regular text-left text-xs sm:text-sm md:text-md`}
              >
                {item}
              </p>
            ))}
          </div>
          <Tag>{"</p>"}</Tag>
          <Tag>{"<button>"}</Tag>
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
          <Tag>{"</button>"}</Tag>
        </div>
      </div>
    </div>
  );
}

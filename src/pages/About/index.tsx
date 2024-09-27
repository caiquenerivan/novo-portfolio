import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import skills from "../../data/skills";
import { Tag } from "../../components/Tag";
import { Title } from "../../components/Title";

export default function About() {
  const { language } = useContext(LanguageContext);
  const fileUrlEn: string = "/assets/cvs/cven.pdf";
  const fileUrlPt: string = "/assets/cvs/cvpt.pdf";

  const handleDownloadCv = async (fileUrl: string, filename: string): Promise<void> => {
    try {
      // Faz o download do arquivo usando fetch
      const response = await fetch(fileUrl);

      // Verifica se a resposta foi bem-sucedida
      if (!response.ok) {
        throw new Error("Erro ao fazer download do arquivo.");
      }

      
      // Verifica se o Content-Type é de um PDF
      const contentType = response.headers.get("Content-Type");
      console.log("Content-Type:", contentType); // Para verificar o cabeçalho
      if (contentType !== "application/pdf") {
        throw new Error("O arquivo baixado não é um PDF válido.");
      }

      // Converte a resposta para blob (binário)
      const blob = await response.blob();

      // Cria um URL temporário para o blob
      const blobUrl = window.URL.createObjectURL(blob);

      // Cria um elemento <a> para o download
      const link: HTMLAnchorElement = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", filename); // Nome do arquivo ao ser baixado

      // Simula o clique no link
      document.body.appendChild(link);
      link.click();

      // Remove o elemento <a> e revoga o URL do blob
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Erro ao baixar o arquivo:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full pl-16 justify-center max-w-screen-3xl 3xl:pl-96 z-10">
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
                {item.name}
              </p>
            ))}
          </div>
          <Tag>{"</p>"}</Tag>
          <Tag>{"<button>"}</Tag>
          <button
            onClick={()=> {handleDownloadCv(
              fileUrlPt,
              "CV - Caique Nerivan - Fullstack Developer"
            )}}
            className={`${
              language === "pt" ? "" : "hidden"
            } border-solid border-2 border-teal-500 rounded-3xl m-4 w-48 h-12 hover:bg-teal-500 text-gray-700`}
          >
            <p
              className={`${
                language === "pt" ? "" : "hidden"
              } text-teal-500 hover:text-gray-700 w-full h-full flex justify-center items-center uppercase`}
            >
              Baixar Currículo
            </p>
          </button>
          <button
            onClick={()=> {handleDownloadCv(
              fileUrlEn,
              "Resumè Caique Nerivan - Fullstack Developer"
            )}}
            className={`${
              language === "en" ? "" : "hidden"
            } border-solid border-2 border-teal-500 rounded-3xl m-4 w-48 h-12 hover:bg-teal-500 text-gray-700`}
          >
            <p
              className={`text-teal-500 hover:text-gray-700 w-full h-full flex justify-center items-center uppercase`}
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

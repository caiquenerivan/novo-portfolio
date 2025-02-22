import { useContext, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import Modal from "../../components/Modal";
import { Title } from "../../components/Title";
import { Tag } from "../../components/Tag";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import useWorks from "../../data/useWorks";
import { skillsType } from "../../data/useSkills";

export default function Portfolio() {
  const { language } = useContext(LanguageContext);
  const [activeWorkIndex, setActiveWorkIndex] = useState<number | null>(null);
  const [showCount, setShowCount] = useState<number>(3);

  const { works, loading, error } = useWorks();

  const showMore = () => {
    setShowCount((prevCount) => prevCount + 3);
    console.log(showCount);
  };
  const showLess = () => {
    if (showCount == 3) {
      console.log(showCount);
      return showCount;
    }
    setShowCount((prevCount) => prevCount - 3);
    console.log(showCount);
  };
  console.log();
  

  const handleOpenModal = (index: number) => setActiveWorkIndex(index);
  const handleCloseModal = () => setActiveWorkIndex(null);

  if (loading)
    return (
      <div
        className={`flex justify-center items-center w-full h-full noWrap neon-red uppercase px-4 py-1 text-red-600 josefin-slab-regular text-left text-xs sm:text-sm md:text-md`}
      >
        {`${
          language === "en" ? "Loading skils... " : "Carregando habilidades... "
        }`}{" "}
      </div>
    );
  if (error)
    return (
      <div
        className={`noWrap neon-red uppercase px-4 py-1 text-red-600 josefin-slab-regular text-left text-xs sm:text-sm md:text-md`}
      >
        {`${language === "en" ? "Error: " : "Erro: "}`} {error}
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen w-full pl-16 justify-center max-w-screen-3xl my-9 3xl:pl-96 z-10">
      <div className="flex flex-col px-8 py-4">
        <Tag>{"<h2>"}</Tag>

        <div className="flex flex-col w-full px-4">
          <div className="lg:flex">
            <div className="w-3/5">
              <Title>
                <span className={`${language === "pt" ? "" : "hidden"}`}>
                  Portfólio
                </span>
                <span className={`${language === "en" ? "" : "hidden"}`}>
                  Portfolio
                </span>
              </Title>
            </div>
          </div>
        </div>
        <Tag>{"</h2>"}</Tag>

        <Tag>{"<p>"}</Tag>

        <div className="w-full flex flex-col h-3/5 lg:flex-row">
          <div className="w-full">
            <p
              className={`${
                language === "pt" ? "" : "hidden"
              } px-4 py-1 text-stone-50 open-sans-regular text-justify text-sm sm:text-xl md:text-xl`}
            >
              Confira alguns dos meus projetos e veja como transformo ideias em
              soluções digitais impactantes.
            </p>
            <p
              className={`${
                language === "en" ? "" : "hidden"
              }  px-4 py-1 text-stone-50 open-sans-regular text-justify text-sm sm:text-md md:text-xl`}
            >
              Take a look at my projects and see how I turn ideas into impactful
              digital solutions.
            </p>
          </div>
        </div>
        <Tag>{"</p>"}</Tag>
        <Tag>{"<section>"}</Tag>
        <div className="flex flex-col w-full justify-center items-center">
          <div className="flex py-4 flex-col lg:grid grid-cols-3">
            {works.slice(0, showCount).map((work, index) => {
              const main_language = work.skills.find((skill: skillsType) => skill.skill_id === work.main_language_id); 
              return (
                <div
                  key={index}
                  style={{ borderColor: main_language?.color_hexa }}
                  className={`py-8 bg-gray-700 min-w-60 max-w-80 h-50 mb-8  mx-2 border-t-4 rounded-sm shadow-lg p-4`}
                >
                  <p
                    style={{ color: main_language?.color_hexa }}
                    className={`my-1 uppercase josefin-slab-regular text-left text-sm sm:text-xl md:text-xl`}
                  >
                    {main_language?.name}
                  </p>
                  <h2
                    className={`line-clamp-1 text-stone-300 londrina-solid-regular text-md text-left py-1 sm:text-xl md:text-5xl lg:text-2xl xl:text-3xl`}
                  >
                    {`${language === "pt" ? work.title_pt : work.title_en}`}
                  </h2>
                  <p
                    className={`line-clamp-2 my-1 twoLineText text-stone-300 open-sans-regular text-left text-sm sm:text-xl md:text-xl`}
                  >
                    {`${
                      language === "pt"
                        ? work.description_pt
                        : work.description_en
                    }`}
                  </p>
                  <button
                    style={{
                      color: main_language?.color_hexa,
                      borderColor: main_language?.color_hexa,
                    }}
                    className={`mt-4 border-2 p-2 rounded-2xl open-sans-regular text-left text-sm hover:bg-gray-600 sm:text-xl md:text-xl`}
                    onClick={() => handleOpenModal(index)}
                  >
                    {language === "pt" ? "Ver Mais" : "See More"}
                  </button>
                  {activeWorkIndex === index && (
                    <Modal
                      isOpen={activeWorkIndex === index}
                      onClose={handleCloseModal}
                    >
                      <div className="my-8 w-full h-full max-w-2xl flex flex-col justify-center ">
                        <h2
                          className={`text-stone-300 londrina-solid-regular text-xl text-left py-1 my-2 sm:text-xl md:text-5xl lg:text-2xl mxl:py-4`}
                        >
                          {`${
                            language === "pt" ? work.title_pt : work.title_en
                          }`}
                        </h2>

                        <p
                          style={{ color: main_language?.color_hexa }}
                          className={`josefin-slab-regular text-left text-sm uppercase sm:text-xl md:text-xl mxl:text-5xl`}
                        >
                          {main_language?.name}
                        </p>

                        <p
                          className={`my-1 twoLineText text-stone-300 open-sans-regular text-left text-sm sm:text-xl md:text-lg mxl:py-4`}
                        >
                          {`${
                            language === "pt" ? work.description_pt : work.description_en
                          }`}
                        </p>
                        <div
                          style={{ borderColor: main_language?.color_hexa }}
                          className="flex justify-around border-t-2 w-full mt-4"
                        >
                          {work.skills.map((skill, index) => (
                            <p
                              style={{ color: main_language?.color_hexa }}
                              className="text-left my-2 mxl:text-2xl uppercase"
                              key={index}
                            >
                              {skill.name}
                            </p>
                          ))}
                        </div>
                        <div className=" flex justify-center items-center w-full rounded-md">
                          <img
                            src={work.photo}
                            alt={
                              language === "en" ? work.title_en : work.title_pt
                            }
                            className="w-48 rounded-md"
                          />
                        </div>
                        <div className="flex justify-center items-center mt-8 ">
                          <div
                            className="rounded-xl border-2 flex justify-center items-center mx-2 hover:bg-gray-600 mxl:w-36"
                            style={{
                              borderColor: main_language?.color_hexa,
                            }}
                          >
                            <a
                              href={work.link_github}
                              style={{ color: main_language?.color_hexa }}
                              className={`text-left m-2 text-xs mxl:text-2xl uppercase`}
                            >
                              {language === "pt"
                                ? "Link do GitHub"
                                : "GitHub Link"}
                            </a>
                          </div>

                          <div
                            className={`${
                              !work.link_project ? "hidden" : ""
                            } rounded-xl border-2 flex justify-center items-center mx-2 hover:bg-gray-600 mxl:w-36`}
                            style={{
                              borderColor: main_language?.color_hexa,
                            }}
                          >
                            <a
                              href={work.link_project}
                              style={{ color: main_language?.color_hexa }}
                              className={`text-left m-2 text-xs mxl:text-2xl uppercase`}
                            >
                              {language === "pt"
                                ? "Link do Projeto"
                                : "Project Link"}
                            </a>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex">
            {showCount < works.length && (
              <button
                className="text-teal-500 text-center p-2 border-2 rounded-full border-slate-700 hover:border-teal-500 transition-all"
                onClick={() => showMore()}
              >
                <FaChevronDown />
              </button>
            )}
            {showCount > 3 && (
              <button
                className="text-teal-500 text-center p-2 border-2 rounded-full border-slate-700 hover:border-teal-500 transition-all"
                onClick={() => showLess()}
              >
                <FaChevronUp />
              </button>
            )}
          </div>
        </div>
        <Tag>{"</section>"}</Tag>
      </div>
      <div></div>
    </div>
  );
}

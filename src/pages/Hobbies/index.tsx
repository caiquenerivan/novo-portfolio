import { useContext, useState } from "react";
import Tags from "../../data/tags";
import { LanguageContext } from "../../context/LanguageContext";
import { Tag } from "../../components/Tag";
import { Title } from "../../components/Title";
import { Categories, HobbiesPost } from "../../data/hobbiesPosts";
import Carousel from "../../components/Carousel";

export default function Hobbies() {
  const { language } = useContext(LanguageContext);
  const [active, setActive] = useState<string>("music");

  const filteredHobbies = HobbiesPost.filter(
    (hobbie) => hobbie.categorie.tag === active
  );

  return (
    <div className="flex flex-col w-full pl-16 pb-0 justify-center max-w-screen-3xl min-h-screen">
      <div className="flex flex-col px-8 pt-2">
        <Tag>{Tags.abrirH2}</Tag>
        <div className="flex flex-col w-full px-4">
          <Title>Hobbies</Title>
        </div>
        <Tag>{Tags.fecharH2}</Tag>

        <Tag>{Tags.abrirP}</Tag>
        <p
          className={`${
            language === "pt" ? "" : "hidden"
          } px-4 py-1 text-stone-50 open-sans-regular text-left text-sm sm:text-md md:text-xl lg:text-3xl`}
        >
          Aqui estão algumas das atividades e conteúdos que gosto de fazer,
          escutar e assistir durante o meu tempo livre.
        </p>
        <p
          className={`${
            language === "en" ? "" : "hidden"
          } px-4 py-1 text-stone-50 open-sans-regular text-left text-sm  sm:text-md md:text-xl lg:text-3xl`}
        >
          Here are some of the activities and content I enjoy doing, listening
          to, and watching in my free time.
        </p>
        <Tag>{Tags.fecharP}</Tag>
        <div className="px-2 w-full flex flex-col justify-center items-center">
          <div className="flex border-b-4 border-teal-500 items-center w-full mt-2">
            {Categories.map((Category, index) => (
              <button
                key={index}
                className={`${
                  active === Category.tag
                    ? "bg-teal-500 text-gray-700"
                    : "bg-transparent text-teal-500"
                } px-2 text-sm md:text-lg lg:text-4xl lg:px-6`}
                onClick={() => setActive(Category.tag)}
              >
                <span className={`${language === "pt" ? "" : "hidden"}`}>
                  {Category.titlePt}
                </span>
                <span className={`${language === "en" ? "" : "hidden"}`}>
                  {Category.titleEn}
                </span>
              </button>
            ))}
          </div>
        </div>
        <Carousel active={active} hobbies={filteredHobbies} />
      </div>
      <div className="px-4">
        <Tag>{Tags.fecharBody}</Tag>
      </div>
      <div className="pb-4">
        <Tag>{Tags.fecharHTML}</Tag>
      </div>
    </div>
  );
}

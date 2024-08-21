import { useContext, useState } from "react";
import Tags from "../../data/tags";
import { LanguageContext } from "../../context/LanguageContext";
import { Tag } from "../../components/Tag";
import { Title } from "../../components/Title";
import { Categories, HobbiesPost } from "../../data/hobbiesPosts";


export default function Hobbies() {
  const { language } = useContext(LanguageContext);
  const [active, setActive] = useState<string>("music");

  return (
    <div className="flex flex-col h-screen w-full pl-16 justify-center max-w-screen-3xl">
      <div className="flex flex-col px-8 py-4">
        <Tag>{Tags.abrirH2}</Tag>
        <div className="flex flex-col w-full px-4">
          <Title>Hobbies</Title>
        </div>
        <Tag>{Tags.fecharH2}</Tag>

        <Tag>{Tags.abrirP}</Tag>
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
        <Tag>{Tags.fecharP}</Tag>
        <Tag>{Tags.abrirSection}</Tag>
        <div className="p-2 w-full flex flex-col justify-center items-center">
          <div className="flex border-b-4 border-teal-500 items-center w-full my-2">
            {Categories.map((Category, index) => (
              <button
                key={index}
                className={`${
                  active === Category.tag
                    ? "bg-teal-500 text-gray-700"
                    : "bg-transparent text-teal-500"
                } px-2 text-sm`}
                onClick={() => setActive(Category.tag)}
              >
                <span className={`${language === 'pt'? '':'hidden'}`}> {Category.titlePt}</span>
                <span className={`${language === 'en'? '':'hidden'}`}> {Category.titleEn}</span>
              </button>
            ))}
          </div>
          <div className="my-2 flex flex-row">
            {
                HobbiesPost.map((hobbie, index)=>(
                    <div key={index} className={`${active === hobbie.categorie.tag? '':'hidden'} hover:w-full`}>
                        <img src={hobbie.imageUrl} alt="" className="w-2 transition ease-in-out delay-200 hover:w-72 h-52 shadow-md rounded-sm hover:neon-teal object-cover hover:object-fill" >
                            
                        
                        </img>
                    </div>
                ))
            }
          </div>
        </div>
        <Tag>{Tags.fecharSection}</Tag>
      </div>
      <div className="px-4">
        <Tag>{Tags.fecharBody}</Tag>
      </div>
      <Tag>{Tags.fecharHTML}</Tag>
    </div>
  );
}

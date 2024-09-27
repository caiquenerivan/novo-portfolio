import { useContext } from "react";
import { Title } from "../../components/Title";
import { LanguageContext } from "../../context/LanguageContext";
import { Tag } from "../../components/Tag";
import { workType } from "../../data/worksType";
import Carousel from "../../components/Carousel";

const Services = () => {
  const { language } = useContext(LanguageContext);

  return (
    <div className="flex flex-col min-h-screen w-full pl-16 justify-center max-w-screen-3xl my-9 3xl:pl-96 z-10">
      <div className="flex flex-col px-8 pt-2">
        <Tag>{"<h2>"}</Tag>
        <div className="flex flex-col w-full px-4">
          <div className="lg:flex">
            <div className="w-3/5">
              <Title>
                <span className={`${language === "pt" ? "" : "hidden"}`}>
                  Serviços
                </span>
                <span className={`${language === "en" ? "" : "hidden"}`}>
                  Services
                </span>
              </Title>
            </div>
          </div>
        </div>
        <Tag>{"</h2>"}</Tag>
        <Tag>{"<p>"}</Tag>
        <div className="w-full flex flex-col lg:flex-row">
          <div className="w-full">
            <p
              className={`${
                language === "pt" ? "" : "hidden"
              } px-4 py-1 text-stone-50 josefin-slab-regular text-left text-xl sm:text-xl`}
            >
              Impulsione sua presença online com soluções criativas!
            </p>
            <p
              className={`${
                language === "en" ? "" : "hidden"
              }  px-4 py-1 text-stone-50 londrina-solid-light text-left text-xl sm:text-xl`}
            >
              Elevate your online presence with creative solutions!
            </p>
            <p
              className={`${
                language === "pt" ? "" : "hidden"
              } px-4 py-1 text-stone-50 open-sans-regular text-left text-xl sm:text-xl`}
            >
              Oferecemos sites personalizados, aplicativos incríveis e
              estratégias de SEO que fazem a diferença.
            </p>
            <p
              className={`${
                language === "en" ? "" : "hidden"
              }  px-4 py-1 text-stone-50 open-sans-regular text-left text-xl sm:text-xl`}
            >
              We offer custom websites, amazing apps, and SEO strategies that
              truly make an impact.
            </p>
          </div>
        </div>
        <Tag>{"</p>"}</Tag>
        <Tag>{"<section>"}</Tag>

        <Carousel items={workType}/>

        <Tag>{"</section>"}</Tag>
      </div>
    </div>
  );
};

export default Services;

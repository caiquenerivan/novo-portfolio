import { useContext } from "react";
import { Title } from "../../components/Title";
import { LanguageContext } from "../../context/LanguageContext";
import { Tag } from "../../components/Tag";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { workType } from "../../data/worksType";

const Services = () => {
  const { language } = useContext(LanguageContext);

  return (
    <div className="flex flex-col min-h-screen w-full pl-16 justify-center max-w-screen-3xl my-9 3xl:pl-96">
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
              } px-4 py-1 text-stone-50 open-sans-regular text-justify text-xl sm:text-xl`}
            >
              Mussum Ipsum, cacilds vidis litro abertis. Si num tem leite então
              bota uma pinga aí cumpadi! Aenean aliquam molestie leo, vitae
              iaculis nisl. Posuere libero varius.
            </p>
            <p
              className={`${
                language === "en" ? "" : "hidden"
              }  px-4 py-1 text-stone-50 open-sans-regular text-justify text-xl sm:text-xl`}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <Tag>{"</p>"}</Tag>
        <Tag>{"<section>"}</Tag>
        <Swiper
          modules={[Autoplay, Pagination, Navigation, Scrollbar]}
          scrollbar={true}
          loop={true}
          spaceBetween={2}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 250,
            },
          }}
          className="p-2 mx-4 flex justify-between"
        >
          {workType.map((work, index) => (
          <SwiperSlide key={index} className="p-0  " >
            <div className="card-responsivo bg-teal-100 rounded-md flex flex-col p-2 items-center pb-4 swiper">
              <img
                src={work.image}
                alt={`${
                  language === "pt"
                    ? `capa de ${work.titlePt}`
                    : `${work.titlePt} cover`
                }`}
                className={` img-card w-48 h-48 md:w-full md:h-full xl:w-72 xl:h-72 rounded-md pointer-events-none object-cover border-4 border-teal-50 `}
              />
              <div className="flex flex-col justify-between my-2 px-2 w-full ">
                <h3 className="text-teal-600 text-xl pt-2 londrina-solid-regular pl-2 md:text-2xl lg:text-2xl ">
                  <span className={`${language === "pt" ? "" : "hidden"}`}>
                    {work.titlePt}
                  </span>
                  <span className={`${language === "en" ? "" : "hidden"}`}>
                    {work.titleEn}
                  </span>
                </h3>
                <p className="text-teal-600 text-xl londrina-solid-light pl-2 text-left md:text-2xl lg:text-2xl ">
                  <span className={`${language === "pt" || !work.descPt ? "" : "hidden"}`}>
                    {work.descPt}
                  </span>
                  <span className={`${language === "en" || !work.descEn ? "" : "hidden"}`}>
                    {work.descEn}
                  </span>
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
        </Swiper>
        <Tag>{"</section>"}</Tag>
      </div>
    </div>
  );
};

export default Services;

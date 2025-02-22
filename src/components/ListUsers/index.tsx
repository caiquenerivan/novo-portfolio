import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import useUser from "../../data/useUser";

const UserAbout = () => {
  const { user, loading, error } = useUser();
  const { language } = useContext(LanguageContext);

  if (loading)
    return (
      <div
        className={`py-1 text-stone-50 open-sans-regular text-left text-sm sm:text-md md:text-2xl`}
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
    <div className="px-4">
      <p
        className={`py-1 text-stone-50 open-sans-regular text-left text-sm sm:text-md md:text-2xl`}
      >
        {language === "en" ? user?.about_en : user?.about_pt}
      </p>
    </div>
  );
};

const UserWorkTitle = () => {
  const { user, loading, error } = useUser();
  const { language } = useContext(LanguageContext);

  if (loading)
    return (
      <div
        className={`py-1 text-stone-50 open-sans-regular text-left text-sm sm:text-md md:text-2xl`}
      >
        {`${
          language === "en" ? "Loading stacks... " : "Carregando habilidades... "
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
    <div className="px-4">
      <p
        className={`py-1 text-stone-50 open-sans-regular text-left text-sm sm:text-md md:text-2xl`}
      >
        {language === "en" ? user?.work_title_en : user?.work_title_pt}
      </p>
    </div>
  );
};

export {UserWorkTitle, UserAbout};
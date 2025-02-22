import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import useSkills from "../../data/useSkills";

const SkillList = () => {

  const { skills, loading, error } = useSkills();
  const { language } = useContext(LanguageContext);   
  

  if (loading) return <div className={`noWrap neon-red uppercase px-4 py-1 text-red-600 josefin-slab-regular text-left text-xs sm:text-sm md:text-md`}>{`${language === 'en' ? 'Loading skils... ': 'Carregando habilidades... '}`} </div>;
  if (error) return <div className={`noWrap neon-red uppercase px-4 py-1 text-red-600 josefin-slab-regular text-left text-xs sm:text-sm md:text-md`}>{`${language === 'en' ? 'Error: ': 'Erro: '}`} {error}</div>;

  return (
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
  );
};

export default SkillList;

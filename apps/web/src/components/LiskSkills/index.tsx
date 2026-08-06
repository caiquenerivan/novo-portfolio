import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import useSkills from "../../data/useSkills";

const SkillList = () => {

  const { skills, loading, error } = useSkills();
  const { language } = useContext(LanguageContext);   
  

  if (loading) return <div className={`noWrap neon-teal uppercase px-4 py-1 text-teal-400 josefin-slab-regular text-left text-xs sm:text-sm md:text-md`}>{`${language === 'en' ? 'Loading skills... ': 'Carregando habilidades... '}`} </div>;
  if (error) return <div className={`noWrap neon-teal uppercase px-4 py-1 text-teal-400 josefin-slab-regular text-left text-xs sm:text-sm md:text-md`}>{`${language === 'en' ? 'Error: ': 'Erro: '}`} {error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 mxl:grid-cols-3 gap-2 my-2">
      {skills.map((item, index) => (
        <div
          key={index}
          className="flex items-center space-x-2 bg-slate-900/60 border border-teal-500/30 rounded-lg px-3 py-1.5 hover:border-cyan-400/70 hover:shadow-[0_0_12px_rgba(34,211,238,0.3)] transition-all duration-300 group"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 group-hover:bg-cyan-300 group-hover:scale-125 transition-all"></span>
          <p
            className={`uppercase text-teal-300 group-hover:text-cyan-200 josefin-slab-regular text-left text-xs sm:text-sm tracking-wide font-medium break-words`}
          >
            {item.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SkillList;

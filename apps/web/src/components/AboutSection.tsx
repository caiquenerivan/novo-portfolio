import React from 'react';
import { Profile, Experience } from '@portfolio/shared-types';
import { User, Calendar, Building, Award } from 'lucide-react';

interface AboutProps {
  profile: Profile | null;
  experiences: Experience[];
}

export const AboutSection: React.FC<AboutProps> = ({ profile, experiences }) => {
  return (
    <section id="sobre" className="py-20 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white flex items-center justify-center gap-2">
            <User className="w-7 h-7 text-cyan-400" /> Sobre Mim
          </h2>
          <p className="mt-2 text-slate-400">Minha trajetória e paixão por engenharia de software</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          <div className="glass-card p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Biografia</h3>
            <p className="text-slate-300 leading-relaxed whitespace-pre-line">
              {profile?.about || profile?.bio}
            </p>
          </div>

          <div id="experiencia" className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
              <Award className="w-5 h-5 text-indigo-400" /> Experiência Profissional
            </h3>

            <div className="relative border-l-2 border-slate-800 ml-4 space-y-8 pl-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative group">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-400 group-hover:bg-cyan-400 transition-colors" />

                  <div className="glass-card p-6 rounded-xl">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h4 className="text-lg font-bold text-white">{exp.role}</h4>
                      <span className="px-2.5 py-1 rounded-md bg-slate-800 text-cyan-400 text-xs font-semibold flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {exp.period}
                      </span>
                    </div>

                    <div className="text-sm text-indigo-300 flex items-center gap-1.5 mb-3">
                      <Building className="w-4 h-4" /> {exp.company}
                    </div>

                    <p className="text-sm text-slate-300 mb-4">{exp.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

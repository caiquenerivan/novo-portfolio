import React from 'react';
import { Skill } from '@portfolio/shared-types';
import { Cpu, Layout, Server, Terminal, Database, Wrench } from 'lucide-react';

interface SkillsProps {
  skills: Skill[];
}

export const SkillsSection: React.FC<SkillsProps> = ({ skills }) => {
  const categories = [
    { key: 'frontend', label: 'Frontend', icon: Layout },
    { key: 'backend', label: 'Backend', icon: Server },
    { key: 'database', label: 'Banco de Dados', icon: Database },
    { key: 'devops', label: 'DevOps & Nuvem', icon: Terminal },
    { key: 'tools', label: 'Ferramentas', icon: Wrench }
  ];

  return (
    <section id="habilidades" className="py-20 bg-slate-950/50 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white flex items-center justify-center gap-2">
            <Cpu className="w-7 h-7 text-indigo-400" /> Habilidades Técnicas
          </h2>
          <p className="mt-2 text-slate-400">Tecnologias e ferramentas que utilizo no dia a dia</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => {
            const catSkills = skills.filter((s) => s.category === cat.key);
            if (catSkills.length === 0) return null;
            const Icon = cat.icon;

            return (
              <div key={cat.key} className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{cat.label}</h3>
                </div>

                <div className="space-y-4">
                  {catSkills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between text-sm mb-1.5 font-medium">
                        <span className="text-slate-200">{skill.name}</span>
                        <span className="text-cyan-400 font-mono text-xs">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full gradient-bg rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

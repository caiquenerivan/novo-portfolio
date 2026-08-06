import React, { useState } from 'react';
import { Project } from '@portfolio/shared-types';
import { FolderGit2, ExternalLink, Github, Sparkles } from 'lucide-react';

interface ProjectsProps {
  projects: Project[];
}

export const ProjectsSection: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedTag, setSelectedTag] = useState<string>('Todos');

  // Extract all unique tags
  const allTags = ['Todos', ...Array.from(new Set(projects.flatMap((p) => p.tags)))];

  const filteredProjects = selectedTag === 'Todos'
    ? projects
    : projects.filter((p) => p.tags.includes(selectedTag));

  return (
    <section id="projetos" className="py-20 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white flex items-center justify-center gap-2">
            <FolderGit2 className="w-7 h-7 text-cyan-400" /> Projetos em Destaque
          </h2>
          <p className="mt-2 text-slate-400">Alguns dos meus trabalhos e soluções desenvolvidas</p>
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedTag === tag
                  ? 'gradient-bg text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700/50'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="glass-card rounded-2xl overflow-hidden flex flex-col group">
              {project.imageUrl && (
                <div className="relative h-52 overflow-hidden bg-slate-900">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {project.featured && (
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-cyan-500/90 text-white text-[11px] font-bold flex items-center gap-1 shadow-lg">
                      <Sparkles className="w-3 h-3" /> Destaque
                    </div>
                  )}
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-slate-800 text-cyan-300 text-xs font-medium border border-slate-700/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      <Github className="w-4 h-4" /> Código
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" /> Preview Ao Vivo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

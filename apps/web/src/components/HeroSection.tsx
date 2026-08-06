import React from 'react';
import { Profile } from '@portfolio/shared-types';
import { Github, Linkedin, Mail, MapPin, Briefcase } from 'lucide-react';


interface HeroProps {
  profile: Profile | null;
}

export const HeroSection: React.FC<HeroProps> = ({ profile }) => {
  if (!profile) return null;

  return (
    <section className="relative pt-12 pb-24 overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          <div className="flex-1 text-center lg:text-left">
            {profile.availableForHire && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Disponível para novos projetos
              </div>
            )}

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4">
              Olá, eu sou <span className="gradient-text block sm:inline">{profile.name}</span>
            </h1>

            <h2 className="text-xl sm:text-2xl font-medium text-cyan-400 mb-6 flex items-center justify-center lg:justify-start gap-2">
              <Briefcase className="w-5 h-5 text-indigo-400" />
              {profile.title}
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8">
              {profile.bio}
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-4 mb-8 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-cyan-400" /> {profile.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-indigo-400" /> {profile.email}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="#projetos"
                className="px-6 py-3 rounded-xl gradient-bg text-white font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all"
              >
                Ver Projetos
              </a>
              <a
                href="#contato"
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold transition-colors"
              >
                Entrar em Contato
              </a>

              <div className="flex items-center gap-3 ml-2">
                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl glass-card text-slate-300 hover:text-white hover:border-cyan-500/50 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {profile.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl glass-card text-slate-300 hover:text-white hover:border-cyan-500/50 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-3xl p-2 gradient-bg shadow-2xl shadow-cyan-500/20 group-hover:rotate-1 transition-transform">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-full h-full object-cover rounded-2xl border-2 border-slate-900"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, UserCheck, ShieldCheck, LogOut } from 'lucide-react';
import { authService } from '../services/api';

interface NavbarProps {
  isAdminLoggedIn?: boolean;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isAdminLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-lg text-white group-hover:text-cyan-400 transition-colors">
              Portfólio<span className="text-cyan-400">.</span>
            </span>
            <span className="block text-[10px] text-slate-400 tracking-wider uppercase">Microservices CMS</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#sobre" className="hover:text-cyan-400 transition-colors">Sobre</a>
          <a href="#experiencia" className="hover:text-cyan-400 transition-colors">Experiência</a>
          <a href="#habilidades" className="hover:text-cyan-400 transition-colors">Habilidades</a>
          <a href="#projetos" className="hover:text-cyan-400 transition-colors">Projetos</a>
          <a href="#blog" className="hover:text-cyan-400 transition-colors">Blog</a>
          <a href="#contato" className="hover:text-cyan-400 transition-colors">Contato</a>
        </nav>

        <div className="flex items-center gap-3">
          {isAdminLoggedIn ? (
            <div className="flex items-center gap-3">
              <Link to="/admin" className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Admin CMS
              </Link>
              <button
                onClick={() => {
                  authService.logout();
                  if (onLogout) onLogout();
                  navigate('/');
                }}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-slate-700 transition-colors"
                title="Sair do Admin"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/admin"
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" /> Área do Autor
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

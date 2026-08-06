import { useState } from "react";
import { Tag } from "../../components/Tag";
import { Title } from "../../components/Title";
import { useAuth } from "../../hooks/useAuth";
import ProfileTab from "./tabs/ProfileTab";
import ProjectsTab from "./tabs/ProjectsTab";
import SkillsTab from "./tabs/SkillsTab";
import ExperiencesTab from "./tabs/ExperiencesTab";
import BlogTab from "./tabs/BlogTab";
import MessagesTab from "./tabs/MessagesTab";
import { FaSignOutAlt } from "react-icons/fa";

type TabKey = "profile" | "projects" | "skills" | "experiences" | "blog" | "messages";

const TABS: { key: TabKey; label: string }[] = [
  { key: "profile", label: "Perfil" },
  { key: "projects", label: "Projetos" },
  { key: "skills", label: "Skills" },
  { key: "experiences", label: "Experiências" },
  { key: "blog", label: "Blog" },
  { key: "messages", label: "Mensagens" },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState<TabKey>("profile");

  return (
    <div className="flex flex-col min-h-screen w-full pl-16 justify-start max-w-screen-3xl my-9 3xl:pl-96 z-10 pr-6 sm:pr-12">
      <div className="flex flex-col px-4 pt-2 w-full">
        <Tag>{"<admin>"}</Tag>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4">
          <Title>Painel</Title>
          <div className="flex items-center gap-3 pb-2">
            <span className="text-sm text-slate-400">
              Logado como <span className="text-teal-300 font-semibold">{user?.username}</span>
            </span>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 text-xs font-semibold hover:border-red-500/50 hover:text-red-400 transition-all"
            >
              <FaSignOutAlt />
              Sair
            </button>
          </div>
        </div>

        <div className="w-full my-4 px-4">
          <div className="flex flex-wrap gap-2 bg-slate-900/70 border border-teal-500/30 rounded-2xl p-2 backdrop-blur-md">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  tab === t.key
                    ? "bg-teal-500 text-slate-950 shadow-[0_0_10px_rgba(45,212,191,0.5)]"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full px-4 pb-16">
          {tab === "profile" && <ProfileTab />}
          {tab === "projects" && <ProjectsTab />}
          {tab === "skills" && <SkillsTab />}
          {tab === "experiences" && <ExperiencesTab />}
          {tab === "blog" && <BlogTab />}
          {tab === "messages" && <MessagesTab />}
        </div>
        <Tag>{"</admin>"}</Tag>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Skill } from "@portfolio/shared-types";
import { infoService } from "../../../services/api";
import { card, input, label, btnPrimary, btnDanger, sectionTitle } from "../styles";

const CATEGORIES: Skill["category"][] = ["frontend", "backend", "devops", "mobile", "tools", "database"];

const EMPTY = { name: "", category: "frontend" as Skill["category"], level: 80 };

export default function SkillsTab() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = () => infoService.getSkills().then(setSkills).finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await infoService.createSkill(form);
      setForm(EMPTY);
      await load();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir esta skill?")) return;
    await infoService.deleteSkill(id);
    await load();
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className={card}>
        <h3 className={sectionTitle}>Nova skill</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={label}>Nome</label>
            <input
              className={input}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className={label}>Categoria</label>
            <select
              className={input}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as Skill["category"] })}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={label}>Nível (1-100)</label>
            <input
              className={input}
              type="number"
              min={1}
              max={100}
              value={form.level}
              onChange={(e) => setForm({ ...form, level: Number(e.target.value) })}
            />
          </div>
        </div>
        <div className="mt-6">
          <button type="submit" className={btnPrimary} disabled={saving}>
            {saving ? "Adicionando..." : "Adicionar skill"}
          </button>
        </div>
      </form>

      <div className="space-y-3">
        <h3 className={sectionTitle}>Skills cadastradas</h3>
        {loading && <div className="text-teal-400 text-sm animate-pulse">Carregando...</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {skills.map((s) => (
            <div
              key={s.id}
              className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <p className="text-slate-100 font-medium truncate">{s.name}</p>
                <p className="text-slate-500 text-xs uppercase">{s.category} · {s.level}%</p>
              </div>
              <button className={btnDanger} onClick={() => handleDelete(s.id)}>
                Excluir
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

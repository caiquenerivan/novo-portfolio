import { useEffect, useState } from "react";
import { Experience } from "@portfolio/shared-types";
import { infoService } from "../../../services/api";
import { card, input, textarea, label, btnPrimary, btnDanger, row, sectionTitle } from "../styles";

const EMPTY = { role: "", company: "", period: "", description: "", technologies: "" };

export default function ExperiencesTab() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = () => infoService.getExperiences().then(setExperiences).finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await infoService.createExperience({
        ...form,
        technologies: form.technologies.split(",").map((t) => t.trim()).filter(Boolean),
      });
      setForm(EMPTY);
      await load();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir esta experiência?")) return;
    await infoService.deleteExperience(id);
    await load();
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className={card}>
        <h3 className={sectionTitle}>Nova experiência</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={label}>Cargo</label>
            <input className={input} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required />
          </div>
          <div>
            <label className={label}>Empresa</label>
            <input className={input} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} required />
          </div>
          <div>
            <label className={label}>Período</label>
            <input className={input} value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} placeholder="2023 - Presente" />
          </div>
          <div>
            <label className={label}>Tecnologias (separadas por vírgula)</label>
            <input className={input} value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} placeholder="Node.js, React, Docker" />
          </div>
        </div>
        <div className="mt-4">
          <label className={label}>Descrição</label>
          <textarea className={textarea} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
        </div>
        <div className="mt-6">
          <button type="submit" className={btnPrimary} disabled={saving}>
            {saving ? "Adicionando..." : "Adicionar experiência"}
          </button>
        </div>
      </form>

      <div className="space-y-3">
        <h3 className={sectionTitle}>Experiências cadastradas</h3>
        {loading && <div className="text-teal-400 text-sm animate-pulse">Carregando...</div>}
        {experiences.map((exp) => (
          <div key={exp.id} className={row}>
            <div>
              <p className="text-slate-100 font-semibold">
                {exp.role} <span className="text-slate-500 font-normal">· {exp.company}</span>
              </p>
              <p className="text-slate-400 text-xs">{exp.period}</p>
            </div>
            <button className={btnDanger} onClick={() => handleDelete(exp.id)}>
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

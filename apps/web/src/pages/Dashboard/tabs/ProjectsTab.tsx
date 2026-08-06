import { useEffect, useState } from "react";
import { Project } from "@portfolio/shared-types";
import { infoService } from "../../../services/api";
import { card, input, textarea, label, btnPrimary, btnSecondary, btnDanger, row, sectionTitle } from "../styles";

const EMPTY_FORM = {
  title: "",
  description: "",
  longDescription: "",
  imageUrl: "",
  tags: "",
  githubUrl: "",
  liveUrl: "",
  featured: false,
};

type FormState = typeof EMPTY_FORM;

export default function ProjectsTab() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const load = () => infoService.getProjects().then(setProjects).finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const startEdit = (p: Project) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      description: p.description,
      longDescription: p.longDescription || "",
      imageUrl: p.imageUrl || "",
      tags: (p.tags || []).join(", "),
      githubUrl: p.githubUrl || "",
      liveUrl: p.liveUrl || "",
      featured: p.featured,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    try {
      if (editingId) {
        await infoService.updateProject(editingId, payload);
      } else {
        await infoService.createProject(payload);
      }
      cancelEdit();
      await load();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este projeto?")) return;
    await infoService.deleteProject(id);
    await load();
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className={card}>
        <h3 className={sectionTitle}>{editingId ? "Editar projeto" : "Novo projeto"}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={label}>Título</label>
            <input className={input} name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div>
            <label className={label}>Tags (separadas por vírgula)</label>
            <input className={input} name="tags" value={form.tags} onChange={handleChange} placeholder="React, Node.js, Docker" />
          </div>
          <div>
            <label className={label}>URL da imagem</label>
            <input className={input} name="imageUrl" value={form.imageUrl} onChange={handleChange} />
          </div>
          <div>
            <label className={label}>GitHub</label>
            <input className={input} name="githubUrl" value={form.githubUrl} onChange={handleChange} />
          </div>
          <div>
            <label className={label}>Link ao vivo</label>
            <input className={input} name="liveUrl" value={form.liveUrl} onChange={handleChange} />
          </div>
          <div className="flex items-center gap-2 pt-6">
            <input
              id="featured"
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
              className="w-4 h-4 accent-teal-500"
            />
            <label htmlFor="featured" className="text-sm text-slate-300">
              Destacar na home
            </label>
          </div>
        </div>
        <div className="mt-4">
          <label className={label}>Descrição curta</label>
          <textarea className={textarea} name="description" value={form.description} onChange={handleChange} rows={2} required />
        </div>
        <div className="mt-4">
          <label className={label}>Descrição completa</label>
          <textarea className={textarea} name="longDescription" value={form.longDescription} onChange={handleChange} rows={4} />
        </div>
        <div className="flex items-center gap-3 mt-6">
          <button type="submit" className={btnPrimary} disabled={saving}>
            {saving ? "Salvando..." : editingId ? "Salvar alterações" : "Criar projeto"}
          </button>
          {editingId && (
            <button type="button" className={btnSecondary} onClick={cancelEdit}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        <h3 className={sectionTitle}>Projetos existentes</h3>
        {loading && <div className="text-teal-400 text-sm animate-pulse">Carregando...</div>}
        {!loading && projects.length === 0 && (
          <div className="text-slate-400 text-sm">Nenhum projeto cadastrado.</div>
        )}
        {projects.map((p) => (
          <div key={p.id} className={row}>
            <div>
              <p className="text-slate-100 font-semibold">
                {p.title} {p.featured && <span className="text-cyan-400 text-xs ml-2">★ destaque</span>}
              </p>
              <p className="text-slate-400 text-sm line-clamp-1">{p.description}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button className={btnSecondary} onClick={() => startEdit(p)}>
                Editar
              </button>
              <button className={btnDanger} onClick={() => handleDelete(p.id)}>
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

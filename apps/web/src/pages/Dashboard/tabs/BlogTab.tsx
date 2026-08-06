import { useEffect, useState } from "react";
import { BlogPost } from "@portfolio/shared-types";
import { blogService } from "../../../services/api";
import { card, input, textarea, label, btnPrimary, btnSecondary, btnDanger, row, sectionTitle } from "../styles";

const EMPTY_FORM = {
  title: "",
  slug: "",
  summary: "",
  content: "",
  coverImage: "",
  tags: "",
  published: true,
};

type FormState = typeof EMPTY_FORM;

export default function BlogTab() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const load = () => blogService.getAllPostsAdmin().then(setPosts).finally(() => setLoading(false));

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

  const startEdit = (p: BlogPost) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      slug: p.slug,
      summary: p.summary,
      content: p.content,
      coverImage: p.coverImage || "",
      tags: (p.tags || []).join(", "),
      published: p.published,
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
        await blogService.updatePost(editingId, payload);
      } else {
        await blogService.createPost(payload);
      }
      cancelEdit();
      await load();
    } finally {
      setSaving(false);
    }
  };

  const togglePublished = async (p: BlogPost) => {
    await blogService.updatePost(p.id, { published: !p.published });
    await load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este artigo?")) return;
    await blogService.deletePost(id);
    await load();
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className={card}>
        <h3 className={sectionTitle}>{editingId ? "Editar artigo" : "Novo artigo"}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={label}>Título</label>
            <input className={input} name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div>
            <label className={label}>Slug (opcional — gerado do título se vazio)</label>
            <input className={input} name="slug" value={form.slug} onChange={handleChange} />
          </div>
          <div>
            <label className={label}>URL da capa</label>
            <input className={input} name="coverImage" value={form.coverImage} onChange={handleChange} />
          </div>
          <div>
            <label className={label}>Tags (separadas por vírgula)</label>
            <input className={input} name="tags" value={form.tags} onChange={handleChange} placeholder="Node.js, React" />
          </div>
          <div className="flex items-center gap-2 pt-6">
            <input
              id="published"
              type="checkbox"
              name="published"
              checked={form.published}
              onChange={handleChange}
              className="w-4 h-4 accent-teal-500"
            />
            <label htmlFor="published" className="text-sm text-slate-300">
              Publicado (visível no blog público)
            </label>
          </div>
        </div>
        <div className="mt-4">
          <label className={label}>Resumo</label>
          <textarea className={textarea} name="summary" value={form.summary} onChange={handleChange} rows={2} required />
        </div>
        <div className="mt-4">
          <label className={label}>Conteúdo (markdown simples: # e ## para títulos, ``` para código)</label>
          <textarea className={textarea} name="content" value={form.content} onChange={handleChange} rows={10} required />
        </div>
        <div className="flex items-center gap-3 mt-6">
          <button type="submit" className={btnPrimary} disabled={saving}>
            {saving ? "Salvando..." : editingId ? "Salvar alterações" : "Criar artigo"}
          </button>
          {editingId && (
            <button type="button" className={btnSecondary} onClick={cancelEdit}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        <h3 className={sectionTitle}>Artigos</h3>
        {loading && <div className="text-teal-400 text-sm animate-pulse">Carregando...</div>}
        {!loading && posts.length === 0 && <div className="text-slate-400 text-sm">Nenhum artigo cadastrado.</div>}
        {posts.map((p) => (
          <div key={p.id} className={row}>
            <div>
              <p className="text-slate-100 font-semibold">
                {p.title}{" "}
                <span
                  className={`text-xs ml-2 px-2 py-0.5 rounded-full border ${
                    p.published
                      ? "text-teal-300 border-teal-500/40 bg-teal-950/40"
                      : "text-amber-300 border-amber-500/40 bg-amber-950/40"
                  }`}
                >
                  {p.published ? "publicado" : "rascunho"}
                </span>
              </p>
              <p className="text-slate-400 text-sm line-clamp-1">{p.summary}</p>
            </div>
            <div className="flex gap-2 shrink-0 flex-wrap">
              <button className={btnSecondary} onClick={() => togglePublished(p)}>
                {p.published ? "Despublicar" : "Publicar"}
              </button>
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

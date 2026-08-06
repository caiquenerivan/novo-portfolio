import { useEffect, useState } from "react";
import { Profile } from "@portfolio/shared-types";
import { infoService } from "../../../services/api";
import { card, input, textarea, label, btnPrimary, sectionTitle } from "../styles";

const EMPTY: Profile = {
  name: "",
  title: "",
  bio: "",
  about: "",
  avatarUrl: "",
  email: "",
  githubUrl: "",
  linkedinUrl: "",
  location: "",
  availableForHire: false,
};

export default function ProfileTab() {
  const [form, setForm] = useState<Profile>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    infoService
      .getProfile()
      .then((data) => setForm({ ...EMPTY, ...data }))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus("idle");
    try {
      const updated = await infoService.updateProfile(form);
      setForm({ ...EMPTY, ...updated });
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-teal-400 text-sm animate-pulse">Carregando perfil...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className={card}>
      <h3 className={sectionTitle}>Perfil</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={label}>Nome</label>
          <input className={input} name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label className={label}>Título</label>
          <input className={input} name="title" value={form.title} onChange={handleChange} required />
        </div>
        <div>
          <label className={label}>E-mail</label>
          <input className={input} type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label className={label}>Localização</label>
          <input className={input} name="location" value={form.location} onChange={handleChange} />
        </div>
        <div>
          <label className={label}>URL do avatar</label>
          <input className={input} name="avatarUrl" value={form.avatarUrl} onChange={handleChange} />
        </div>
        <div>
          <label className={label}>GitHub</label>
          <input className={input} name="githubUrl" value={form.githubUrl} onChange={handleChange} />
        </div>
        <div>
          <label className={label}>LinkedIn</label>
          <input className={input} name="linkedinUrl" value={form.linkedinUrl} onChange={handleChange} />
        </div>
        <div className="flex items-center gap-2 pt-6">
          <input
            id="availableForHire"
            type="checkbox"
            name="availableForHire"
            checked={form.availableForHire}
            onChange={handleChange}
            className="w-4 h-4 accent-teal-500"
          />
          <label htmlFor="availableForHire" className="text-sm text-slate-300">
            Disponível para trabalho
          </label>
        </div>
      </div>

      <div className="mt-4">
        <label className={label}>Bio (resumo curto)</label>
        <textarea className={textarea} name="bio" value={form.bio} onChange={handleChange} rows={2} />
      </div>
      <div className="mt-4">
        <label className={label}>Sobre (texto completo)</label>
        <textarea className={textarea} name="about" value={form.about} onChange={handleChange} rows={5} />
      </div>

      <div className="flex items-center gap-3 mt-6">
        <button type="submit" className={btnPrimary} disabled={saving}>
          {saving ? "Salvando..." : "Salvar alterações"}
        </button>
        {status === "success" && <span className="text-teal-400 text-sm">✓ Salvo com sucesso</span>}
        {status === "error" && <span className="text-red-400 text-sm">✗ Erro ao salvar</span>}
      </div>
    </form>
  );
}

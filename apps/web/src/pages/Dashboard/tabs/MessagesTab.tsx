import { useEffect, useState } from "react";
import { ContactMessage } from "@portfolio/shared-types";
import { infoService } from "../../../services/api";
import { btnSecondary, btnDanger, sectionTitle } from "../styles";

export default function MessagesTab() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => infoService.getMessages().then(setMessages).finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const toggleRead = async (m: ContactMessage) => {
    await infoService.markMessageRead(m.id, !m.read);
    await load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir esta mensagem?")) return;
    await infoService.deleteMessage(id);
    await load();
  };

  return (
    <div className="space-y-3">
      <h3 className={sectionTitle}>Mensagens de contato</h3>
      {loading && <div className="text-teal-400 text-sm animate-pulse">Carregando...</div>}
      {!loading && messages.length === 0 && <div className="text-slate-400 text-sm">Nenhuma mensagem recebida.</div>}
      {messages.map((m) => (
        <div
          key={m.id}
          className={`bg-slate-900/60 border rounded-xl p-4 space-y-2 ${
            m.read ? "border-slate-800" : "border-teal-500/40"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p className="text-slate-100 font-semibold">
                {m.name} <span className="text-slate-500 font-normal text-sm">&lt;{m.email}&gt;</span>
                {!m.read && (
                  <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-teal-500 text-slate-950 font-bold align-middle">
                    NOVA
                  </span>
                )}
              </p>
              <p className="text-teal-300 text-sm">{m.subject}</p>
            </div>
            <span className="text-slate-500 text-xs shrink-0">
              {new Date(m.createdAt).toLocaleString("pt-BR")}
            </span>
          </div>
          <p className="text-slate-300 text-sm whitespace-pre-wrap">{m.message}</p>
          <div className="flex gap-2 pt-1">
            <button className={btnSecondary} onClick={() => toggleRead(m)}>
              {m.read ? "Marcar como não lida" : "Marcar como lida"}
            </button>
            <button className={btnDanger} onClick={() => handleDelete(m.id)}>
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";
import { Tag } from "../../components/Tag";
import { useBlogPost } from "../../data/useBlogPosts";
import { FaArrowLeft, FaClock, FaCalendarAlt, FaUser } from "react-icons/fa";

export default function BlogPost() {
  const { slugOrId } = useParams<{ slugOrId: string }>();
  const { language } = useContext(LanguageContext);
  const { post, loading, error } = useBlogPost(slugOrId || "");

  return (
    <div className="flex flex-col min-h-screen w-full pl-16 justify-start max-w-screen-3xl my-9 3xl:pl-96 z-10 pr-6 sm:pr-12">
      <div className="flex flex-col px-4 pt-2 w-full">
        {/* Botão de Voltar ao Blog */}
        <div className="mb-4">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/80 hover:bg-teal-500/20 text-teal-400 hover:text-cyan-300 border border-teal-500/30 rounded-xl transition-all text-sm font-medium"
          >
            <FaArrowLeft />
            <span>
              {language === "pt" ? "Voltar ao Blog" : "Back to Blog"}
            </span>
          </Link>
        </div>

        <Tag>{"<article>"}</Tag>

        {loading && (
          <div className="text-teal-400 text-center py-20 text-lg font-medium animate-pulse">
            {language === "pt"
              ? "Carregando artigo..."
              : "Loading article..."}
          </div>
        )}

        {error && (
          <div className="bg-slate-900/80 border border-red-500/30 rounded-2xl p-8 text-center text-red-400 my-6">
            <h2 className="text-xl font-bold mb-2">{error}</h2>
            <Link
              to="/blog"
              className="inline-block mt-4 text-teal-400 hover:underline"
            >
              {language === "pt" ? "Ver todos os artigos" : "View all posts"}
            </Link>
          </div>
        )}

        {post && !loading && (
          <div className="w-full max-w-4xl mx-auto my-4 space-y-6">
            {/* Header do Artigo */}
            <div className="space-y-4">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {post.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold uppercase tracking-wider bg-teal-950/70 text-cyan-300 border border-teal-500/40 px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Título Principal */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-100 londrina-solid-regular leading-tight">
                {post.title}
              </h1>

              {/* Meta Informações */}
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300 border-b border-slate-800 pb-6">
                <div className="flex items-center gap-2">
                  <FaUser className="text-teal-400" />
                  <span className="font-semibold text-slate-200">
                    Caique Nerivan
                  </span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <FaCalendarAlt className="text-teal-500" />
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString(
                      language === "pt" ? "pt-BR" : "en-US",
                      { month: "long", day: "numeric", year: "numeric" }
                    )}
                  </span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <FaClock className="text-cyan-400" />
                  <span>{post.readTimeMinutes} min de leitura</span>
                </div>
              </div>
            </div>

            {/* Imagem de Capa em Destaque */}
            {post.coverImage && (
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-teal-500/30 max-h-[450px]">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Resumo Destacado */}
            {post.summary && (
              <div className="bg-slate-900/90 border-l-4 border-teal-400 p-4 sm:p-6 rounded-r-2xl text-slate-200 italic open-sans-regular text-lg leading-relaxed shadow-lg">
                "{post.summary}"
              </div>
            )}

            {/* Conteúdo do Artigo */}
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 sm:p-10 space-y-6 text-slate-200 open-sans-regular leading-relaxed text-base sm:text-lg">
              {post.content.split("\n\n").map((paragraph, index) => {
                const trimmed = paragraph.trim();
                if (!trimmed) return null;

                if (trimmed.startsWith("# ")) {
                  return (
                    <h1
                      key={index}
                      className="text-2xl sm:text-3xl font-bold text-teal-300 londrina-solid-regular pt-4 border-b border-slate-800 pb-2"
                    >
                      {trimmed.replace("# ", "")}
                    </h1>
                  );
                }

                if (trimmed.startsWith("## ")) {
                  return (
                    <h2
                      key={index}
                      className="text-xl sm:text-2xl font-bold text-cyan-300 londrina-solid-regular pt-4"
                    >
                      {trimmed.replace("## ", "")}
                    </h2>
                  );
                }

                if (trimmed.startsWith("```")) {
                  const codeLines = trimmed.split("\n");
                  const codeContent = codeLines.slice(1, -1).join("\n");
                  return (
                    <pre
                      key={index}
                      className="bg-slate-950 border border-teal-500/30 rounded-xl p-4 overflow-x-auto text-sm font-mono text-teal-300 my-4"
                    >
                      <code>{codeContent || trimmed.replace(/```[a-z]*/g, "")}</code>
                    </pre>
                  );
                }

                return (
                  <p key={index} className="text-slate-300 leading-relaxed">
                    {trimmed}
                  </p>
                );
              })}
            </div>

            {/* Navegação Inferior */}
            <div className="pt-6 border-t border-slate-800 flex justify-between items-center">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-500/10 hover:bg-teal-500 text-teal-400 hover:text-slate-950 border border-teal-500/40 rounded-xl font-bold transition-all"
              >
                <FaArrowLeft />
                <span>
                  {language === "pt"
                    ? "Voltar para o Blog"
                    : "Back to Blog"}
                </span>
              </Link>
            </div>
          </div>
        )}

        <Tag>{"</article>"}</Tag>
      </div>
    </div>
  );
}

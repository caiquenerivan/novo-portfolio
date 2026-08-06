import { useContext, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";
import { Tag } from "../../components/Tag";
import { Title } from "../../components/Title";
import { useBlogPosts } from "../../data/useBlogPosts";
import { FaSearch, FaClock, FaCalendarAlt, FaArrowRight } from "react-icons/fa";

export default function Blog() {
  const { language } = useContext(LanguageContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const { posts, loading, error } = useBlogPosts();

  // Extrai todas as tags únicas dos artigos
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    posts.forEach((p) => p.tags?.forEach((t) => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, [posts]);

  // Filtra posts localmente por busca e tag selecionada
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag ? post.tags?.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  return (
    <div className="flex flex-col min-h-screen w-full pl-16 justify-start max-w-screen-3xl my-9 3xl:pl-96 z-10 pr-6 sm:pr-12">
      <div className="flex flex-col px-4 pt-2 w-full">
        <Tag>{"<h2>"}</Tag>
        <div className="flex flex-col w-full px-4">
          <div className="lg:flex">
            <div className="w-full">
              <Title>
                <span className={language === "pt" ? "" : "hidden"}>
                  Blog & Artigos
                </span>
                <span className={language === "en" ? "" : "hidden"}>
                  Blog & Articles
                </span>
              </Title>
            </div>
          </div>
        </div>
        <Tag>{"</h2>"}</Tag>

        <Tag>{"<p>"}</Tag>
        <p className="px-4 py-1 text-slate-200 josefin-slab-regular text-lg sm:text-xl">
          {language === "pt"
            ? "Artigos sobre desenvolvimento full-stack, arquitetura de software e design de interfaces."
            : "Articles on full-stack development, software architecture, and UI/UX design."}
        </p>
        <Tag>{"</p>"}</Tag>

        <Tag>{"<section>"}</Tag>
        <div className="w-full px-4 my-6 space-y-6">
          {/* Barra de Busca e Filtros de Tags */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-slate-900/70 border border-teal-500/30 rounded-2xl p-4 backdrop-blur-md">
            {/* Campo de Busca */}
            <div className="relative flex-1">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-teal-400" />
              <input
                type="text"
                placeholder={
                  language === "pt"
                    ? "Buscar artigos..."
                    : "Search articles..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-700 focus:border-cyan-400 rounded-xl pl-10 pr-4 py-2.5 text-slate-100 placeholder-slate-400 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
              />
            </div>

            {/* Filtros de Tags */}
            {allTags.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                    selectedTag === null
                      ? "bg-teal-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(45,212,191,0.5)]"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
                  }`}
                >
                  {language === "pt" ? "Todos" : "All"}
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() =>
                      setSelectedTag(selectedTag === tag ? null : tag)
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-all whitespace-nowrap ${
                      selectedTag === tag
                        ? "bg-cyan-400 text-slate-950 font-bold shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                        : "bg-slate-800/80 text-teal-300 hover:bg-slate-800 border border-teal-500/30"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Estado de Carregamento / Erro */}
          {loading && (
            <div className="text-teal-400 text-center py-12 text-lg font-medium animate-pulse">
              {language === "pt"
                ? "Carregando artigos..."
                : "Loading articles..."}
            </div>
          )}

          {error && (
            <div className="text-red-400 text-center py-12 text-lg">
              {error}
            </div>
          )}

          {/* Grid de Artigos */}
          {!loading && !error && (
            <>
              {filteredPosts.length === 0 ? (
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
                  <p className="text-lg">
                    {language === "pt"
                      ? "Nenhum artigo encontrado."
                      : "No articles found."}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.map((post) => (
                    <article
                      key={post.id}
                      className="bg-slate-900/80 backdrop-blur-md border border-teal-500/30 hover:border-cyan-400/80 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xl hover:shadow-[0_0_20px_rgba(45,212,191,0.2)] hover:-translate-y-1 transition-all duration-300 group"
                    >
                      {/* Imagem de Capa */}
                      <div className="relative h-48 overflow-hidden bg-slate-950">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-sm border border-teal-500/40 text-teal-300 text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 font-medium">
                          <FaClock className="text-cyan-400" />
                          <span>{post.readTimeMinutes} min</span>
                        </div>
                      </div>

                      {/* Conteúdo do Card */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {post.tags?.map((t) => (
                              <span
                                key={t}
                                className="text-[10px] font-semibold uppercase tracking-wider bg-teal-950/60 text-teal-300 border border-teal-500/30 px-2 py-0.5 rounded-md"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          {/* Título */}
                          <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-300 londrina-solid-regular mb-2 line-clamp-2 transition-colors">
                            {post.title}
                          </h3>

                          {/* Resumo */}
                          <p className="text-slate-300 text-sm open-sans-regular line-clamp-3 mb-4 leading-relaxed">
                            {post.summary}
                          </p>
                        </div>

                        {/* Footer do Card com Data e Link */}
                        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-1.5 text-xs text-slate-400">
                            <FaCalendarAlt className="text-teal-500" />
                            <span>
                              {new Date(post.publishedAt).toLocaleDateString(
                                language === "pt" ? "pt-BR" : "en-US",
                                { month: "short", day: "numeric", year: "numeric" }
                              )}
                            </span>
                          </div>

                          <Link
                            to={`/blog/${post.slug || post.id}`}
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all"
                          >
                            <span>
                              {language === "pt" ? "Ler Artigo" : "Read Post"}
                            </span>
                            <FaArrowRight size={10} />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        <Tag>{"</section>"}</Tag>
      </div>
    </div>
  );
}

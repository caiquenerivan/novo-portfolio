import { useContext, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { Title } from "../../components/Title";
import { Tag } from "../../components/Tag";
import { infoService } from "../../services/api";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type SubmitStatus = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const { language } = useContext(LanguageContext);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");

    try {
      await infoService.sendContactMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || "Mensagem do Portfólio",
        message: formData.message,
      });
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full pl-16 justify-center max-w-screen-3xl  3xl:pl-96 z-10">
      <div className="px-8">
        <Tag>{"<h2>"}</Tag>

        <div className="flex flex-col w-full px-4">
          <div className="lg:flex">
            <Title>
              <span className={`${language === "pt" ? "" : "hidden"}`}>
                Fale Comigo
              </span>
              <span className={`${language === "en" ? "" : "hidden"}`}>
                Contact Me
              </span>
            </Title>
          </div>
        </div>
        <Tag>{"</h2>"}</Tag>

        <Tag>{"<p>"}</Tag>
        <div className="w-full flex flex-col pr-6 lg:flex-row">
          <div className="w-full">
            <p
              className={`${
                language === "pt" ? "" : "hidden"
              } px-4 py-1 text-stone-50 open-sans-regular text-justify text-sm sm:text-xl mxl:text-3xl`}
            >
              Vamos Criar Algo Incrível Juntos! <br />
              Você pode me enviar mensagem pelo formulário ou através do <br />
              <a
                href="https://wa.me/5511956540311"
                target="_blank"
                rel="noreferrer"
                className="text-teal-600 italic neon-teal-hover hover:text-teal-400"
              >
                WhatsApp
              </a>{" "}
              ou{" "}
              <a
                href="https://t.me/caiquenerivan"
                target="_blank"
                rel="noreferrer"
                className="text-teal-600 italic neon-teal-hover hover:text-teal-400"
              >
                Telegram
              </a>
            </p>
            <p
              className={`${
                language === "en" ? "" : "hidden"
              }  px-4 py-1 text-stone-50 open-sans-regular text-justify text-sm sm:text-xl mxl:text-3xl`}
            >
              Let's Create Something Amazing Together! <br />
              You can send me a message through the form or via <br />
              <a
                href="https://wa.me/5511956540311"
                target="_blank"
                rel="noreferrer"
                className="text-teal-600 italic neon-teal-hover hover:text-teal-400"
              >
                WhatsApp
              </a>{" "}
              or{" "}
              <a
                href="https://t.me/caiquenerivan"
                target="_blank"
                rel="noreferrer"
                className="text-teal-600 italic neon-teal-hover hover:text-teal-400"
              >
                Telegram
              </a>
            </p>
          </div>
        </div>
        <Tag>{"</p>"}</Tag>
        <Tag>{"<form>"}</Tag>

        <div className="w-full flex flex-col px-6 lg:flex-row">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="w-full pr-6">
              <input
                type="text"
                name="name"
                placeholder={`${language === "en" ? "Type your name..." : "Digite seu Nome"}`}
                value={formData.name}
                onChange={handleChange}
                className="w-full my-2 bg-transparent border-b-2 border-teal-700 px-2 py-1 text-stone-50 lg:text-2xl lg:h-12 mxl:text-3xl"
                required
                disabled={status === "sending"}
              />
              <input
                type="email"
                name="email"
                placeholder={`${language === "en" ? "Type your email..." : "Digite seu email"}`}
                value={formData.email}
                onChange={handleChange}
                className="w-full my-2 bg-transparent border-b-2 border-teal-700 px-2 py-1 text-stone-50 lg:text-2xl lg:h-12 mxl:text-3xl"
                required
                disabled={status === "sending"}
              />
              <input
                type="tel"
                name="phone"
                placeholder={`${language === "en" ? "Type your phone number..." : "Digite seu telefone"}`}
                value={formData.phone}
                onChange={handleChange}
                className="w-full my-2 bg-transparent border-b-2 border-teal-700 px-2 py-1 text-stone-50 lg:text-2xl lg:h-12 mxl:text-3xl"
                disabled={status === "sending"}
              />
              <input
                name="subject"
                placeholder={`${language === "en" ? "Enter the subject..." : "Digite o assunto"}`}
                value={formData.subject}
                onChange={handleChange}
                className="w-full my-2 bg-transparent border-b-2 border-teal-700 px-2 py-1 text-stone-50 lg:text-2xl lg:h-12 mxl:text-3xl"
                disabled={status === "sending"}
              />
              <textarea
                name="message"
                placeholder={`${language === "en" ? "Type your message... " : "Digite sua mensagem..."}`}
                value={formData.message}
                onChange={handleChange}
                className="w-full h-20 my-2 bg-transparent border-2 border-teal-700 rounded-md px-2 flex text-stone-50 lg:text-2xl lg:p-2 lg:h-24 mxl:text-3xl mxl:h-40 mxl:p-4"
                required
                disabled={status === "sending"}
              />
            </div>

            {status === "success" && (
              <p className="px-4 py-2 text-teal-400 open-sans-regular text-sm sm:text-base">
                {language === "en" ? "✓ Message sent successfully!" : "✓ Mensagem enviada com sucesso!"}
              </p>
            )}
            {status === "error" && (
              <p className="px-4 py-2 text-red-400 open-sans-regular text-sm sm:text-base">
                {language === "en" ? "✗ Error sending message. Please try again." : "✗ Erro ao enviar. Tente novamente."}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="my-2 border-2 border-teal-700 rounded-2xl hover:bg-teal-700 text-gray-700 lg:text-2xl lg:h-12 mxl:text-3xl disabled:opacity-50"
            >
              <p className={`${language === "en" ? "" : "hidden"} uppercase text-teal-700 w-full px-4 py-1 hover:text-gray-700`}>
                {status === "sending" ? "Sending..." : "Send"}
              </p>
              <p className={`${language === "pt" ? "" : "hidden"} uppercase text-teal-700 w-full px-4 py-1 hover:text-gray-700`}>
                {status === "sending" ? "Enviando..." : "Enviar"}
              </p>
            </button>
          </form>
        </div>
        <Tag>{"</form>"}</Tag>
      </div>
    </div>
  );
}

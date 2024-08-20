import { useContext, useState } from "react";
import Tags from "../../data/tags";
import { LanguageContext } from "../../context/LanguageContext";
import { Title } from "../../components/Title";
import { Tag } from "../../components/Tag";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const { language } = useContext(LanguageContext);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Dados do formulário:", formData);
    // Aqui você pode adicionar a lógica para enviar os dados, por exemplo, para uma API
  };

  return (
    <div className="flex flex-col min-h-screen w-full pl-16 justify-center max-w-screen-3xl">
      <div className="px-8">
        <Tag>{Tags.abrirH2}</Tag>

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
        <Tag>{Tags.fecharH2}</Tag>
        <Tag>{Tags.abrirP}</Tag>
        <div className="w-full flex flex-col pr-6 lg:flex-row">
          <div className="w-full">
            <p
              className={`${
                language === "pt" ? "" : "hidden"
              } px-4 py-1 text-stone-50 open-sans-regular text-justify text-sm sm:text-xl mxl:text-3xl`}
            >
              Vamos Criar Algo Incrível Juntos!
            </p>
            <p
              className={`${
                language === "en" ? "" : "hidden"
              }  px-4 py-1 text-stone-50 open-sans-regular text-justify text-sm sm:text-md mxl:text-3xl`}
            >
              Let's Create Something Amazing Together!
            </p>
          </div>
        </div>
        <Tag>{Tags.fecharP}</Tag>
        <Tag>{Tags.abrirForm}</Tag>

        <div className="w-full flex flex-col px-6 lg:flex-row">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="w-full pr-6">
              <input
                type="text"
                name="name"
                placeholder={`${
                  language === "en" ? "Type your name..." : "Digite seu Nome"
                }`}
                value={formData.name}
                onChange={handleChange}
                className="w-full my-2 bg-transparent border-b-2 border-teal-700 px-2 py-1 text-stone-50 lg:text-2xl lg:h-12 mxl:text-3xl"
                required
              />
              <input
                type="email"
                name="email"
                placeholder={`${
                  language === "en" ? "Type your email..." : "Digite seu email"
                }`}
                value={formData.email}
                onChange={handleChange}
                className="w-full my-2 bg-transparent border-b-2 border-teal-700 px-2 py-1 text-stone-50 lg:text-2xl lg:h-12 mxl:text-3xl"
                required
              />
              <input
                type="number"
                name="phone"
                placeholder={`${
                  language === "en"
                    ? "Type your phone number..."
                    : "Digite seu telefone"
                }`}
                value={formData.phone}
                onChange={handleChange}
                className="w-full my-2 bg-transparent border-b-2 border-teal-700 px-2 py-1 text-stone-50 lg:text-2xl lg:h-12 mxl:text-3xl "
                required
              />
              <input
                name="subject"
                placeholder={`${
                  language === "en"
                    ? "Enter the subject..."
                    : "Digite o assunto"
                }`}
                value={formData.subject}
                onChange={handleChange}
                className="w-full my-2 bg-transparent border-b-2 border-teal-700 px-2 py-1 text-stone-50 lg:text-2xl lg:h-12 mxl:text-3xl"
                required
              />
              <textarea
                name="message"
                placeholder={`${
                  language === "en"
                    ? "Type your message... "
                    : "Digite sua mensagem..."
                }`}
                value={formData.message}
                onChange={handleChange}
                className="w-full h-20 my-2 bg-transparent border-2 border-teal-700 rounded-md px-2 flex text-stone-50 lg:text-2xl lg:p-2 lg:h-24 mxl:text-3xl mxl:h-40 mxl:p-4"
                required
              />
            </div>
            <button
              type="submit"
              className="my-2 border-2 border-teal-700 rounded-2xl hover:bg-teal-700 text-gray-700 lg:text-2xl lg:h-12 mxl:text-3xl" 
            >
              <p
                className={`${
                  language === "en" ? "" : "hidden"
                } uppercase text-teal-700 w-full px-4 py-1 hover:text-gray-700`}
              >
                Send
              </p>
              <p
                className={`${
                  language === "pt" ? "" : "hidden"
                } uppercase text-teal-700 w-full px-4 py-1  hover:text-gray-700`}
              >
                Enviar
              </p>
            </button>
          </form>
        </div>
        <Tag>{Tags.fecharForm}</Tag>
      </div>
    </div>
  );
}

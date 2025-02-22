import { useContext, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { Title } from "../../components/Title";
import { useForm } from "react-hook-form";
import { login } from "../../services/auth";
import { AxiosError } from "axios";

interface FormLoginData {
  username: string;
  password: string;
}

const Login = () => {
  const { language } = useContext(LanguageContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLoginData>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: FormLoginData) => {
    try {
      const response = await login(data);

      localStorage.setItem("token", response.token);
      alert("Login bem sucedido!");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      setErrorMessage(axiosError.message || "Falha ao fazer login");
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full pl-16 justify-center items-center max-w-screen-3xl my-9 3xl:pl-96 z-10">
      <div className="w-full justify-center items-center flex-col px-6 lg:flex-row">
        <div className="flex mb-4 flex-col justify-center items-center">
          <Title>Login</Title>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col justify-center items-center"
        >
          <div className="mb-4 w-2/4 pr-6">
            <input
              type="text"
              placeholder={`${
                language == "en" ? "Type your username" : "Digite seu username"
              }`}
              className="w-full my-2 bg-transparent border-b-2 border-teal-700 px-2 py-1 text-stone-50 lg:text-2xl lg:h-12 mxl:text-3xl"
              {...register("username", {
                required: `${
                  language == "en"
                    ? "Username is required"
                    : "Username é obrigatório"
                }`,
              })}
            />
            {errors.username && (
              <p style={{ color: "red" }}>{errors.username.message}</p>
            )}
            <input
              type="password"
              placeholder={`${
                language == "en" ? "Type your password" : "Digite sua senha"
              }`}
              className="w-full my-2 bg-transparent border-b-2 border-teal-700 px-2 py-1 text-stone-50 lg:text-2xl lg:h-12 mxl:text-3xl"
              {...register("password", {
                required: `${
                  language == "en"
                    ? "Password is required"
                    : "Senha é obrigatória"
                }`,
              })}
            />
            {errors.password && (
              <p style={{ color: "red" }}>
                {errors.password.message}
              </p>
            )}
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
    </div>
  );
};

export default Login;

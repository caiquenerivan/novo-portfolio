import { useContext, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { Title } from "../../components/Title";
import { useForm } from "react-hook-form";
import { login } from "../../services/auth";
import { AxiosError } from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"; // Importe o contexto de autenticação

interface FormLoginData {
  username: string;
  password: string;
}

interface LocationState {
  from: {
    pathname: string;
  };
}

const Login = () => {
  const { language } = useContext(LanguageContext);
  const { login: authLogin } = useAuth(); // Use o hook de autenticação
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLoginData>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Obtenha a rota de origem ou use '/dashboard' como padrão
  const from = (location.state as LocationState)?.from?.pathname || "/dashboard";

  const onSubmit = async (data: FormLoginData) => {
    try {
      const response = await login(data);
      
      // Armazene o token no localStorage
      localStorage.setItem("token", response.token);
      
      // Atualize o estado de autenticação
      authLogin({
        id: response.user.id, // Supondo que a resposta inclua dados do usuário
        username: data.username
      });

      // Redirecione para a rota de origem
      navigate(from, { replace: true });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      setErrorMessage(
        axiosError.response?.data?.message || 
        (language === "en" ? `Login failed ${axiosError}` : "Falha no login")
      );
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
              <p style={{ color: "red" }}>{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="my-2 border-2 border-teal-700 rounded-2xl hover:bg-teal-700 text-gray-700 lg:text-2xl lg:h-12 mxl:text-3xl"
          >
            <span
              className={`uppercase text-teal-700 w-full px-4 py-1 hover:text-gray-700`}
            >
              {`${language === "en" ? "Send" : "Enviar"} `}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

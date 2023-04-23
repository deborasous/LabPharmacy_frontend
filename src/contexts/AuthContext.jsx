import { createContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

//instanciar validação
const schema = yup.object().shape({
  email: yup.string().email().required("Campo obrigatório"),
  password: yup
    .string()
    .required("Campo obrigatório")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Senha deve conter no mínimo 8 caracteres e uma letra"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Senhas devem ser iguais")
    .required("Confirme a senha"),
});

//**Provider Camponent */
export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [navbar, setNavbar] = useState(false);
  const [isLogged, setIsLogged] = useState();
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  //login

  const submitLogin = async () => {
    try {
      const localStoreUser = localStorage.getItem("user");
      const { email: localStoretEmail, password: localStorePassword } =
        JSON.parse(localStoreUser);

      if (email === localStoretEmail && password === localStorePassword) {
        const user = { email: localStoretEmail }; // Dados do usuário autenticado
        setAuth({ isAuthenticated: true, user }); // Atualiza o estado de autenticação
        setIsLogged(true); // Altera a variável isLogged para true
        navigate("/");
      }
      // if (email === localStoretEmail && password === localStorePassword) {
      //   navigate("/");
      // }

      if (!localStoreUser) {
        toast.warning("Usuário não cadastrado");
      }

      if (email !== localStoretEmail || password !== localStorePassword) {
        toast.warning("E-mail ou senha inválidos");
      }
    } catch (error) {
      toast.warning("Usuário não autenticado", error);
    }
  };

  //cadastrar

  const submitRegisterUser = async () => {
    try {
      await schema.validate({ userName, email, password, confirmPassword });
      const user = {
        userName,
        email,
        password,
      };

      localStorage.setItem("user", JSON.stringify(user));

      navigate("/entrar");
      toast.success("Usuário cadastrado com sucesso");

      console.log("Usuário cadastrado com sucesso");
    } catch (error) {
      toast.warning("Vixi, algo de errado não está certo", error);
    }
  };

  const contextValues = {
    email,
    setEmail,
    password,
    setPassword,
    userName,
    setUserName,
    confirmPassword,
    setConfirmPassword,
    submitLogin,
    register,
    handleSubmit,
    errors,
    submitRegisterUser,
    auth,
    setAuth,
    navbar,
    setNavbar,
    isLogged,
    setIsLogged,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

import { createContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

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
});

//**Provider component */
export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const submitLogin = async () => {
    try {
      const localStoreUser = localStorage.getItem("user");
      const { email: localStoretEmail, password: localStorePassword } =
        JSON.parse(localStoreUser);

      if (email === localStoretEmail && password === localStorePassword) {
        navigate("/");
      }

      if (!localStoreUser) {
        throw new Error("Usuário não cadastrado");
      }

      if (email !== localStoretEmail || password !== localStorePassword) {
        throw new Error("Credenciais inválidas");
      }
    } catch (error) {
      console.log("Usuário não autenticado", error);
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
  };
  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

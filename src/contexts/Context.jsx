import { createContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

//instanciar validação
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Digite um e-mail válido")
    .required("Campo obrigatório")
    .test("email-existe", "E-mail não cadastrado", (value) => {
      const userEmail = "front.sous@gmail.com";
      // const userEmail = localStorage.getItem("email");
      return value === userEmail;
    }),
  password: yup
    .string()
    .required("Campo obrigatório")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Senha deve conter no mínimo 8 caracteres e uma letra"
    )
    .test("senha-correta", "Senha incorreta", (value) => {
      const userPassword = "g25252525";
      // const userPassword = localStorage.getItem("password");
      return value === userPassword;
    }),
});

//**Provider component */
export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const handleOnSubmit = (data) => {
    console.log(data.email, data.password);
    //**remover depois que configurar o localStorage */
    const userEmail = "front.sous@gmail.com";
    const userPassword = "g25252525";

    //trocar userEmail e userPassword depois de criar a página de cadastro de uruario
    //localStorage.getItem("email");
    // localStorage.getItem("password");

    if (data.email === userEmail && data.password === userPassword) {
      navigate("/");
    }
  };

  const contextValues = {
    email,
    setEmail,
    password,
    setPassword,
    handleOnSubmit,
    register,
    handleSubmit,
    errors,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};

import { createContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const UserContext = createContext();

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleOnSubmit = (data) => {
    console.log(data.email, data.password);
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

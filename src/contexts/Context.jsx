import { createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const AuthContext = createContext();

//instanciar validação
const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup
    .string()
    .email("Digite um e-mail válido")
    .required("Campo obrigatório"),
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

//**Provider component */
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [listUser, setListUser] = useState([]);

  console.log(user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const submitLogin = (data) => {
    const userEmail = localStorage.getItem("email");
    const userPassword = localStorage.getItem("password");
    console.log(userEmail, userPassword);

    if (data.email === userEmail && data.password === userPassword) {
      navigate("/");
    }
  };

  const submitRegisterUser = async () => {
    const { userName, email, password, confirmPassword } = user;

    try {
      await schema.validate({ userName, email, password, confirmPassword });
      setListUser([...listUser, user]);
      navigate("/entrar");

      console.log("Usuário cadastrado com sucesso");
    } catch (error) {
      console.log("Vixi, algo de errado não está certo", error);
    }
  };

  const handleChange = (event, fieldName) => {
    const { value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  //carrega lista de usuarios
  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      setListUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  //???
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(listUser));
  }, [listUser]);

  const contextValues = {
    user,
    setUser,
    submitLogin,
    handleChange,
    submitRegisterUser,
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

import { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { AuthContext } from "../contexts/Context";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  userName: yup.string().required("Nome é obrigatório"),
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

export const RegisterUser = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    userName,
    setUserName,
    confirmPassword,
    setConfirmPassword,
    register,
    handleSubmit,
    errors,
  } = useContext(AuthContext);

  const navigate = useNavigate();

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

      console.log("Usuário cadastrado com sucesso");
    } catch (error) {
      console.log("Vixi, algo de errado não está certo", error);
    }
  };

  return (
    <section className="py-28">
      <h1 className="text-center mb-5">Cadastrar</h1>
      <Form
        onSubmit={handleSubmit(submitRegisterUser)}
        className="block max-w-lg m-auto p-8 border-1 border-gray-100 rounded-lg shadow-md shadow-slate-300 bg-gray-100"
      >
        <Form.Group
          className="grid mb-5 text-neutral-500"
          controlId="registerUserName"
        >
          <Form.Label className="mb-1">Nome:</Form.Label>
          <Form.Control
            className="w-full rounded border-1 border-gray-400 p-3 outline-none"
            type="text"
            placeholder="Digite seu Nome"
            name="userName"
            {...register("userName", { required: true })}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          {errors.userName && (
            <p className="text-red-500">{errors.userName?.message}</p>
          )}
        </Form.Group>

        <Form.Group
          className="grid mb-5 text-neutral-500"
          controlId="registerEmail"
        >
          <Form.Label className="mb-1">E-mail:</Form.Label>
          <Form.Control
            className="w-full rounded border-1 border-gray-400 p-3 outline-none"
            type="email"
            placeholder="Digite seu e-mail"
            name="email"
            {...register("email", { required: true })}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}
        </Form.Group>

        <Form.Group
          className="grid mb-5 text-neutral-500"
          controlId="registerPassword"
        >
          <Form.Label className="mb-1">Senha:</Form.Label>
          <Form.Control
            className="w-full rounded border-1 border-gray-400 p-3 outline-none "
            type="password"
            placeholder="********"
            name="password"
            {...register("password", { required: true })}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password?.message}</p>
          )}
        </Form.Group>

        <Form.Group
          className="grid mb-5 text-neutral-500"
          controlId="registerPasswordConfirm"
        >
          <Form.Label className="mb-1">Confirmar senha:</Form.Label>
          <Form.Control
            className="w-full rounded border-1 border-gray-400 p-3 outline-none"
            type="password"
            placeholder="********"
            name="confirmPassword"
            {...register("confirmPassword", { required: true })}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </Form.Group>

        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-500 text-neutral-100 font-semibold text-lg  rounded-lg px-10 py-3"
        >
          Cadastrar
        </Button>
        <Link
          to="/entrar"
          className="flex mt-5 text-sm text-indigo-500 font-medium cursor-pointer"
        >
          Voltar para Login
        </Link>
      </Form>
    </section>
  );
};

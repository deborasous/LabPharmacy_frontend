import { useContext } from "react";
import { Button, ToastContainer } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    submitLogin,
    register,
    handleSubmit,
    errors,
  } = useContext(AuthContext);

  return (
    <section className="container m-auto my-12">
      <h1 className="text-4xl text-center text-neutral-600 mb-6">Entrar</h1>
      <Form
        onSubmit={handleSubmit(submitLogin)}
        className="max-w-600 m-auto p-10 border-2 border-gray-100 rounded-lg shadow-md shadow-slate-300 bg-gray-100"
      >
        <ToastContainer />
        <Form.Group
          className="grid mb-5 text-neutral-500"
          controlId="formBasicEmail"
        >
          <Form.Label className="mb-1 text-lg">E-mail</Form.Label>
          <Form.Control
            className="w-full rounded border-2 border-gray-400 p-3 outline-none max-h-50"
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
          className="grid mb-4 text-neutral-500"
          controlId="formBasicPassword"
        >
          <Form.Label className="mb-1 text-lg">Senha</Form.Label>
          <Form.Control
            className="w-full rounded border-2 border-gray-400 p-3 outline-none max-h-50 "
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

        <div className="flex w-full m-auto justify-between mb-10">
          <Link
            to="#"
            className="text-base text-indigo-500 font-medium cursor-pointer"
          >
            Esqueceu a senha?
          </Link>
          <Link
            to="/cadastrar-usuario"
            className="text-base text-indigo-500 font-medium cursor-pointer"
          >
            Criar conta
          </Link>
        </div>
        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-500 text-neutral-100 font-semibold text-lg  rounded-lg px-10 py-3"
        >
          Enviar
        </Button>
      </Form>
    </section>
  );
};

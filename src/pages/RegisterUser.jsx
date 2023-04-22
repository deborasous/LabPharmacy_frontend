import { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

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
    submitRegisterUser,
  } = useContext(AuthContext);

  return (
    <section className="container m-auto my-12">
      <h1 className="text-4xl text-center text-neutral-600 mb-6">Cadastrar</h1>
      <Form
        onSubmit={handleSubmit(submitRegisterUser)}
        className="max-w-600 m-auto p-10 border-2 border-gray-100 rounded-lg shadow-md shadow-slate-300 bg-gray-100"
      >
        <ToastContainer />
        <Form.Group
          className="grid mb-5 text-neutral-500"
          controlId="registerUserName"
        >
          <Form.Label className="mb-1 text-lg">Nome:</Form.Label>
          <Form.Control
            className="w-full rounded border-2 border-gray-400 p-3 outline-none max-h-50"
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
          <Form.Label className="mb-1 text-lg">E-mail:</Form.Label>
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
          className="grid mb-5 text-neutral-500"
          controlId="registerPassword"
        >
          <Form.Label className="mb-1 text-lg">Senha:</Form.Label>
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

        <Form.Group
          className="grid mb-5 text-neutral-500"
          controlId="registerPasswordConfirm"
        >
          <Form.Label className="mb-1 text-lg">Confirmar senha:</Form.Label>
          <Form.Control
            className="w-full rounded border-2 border-gray-400 p-3 outline-none max-h-50"
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

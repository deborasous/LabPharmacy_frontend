import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { UserContext } from "../contexts/Context";

export const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleOnSubmit,
    register,
    handleSubmit,
    errors,
  } = useContext(UserContext);

  return (
    <section className="py-28">
      <Form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="block max-w-lg m-auto p-8 border-2 border-gray-100 rounded-lg shadow-md shadow-slate-300 bg-gray-100"
      >
        <Form.Group
          className="grid mb-5 text-neutral-500"
          controlId="formBasicEmail"
        >
          <Form.Label className="mb-1">E-mail</Form.Label>
          <Form.Control
            className="w-full rounded border-2 border-gray-400 p-3 outline-none"
            type="email"
            placeholder="Digite seu e-mail"
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
          <Form.Label className="mb-1">Senha</Form.Label>
          <Form.Control
            className="w-full rounded border-2 border-gray-400 p-3 outline-none "
            type="password"
            placeholder="********"
            {...register("password", { required: true })}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password?.message}</p>
          )}
        </Form.Group>

        <div className="flex w-full m-auto justify-between pb-6">
          <a
            to="#"
            className="text-sm text-indigo-500 font-medium cursor-pointer"
          >
            Esqueceu a senha?
          </a>
          <a
            to="#"
            className="text-sm text-indigo-500 font-medium cursor-pointer"
          >
            Criar conta
          </a>
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

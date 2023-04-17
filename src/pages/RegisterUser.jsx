import { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { AuthContext } from "../contexts/Context";

export const RegisterUser = () => {
  const {
    user,
    handleChange,
    inputName,
    inputEmail,
    sendUsers,
    submitRegisterUser,
    register,
    handleSubmit,
    errors,
  } = useContext(AuthContext);

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
            ref={inputName}
            {...register("userName", { required: true })}
            value={user.userName}
            onChange={(event) => handleChange(event, "userName")}
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
            ref={inputEmail}
            {...register("email", { required: true })}
            value={user.email}
            onChange={(event) => handleChange(event, "email")}
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
            value={user.password}
            onChange={(event) => handleChange(event, "password")}
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
            value={user.confirmPassword}
            onChange={(event) => handleChange(event, "confirmPassword")}
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
      </Form>
    </section>
  );
};

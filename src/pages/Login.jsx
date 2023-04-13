import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const Login = () => {
  //instanciar vallidação
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

  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleSubmit = ({ email, password }) => {
    //enviar para o localStorage
    console.log(email, password);
  };

  return (
    <section className="py-28">
      <Form
        onSubmit={onSubmit(handleSubmit)}
        className="block max-w-lg m-auto p-8 border-2 border-gray-100 rounded-lg shadow-md shadow-slate-300 bg-gray-100"
      >
        <Form.Group
          className="grid mb-5 text-neutral-500"
          controlId="formBasicEmail"
        >
          <Form.Label className="mb-1">E-mail</Form.Label>
          <Form.Control
            className="w-full rounded border-2 border-gray-400 p-3 outline-none"
            {...register("email", { required: true })}
            type="email"
            placeholder="Digite seu e-mail"
          />
          {errors.email && <p>{errors.email?.message}</p>}
        </Form.Group>
        <Form.Group
          className="grid mb-4 text-neutral-500"
          controlId="formBasicPassword"
        >
          <Form.Label className="mb-1">Senha</Form.Label>
          <Form.Control
            className="w-full rounded border-2 border-gray-400 p-3 outline-none "
            {...register("password", { required: true })}
            type="password"
            placeholder="********"
          />
          {errors.password && <p>{errors.password?.message}</p>}
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

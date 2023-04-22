import React from "react";
import { Link, useNavigate } from "react-router-dom";

//import image Error
import ImageError from "../assets/images/ImageError.svg";

export const Error = () => {
  const navigate = useNavigate();

  const backHome = () => {
    navigate("/");
  };

  return (
    <section id="Error" className="container m-auto my-12">
      <div className="flex items-center justify-center gap-10">
        <img
          src={ImageError}
          className="max-w-600"
          alt="Página não encontrada, retorne para a home"
        />
        <div>
          <h1 className="text-6xl text-center text-red-500 mb-6">Error 404</h1>
          <p className="text-lg">
            Desculpe, não sei como chegou aqui, mas está página não existe.{" "}
            <br />
            Volte para a página Home
          </p>
          <Link
            to="/"
            className=" block py-2 px-10 w-36 text-center text-white text-lg rounded-md bg-green-600 mt-6 font-semibold "
          >
            Voltar
          </Link>
        </div>
      </div>
    </section>
  );
};

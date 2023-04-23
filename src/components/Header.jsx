import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import { Button } from "react-bootstrap";
import { AiOutlineMenu, AiOutlinePlusCircle } from "react-icons/ai";
import { AuthContext } from "../contexts/AuthContext";

export const Header = () => {
  const { auth, navbar, setNavbar } = useContext(AuthContext);

  return (
    <nav className="w-full bg-neutral-100 shadow mb-5">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl lg:items-center lg:flex lg:px-10">
        <div>
          <div className="flex items-center justify-between py-3 lg:py-5 lg:block">
            <NavLink to="/">
              <img src={Logo} className="h-14" alt="Logo da Parmacen" />
            </NavLink>
            <div className="lg:hidden">
              <Button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-green-600 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <AiOutlinePlusCircle className="text-2xl text-green-700" />
                ) : (
                  <AiOutlineMenu className="text-2xl text-green-700" />
                )}
              </Button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`pb-3 mt-8 lg:pb-0 lg:mt-0 lg:flex lg:gap-5 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="text-lg items-center justify-center space-y-8 lg:flex lg:space-x-6 lg:space-y-0">
              <li className="text-neutral-600 hover:text-green-600">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="text-neutral-600 hover:text-green-600">
                <NavLink to="/lista-produtos">Produtos</NavLink>
              </li>
              <li className="text-neutral-600 hover:text-green-600">
                <NavLink to="/cadastrar-loja">Cadastrar loja</NavLink>
              </li>
              <li className="text-neutral-600 hover:text-green-600">
                <NavLink to="/cadastrar-produto">Cadastrar produto</NavLink>
              </li>
            </ul>

            <div>
              <div className="mt-3 space-y-2 lg:hidden  md:space-y-0 md:flex md:gap-5">
                <NavLink
                  to="/entrar"
                  className="inline-block w-full px-4 py-2 text-center  text-white  border-2 border-green-600 bg-green-600 rounded-md shadow hover:bg-green-700 "
                >
                  Entrar
                </NavLink>
                <NavLink
                  to="/cadastrar-usuario"
                  className="inline-block w-full px-4 py-2 text-center text-green-700 bg-white border-2 border-green-600 rounded-md shadow hover:bg-green-600 hover:text-white m-0"
                >
                  Inscrever-se
                </NavLink>
              </div>

              <div className="hidden space-x-2  lg:inline-block">
                {auth.isAuthenticated ? (
                  <NavLink
                    onClick={() => {
                      setAuth({ isAuthenticated: false, user: null });
                      setIsLogged(false);
                    }}
                    className="px-4 py-2 text-white border-2 border-green-600 bg-green-600 rounded-md shadow hover:bg-green-700 "
                  >
                    Sair
                  </NavLink>
                ) : (
                  <>
                    <NavLink
                      to="/entrar"
                      className="px-4 py-2 text-white border-2 border-green-600 bg-green-600 rounded-md shadow hover:bg-green-700 "
                    >
                      Entrar
                    </NavLink>
                    <NavLink
                      to="/cadastrar-usuario"
                      className="px-4 py-2 text-gray-800 bg-white border-2 border-green-600 rounded-md shadow hover:bg-green-600 hover:text-white"
                    >
                      Inscrever-se
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

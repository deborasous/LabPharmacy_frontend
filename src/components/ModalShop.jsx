import React, { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import InputMask from "react-input-mask";
import ReactModal from "react-modal";
import { ShopContext } from "../contexts/ShopContext";

ReactModal.setAppElement("#root");

export const ModalShop = () => {
  const {
    modal,
    selectedShop,
    isEditing,
    setIsEditing,
    setModal,
    setSelectedShop,
    checkCEP,
    register,
  } = useContext(ShopContext);

  return (
    <div>
      <ReactModal
        isOpen={modal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0 ,0, 0.5)",
            zIndex: 10000,
          },
          content: {
            border: "1px solid #fff",
            background: "#ffffff",
            borderRadius: "20px",
            padding: "2rem",
            maxWidth: "40rem",
            maxHeight: "31rem",
            margin: "auto",
            height: "100vh",
            overflowY: "scroll",
            zIndex: 10000,
          },
        }}
      >
        <div className="max-w-lg">
          <h2 className="text-xl text-neutral-700 text-center mb-5">
            Informações do item
          </h2>
          {isEditing ? (
            <div>
              <div className="mb-5">
                <Form>
                  <div className="infContact flex gap-5">
                    <Form.Group
                      className="grid mb-4 text-neutral-500"
                      controlId="celPhone"
                    >
                      <Form.Label className="mb-1">Celular:</Form.Label>
                      <InputMask
                        className="w-full rounded border-2 border-gray-400 p-3 outline-none max-h-50 "
                        type="text"
                        placeholder="(99) 99999-9999"
                        mask="(99) 99999-9999"
                        name="celPhone"
                        value={selectedShop.celPhone}
                        {...register("celPhone")}
                        onChange={(e) =>
                          setSelectedShop({
                            ...selectedShop,
                            celPhone: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group
                      className="grid mb-4 text-neutral-500"
                      controlId="celPhone"
                    >
                      <Form.Label className="mb-1">Telefone:</Form.Label>
                      <InputMask
                        className="w-full rounded border-2 border-gray-400 p-3 outline-none max-h-50 "
                        type="text"
                        placeholder="(99) 99999-9999"
                        mask="(99) 99999-9999"
                        name="phoneNumber"
                        value={selectedShop.phoneNumber}
                        onChange={(e) =>
                          setSelectedShop({
                            ...selectedShop,
                            phoneNumber: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group
                      className="grid mb-4 text-neutral-500"
                      controlId="celPhone"
                    >
                      <Form.Label className="mb-1">E-mail:</Form.Label>
                      <InputMask
                        className="w-full rounded border-2 border-gray-400 p-3 outline-none max-h-50 "
                        type="text"
                        placeholder="fulano@gmail.com"
                        name="email"
                        value={selectedShop.email}
                        onChange={(e) =>
                          setSelectedShop({
                            ...selectedShop,
                            email: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </div>
                  <div className="addess ">
                    <h3 className="pb-1 text-green-800 text-xl">Endereço</h3>
                    <hr className="pb-6  border-neutral-400" />
                    <Form.Group
                      className="grid mb-4 text-neutral-500"
                      controlId="formBasicPassword"
                    >
                      <Form.Label className="mb-1">*CEP</Form.Label>
                      <InputMask
                        className="w-full rounded border-2 border-gray-400 p-3 outline-none max-h-50 "
                        type="text"
                        placeholder="99999-999"
                        mask="99999-999"
                        name="cep"
                        value={selectedShop.cep}
                        onChange={(e) =>
                          setSelectedShop({
                            ...selectedShop,
                            cep: e.target.value,
                          })
                        }
                        onBlur={checkCEP}
                      />
                    </Form.Group>

                    <Form.Group
                      className="grid mb-4 text-neutral-500"
                      controlId="formBasicPassword"
                    >
                      <Form.Label className="mb-1">*Logradouro</Form.Label>
                      <Form.Control
                        className="w-full rounded border-2 border-gray-400 p-3 outline-none max-h-50 "
                        type="text"
                        placeholder="Rua"
                        name="street"
                        value={selectedShop.street}
                        onChange={(e) =>
                          setSelectedShop({
                            ...selectedShop,
                            street: e.target.value,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group
                      className="grid mb-4 text-neutral-500"
                      controlId="formBasicPassword"
                    >
                      <Form.Label className="mb-1">*N°</Form.Label>
                      <Form.Control
                        className="w-full rounded border-2 border-gray-400 p-3 outline-none max-h-50 "
                        type="number"
                        placeholder="Número da casa"
                        name="number"
                        value={selectedShop.number}
                        onChange={(e) =>
                          setSelectedShop({
                            ...selectedShop,
                            number: e.target.value,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group
                      className="grid mb-4 text-neutral-500"
                      controlId="formBasicPassword"
                    >
                      <Form.Label className="mb-1">*Bairro</Form.Label>
                      <Form.Control
                        className="w-full rounded border-2 border-gray-400 p-3 outline-none max-h-50 "
                        type="text"
                        placeholder="Bairro"
                        name="district"
                        value={selectedShop.district}
                        onChange={(e) =>
                          setSelectedShop({
                            ...selectedShop,
                            district: e.target.value,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group
                      className="grid mb-4 text-neutral-500"
                      controlId="formBasicPassword"
                    >
                      <Form.Label className="mb-1">*Cidade</Form.Label>
                      <Form.Control
                        className="w-full rounded border-2 border-gray-400 p-3 outline-none max-h-50 "
                        type="text"
                        placeholder="Cidade"
                        name="city"
                        value={selectedShop.city}
                        onChange={(e) =>
                          setSelectedShop({
                            ...selectedShop,
                            city: e.target.value,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group
                      className="grid mb-4 text-neutral-500"
                      controlId="formBasicPassword"
                    >
                      <Form.Label className="mb-1">*Uf</Form.Label>
                      <Form.Control
                        className="w-full rounded border-2 border-gray-400 p-3 outline-none max-h-50 "
                        type="text"
                        placeholder="Estado"
                        name="uf"
                        value={selectedShop.uf}
                        onChange={(e) =>
                          setSelectedShop({
                            ...selectedShop,
                            uf: e.target.value,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group
                      className="grid mb-4 text-neutral-500"
                      controlId="formBasicPassword"
                    >
                      <Form.Label className="mb-1">Complemento</Form.Label>
                      <Form.Control
                        className="w-full rounded border-2 border-gray-400 p-3 outline-none max-h-50 "
                        type="text"
                        placeholder="Apto, bloco..."
                        name="complement"
                        value={selectedShop.complement}
                        onChange={(e) =>
                          setSelectedShop({
                            ...selectedShop,
                            complement: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </div>
                </Form>
              </div>
              <div className="flex justify-end">
                <Button
                  className="bg-green-600 hover:bg-green-500 text-neutral-100 font-semibold text-lg rounded-lg px-6 py-2 mr-5"
                  onClick={() => {
                    // Lógica para salvar as informações
                    setIsEditing(false);
                  }}
                >
                  Salvar
                </Button>
                <Button
                  className="bg-neutral-300 hover:bg-neutral-400 font-semibold text-lg rounded-lg px-6 py-2"
                  onClick={() => setIsEditing(false)}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="infShop">
                <div>
                  <p className="text-neutral-600">
                    <span className="mr-2 text-neutral-700 font-semibold">
                      Razão Social:
                    </span>
                    {selectedShop && selectedShop.businessName}
                  </p>
                  <p className="text-neutral-600">
                    <span className="mr-2 text-neutral-700 font-semibold">
                      Nome Fantasia:
                    </span>
                    {selectedShop && selectedShop.fantasyName}
                  </p>
                  <p className="text-neutral-600">
                    <span className="mr-2 text-neutral-700 font-semibold">
                      CNPJ:
                    </span>

                    {selectedShop && selectedShop.cnpj}
                  </p>
                  <p className="text-neutral-600">
                    <span className="mr-2 text-neutral-700 font-semibold">
                      Celular:
                    </span>
                    {selectedShop && selectedShop.celPhone}
                  </p>
                  {selectedShop && selectedShop.phoneNumber && (
                    <p className="text-neutral-600">
                      <span className="mr-2 text-neutral-700 font-semibold">
                        Telefone:
                      </span>
                      {selectedShop.phoneNumber}
                    </p>
                  )}
                  <p className="text-neutral-600">
                    <span className="mr-2 text-neutral-700 font-semibold">
                      E-mail:
                    </span>
                    {selectedShop && selectedShop.email}
                  </p>
                </div>
              </div>
              <hr className="my-5" />
              <div className="address">
                <p className="text-neutral-600">
                  <span className="mr-2 text-neutral-700 font-semibold">
                    Rua:
                  </span>
                  {selectedShop && selectedShop.street}
                </p>
                <p className="text-neutral-600">
                  <span className="mr-2 text-neutral-700 font-semibold">
                    N°:
                  </span>
                  {selectedShop && selectedShop.number}
                </p>
                <p className="text-neutral-600">
                  <span className="mr-2 text-neutral-700 font-semibold">
                    Bairro:
                  </span>
                  {selectedShop && selectedShop.district}
                </p>
                <p className="text-neutral-600">
                  <span className="mr-2 text-neutral-700 font-semibold">
                    Cidade:
                  </span>
                  {selectedShop && selectedShop.city}
                </p>
                <p className="text-neutral-600">
                  <span className="mr-2 text-neutral-700 font-semibold">
                    Estado:
                  </span>
                  {selectedShop && selectedShop.uf}
                </p>
                {selectedShop && selectedShop.complement && (
                  <p className="text-neutral-600">
                    <span className="mr-2 text-neutral-700 font-semibold">
                      Complemento:
                    </span>
                    {selectedShop.complement}
                  </p>
                )}
              </div>

              <div className="flex gap-5">
                <Button
                  className="bg-neutral-300 hover:bg-neutral-400 font-semibold text-lg rounded-lg px-6 py-2 mt-5"
                  onClick={() => setIsEditing(true)}
                >
                  <AiFillEdit className="text-2xl text-blue-600" />
                </Button>

                <Button
                  className=" bg-green-600 hover:bg-green-500 text-neutral-100 font-semibold text-lg  rounded-lg px-6 py-2 mt-5"
                  onClick={() => setModal(false)}
                >
                  Fechar
                </Button>
              </div>
            </div>
          )}
        </div>
      </ReactModal>
    </div>
  );
};

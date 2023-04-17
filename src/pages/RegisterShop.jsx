import React from "react";

export const RegisterShop = () => {
  // const {
  //   setEmail,
  //   email,
  //   setBusinessName,
  //   businessName,
  //   setCnpj,
  //   cnpj,
  //   setCelPhone,
  //   celPhone,
  //   setCep,
  //   cep,
  //   setCity,
  //   city,
  //   setComplement,
  //   complement,
  //   setDistrict,
  //   district,
  //   setFantasyName,
  //   fantasyName,
  //   setNumber,
  //   number,
  //   setPhoneNumber,
  //   phoneNumber,
  //   setPublicPlace,
  //   publicPlace,
  //   setStates,
  //   states,
  //   handleOnSubmit,
  //   register,
  //   handleSubmit,
  //   errors,
  // } = useContext(UserContext);

  return (
    <section className="py-10">
      <h1 className="text-4xl text-center text-neutral-600 mb-6">
        Cadastre uma loja
      </h1>

      {/* <Form
   
        className="block max-w-6xl m-auto px-6 py-10 lg:px-10 border-2 border-gray-100 rounded-lg shadow-md shadow-slate-300 bg-gray-100"
      >
        <div className="pb-6">
          <h3 className="pb-1 text-green-800 text-xl">Dados da empresa</h3>
          <hr className="pb-6 border-neutral-400" />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <Form.Group
              className="grid mb-5 text-neutral-500"
              controlId="formBasicEmail"
            >
              <Form.Label className="mb-1">Razão Social</Form.Label>
              <Form.Control
                className="w-full rounded border-2 border-gray-400 p-3 outline-none"
                type="text"
                placeholder="Razão Social"
                {...register("businessName", { required: true })}
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
              {errors.businessName && (
                <p className="text-red-500">{errors.businessName?.message}</p>
              )}
            </Form.Group>

            <Form.Group
              className="grid mb-5 text-neutral-500"
              controlId="formBasicPassword"
            >
              <Form.Label className="mb-1">Nome Fantasia</Form.Label>
              <Form.Control
                className="w-full rounded border-2 border-gray-400 p-3 outline-none "
                type="text"
                placeholder="Nome fantasia"
                {...register("fantasyName", { required: true })}
                value={fantasyName}
                onChange={(e) => setFantasyName(e.target.value)}
              />
              {errors.fantasyName && (
                <p className="text-red-500">{errors.fantasyName?.message}</p>
              )}
            </Form.Group>

            <Form.Group controlId="cnpj" className="grid mb-5 text-neutral-500">
              <Form.Label className="mb-1">CNPJ</Form.Label>
              <InputMask
                className="w-full rounded border-2 border-gray-400 p-3 outline-none"
                type="text"
                placeholder="99.999.999/0001-99"
                mask="99.999.999/9999-99"
                {...register("cnpj", { required: true })}
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
              />
              {errors.cnpj && (
                <p className="text-red-500">{errors.cnpj?.message}</p>
              )}
            </Form.Group>
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <Form.Group
              className="grid mb-5 text-neutral-500"
              controlId="formBasicEmail"
            >
              <Form.Label className="mb-1">E-mail</Form.Label>
              <Form.Control
                className="w-full rounded border-2 border-gray-400 p-3 outline-none"
                type="email"
                placeholder="fulano@gmail.com"
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
              controlId="phoneNumber"
            >
              <Form.Label className="mb-1">Telefone</Form.Label>
              <InputMask
                className="w-full rounded border-2 border-gray-400 p-3 outline-none "
                type="text"
                placeholder="(99) 9999-9999"
                mask="(99) 9999-9999"
                {...register("phoneNumber", { required: true })}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="grid mb-5 text-neutral-500"
              controlId="celPhone"
            >
              <Form.Label className="mb-1">Celular</Form.Label>
              <InputMask
                className="w-full rounded border-2 border-gray-400 p-3 outline-none"
                type="text"
                placeholder="(99) 99999-9999"
                mask="(99) 99999-9999"
                {...register("celPhone", { required: true })}
                value={celPhone}
                onChange={(e) => setCelPhone(e.target.value)}
              />
              {errors.celPhone && (
                <p className="text-red-500">{errors.celPhone?.message}</p>
              )}
            </Form.Group>
          </div>
        </div>

        <div>
          <h3 className="pb-1 text-green-800 text-xl">Endereço</h3>
          <hr className="pb-6  border-neutral-400" />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <div className="flex gap-3 items-center">
              <Form.Group
                className="grid mb-4 text-neutral-500"
                controlId="formBasicPassword"
              >
                <Form.Label className="mb-1">CEP</Form.Label>
                <InputMask
                  className="w-full rounded border-2 border-gray-400 p-3 outline-none "
                  type="text"
                  placeholder="99999-999"
                  mask="99999-999"
                  {...register("cep", { required: true })}
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                />
                {errors.cep && (
                  <p className="text-red-500">{errors.cep?.message}</p>
                )}
              </Form.Group>
              <Button
                type="submit"
                className=" bg-green-600 hover:bg-green-500 text-neutral-100 font-semibold text-sm rounded-lg px-3 py-4 whitespace-nowrap"
              >
                Buscar Cep
              </Button>
            </div>

            <Form.Group
              className="grid mb-4 text-neutral-500"
              controlId="formBasicPassword"
            >
              <Form.Label className="mb-1">Logradouro</Form.Label>
              <Form.Control
                className="w-full rounded border-2 border-gray-400 p-3 outline-none "
                type="text"
                placeholder="Rua"
                {...register("publicPlace", { required: true })}
                value={publicPlace}
                onChange={(e) => setPublicPlace(e.target.value)}
              />
              {errors.publicPlace && (
                <p className="text-red-500">{errors.publicPlace?.message}</p>
              )}
            </Form.Group>

            <Form.Group
              className="grid mb-4 text-neutral-500"
              controlId="formBasicPassword"
            >
              <Form.Label className="mb-1">N°</Form.Label>
              <Form.Control
                className="w-full rounded border-2 border-gray-400 p-3 outline-none "
                type="number"
                placeholder="Número da casa"
                {...register("number", { required: true })}
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
              {errors.number && (
                <p className="text-red-500">{errors.number?.message}</p>
              )}
            </Form.Group>
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 ">
            <Form.Group
              className="grid mb-4 text-neutral-500"
              controlId="formBasicPassword"
            >
              <Form.Label className="mb-1">Bairro</Form.Label>
              <Form.Control
                className="w-full rounded border-2 border-gray-400 p-3 outline-none "
                type="text"
                placeholder="Bairro"
                {...register("district", { required: true })}
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
              {errors.district && (
                <p className="text-red-500">{errors.district?.message}</p>
              )}
            </Form.Group>

            <Form.Group
              className="grid mb-4 text-neutral-500"
              controlId="formBasicPassword"
            >
              <Form.Label className="mb-1">Cidade</Form.Label>
              <Form.Control
                className="w-full rounded border-2 border-gray-400 p-3 outline-none "
                type="text"
                placeholder="Cidade"
                {...register("city", { required: true })}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              {errors.city && (
                <p className="text-red-500">{errors.city?.message}</p>
              )}
            </Form.Group>

            <Form.Group
              className="grid mb-4 text-neutral-500"
              controlId="formBasicPassword"
            >
              <Form.Label className="mb-1">Uf</Form.Label>
              <Form.Control
                className="w-full rounded border-2 border-gray-400 p-3 outline-none "
                type="text"
                placeholder="Estado"
                {...register("states", { required: true })}
                value={states}
                onChange={(e) => setStates(e.target.value)}
              />
              {errors.states && (
                <p className="text-red-500">{errors.states?.message}</p>
              )}
            </Form.Group>

            <Form.Group
              className="grid mb-4 text-neutral-500"
              controlId="formBasicPassword"
            >
              <Form.Label className="mb-1">Complemento</Form.Label>
              <Form.Control
                className="w-full rounded border-2 border-gray-400 p-3 outline-none "
                type="text"
                placeholder="Apto, bloco..."
                {...register("complement", { required: true })}
                value={complement}
                onChange={(e) => setComplement(e.target.value)}
              />
              {errors.complement && (
                <p className="text-red-500">{errors.complement?.message}</p>
              )}
            </Form.Group>
          </div>
        </div>
        <div className="flex gap-5">
          <Button
            type="submit"
            className="w-full max-h-14 mt-5 lg:w-60 bg-green-600 hover:bg-green-500 text-neutral-100 font-semibold text-lg  rounded-lg px-10 py-3"
          >
            Cadastrar
          </Button>
          <Button
            type="submit"
            className="w-full max-h-14 mt-5 lg:w-60 border-2 border-green-600 hover:bg-green-600  text-green-600 hover:text-neutral-100 font-semibold text-lg  rounded-lg px-10 py-3"
          >
            Limpar
          </Button>
        </div>
      </Form> */}
    </section>
  );
};

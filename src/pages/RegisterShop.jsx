import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import InputMask from "react-input-mask";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export const RegisterShop = () => {
  const [companyData, setCompanyData] = useState([]);
  let [company, setCompany] = useState({
    businessName: "",
    email: "",
    cnpj: "",
    celPhone: "",
    phoneNumber: "",
    fantasyName: "",
    cep: "",
    city: "",
    complement: "",
    district: "",
    number: "",
    street: "",
    uf: "",
  });

  const resetForm = () => {
    setCompany({
      businessName: "",
      email: "",
      cnpj: "",
      celPhone: "",
      phoneNumber: "",
      fantasyName: "",
      cep: "",
      city: "",
      complement: "",
      district: "",
      number: "",
      street: "",
      uf: "",
    });
  };

  const schema = yup.object().shape({
    fantasyName: yup.string().required("Campo Obrigatório"),
    businessName: yup.string().required("Campo Obrigatório"),
    cnpj: yup
      .string()
      .length(14)
      .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/)
      .required("Campo Obrigatório"),
    email: yup
      .string()
      .email("Insira um email válido")
      .required("Campo Obrigatório"),
    celPhone: yup
      .string()
      .matches(
        /^\(\d{2}\)\s\d{5}\-\d{4}$/,
        "Insira um número de telefone válido"
      )
      .required("Campo Obrigatório"),
    phoneNumber: yup
      .string()
      .matches(
        /^\([1-9]{2}\) [2-9][0-9]{3,4}\-[0-9]{4}$/,
        "Insira um número de telefone válido"
      ),
    cep: yup
      .string()
      .matches(/^\d{5}-\d{3}$/, "CEP digitado incorreto")
      .required("Campo Obrigatório"),
    city: yup.string().required("Campo Obrigatório"),
    complement: yup.string(),
    district: yup.string().required("Campo Obrigatório"),
    number: yup.string().required("Campo Obrigatório"),
    street: yup.string().required("Campo Obrigatório"),
    uf: yup.string().required("Campo Obrigatório"),
  });

  const {
    register,
    setFocus,
    setValue,
    formState: { errors },
  } = useForm(schema);

  const validateFields = (fields) => {
    for (const key in fields) {
      if (fields.hasOwnProperty(key) && !fields[key]) {
        return false;
      }
    }
    return true;
  };

  const checkCEP = (e) => {
    if (!e || !e.target) {
      return;
    }

    const cep = e.target.value.replace(/\D/g, "");
    console.log(cep);

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setCompany({
          ...company,
          street: data.logradouro,
          district: data.bairro,
          city: data.localidade,
          uf: data.uf,
          complement: "",
          number: "",
        });
        setValue("street", data.logradouro);
        setValue("district", data.bairro);
        setValue("city", data.localidade);
        setValue("uf", data.uf);
        setValue("complement", "");
        setValue("number", "");
        setFocus("number");
      });
  };

  const addShop = () => {
    const newCompanyData = [...companyData, company];
    localStorage.setItem("Lojas", JSON.stringify(newCompanyData));
    setCompanyData(newCompanyData);
  };

  const submitCompany = async (e) => {
    e.preventDefault();
    const areFieldsValid = validateFields(company);
    if (areFieldsValid) {
      try {
        await addShop();
        checkCEP();
        resetForm();
        resetForm();
        toast.success("Produto cadastrado com sucesso!");
      } catch (error) {
        toast.error(`Ocorreu um erro ao cadastrar o produto: ${error.message}`);
      }
    } else {
      toast.warning("Preencha todos os campos obrigatórios");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCompany((prevCompany) => ({
      ...prevCompany,
      [name]: value,
    }));
  };

  return (
    <section className="py-10">
      <h1 className="text-4xl text-center text-neutral-600 mb-6">
        Cadastre uma loja
      </h1>

      <Form
        onSubmit={submitCompany}
        className="block max-w-6xl m-auto px-6 py-10 lg:px-10 border-2 border-gray-100 rounded-lg shadow-md shadow-slate-300 bg-gray-100"
      >
        <ToastContainer />
        <div>
          <div className="pb-6">
            <h3 className="pb-1 text-green-800 text-xl">Dados da empresa*</h3>
            <hr className="pb-6 border-neutral-400" />

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <Form.Group
                className="grid mb-5 text-neutral-500"
                controlId="formBasicEmail"
              >
                <Form.Label className="mb-1">*Razão Social</Form.Label>
                <Form.Control
                  className="w-full rounded border-2 border-gray-400 p-3 outline-none max-h-50"
                  type="text"
                  placeholder="Razão Social"
                  name="businessName"
                  value={company.businessName}
                  {...register("businessName", { required: true })}
                  onChange={handleChange}
                />
                {errors.businessName && (
                  <p className="text-red-500">{errors.businessName?.message}</p>
                )}
              </Form.Group>

              <Form.Group
                className="grid mb-5 text-neutral-500"
                controlId="formBasicPassword"
              >
                <Form.Label className="mb-1">*Nome Fantasia</Form.Label>
                <Form.Control
                  className="w-full rounded border-2 border-gray-400 p-3 outline-none max-h-50 "
                  type="text"
                  name="fantasyName"
                  placeholder="Nome fantasia"
                  value={company.fantasyName}
                  {...register("fantasyName", { required: true })}
                  onChange={handleChange}
                />
                {errors.fantasyName && (
                  <p className="text-red-500">{errors.fantasyName?.message}</p>
                )}
              </Form.Group>

              <Form.Group
                controlId="cnpj"
                className="grid mb-5 text-neutral-500"
              >
                <Form.Label className="mb-1">*CNPJ</Form.Label>
                <InputMask
                  className="w-full rounded border-2 border-gray-400 p-3 outline-none max-h-50"
                  type="text"
                  placeholder="99.999.999/0001-99"
                  mask="99.999.999/9999-99"
                  name="cnpj"
                  value={company.cnpj}
                  {...register("cnpj", { required: true })}
                  onChange={handleChange}
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
                <Form.Label className="mb-1">*E-mail</Form.Label>
                <Form.Control
                  className="w-full rounded border-2 border-gray-400 p-3 outline-none max-h-50"
                  type="email"
                  placeholder="fulano@gmail.com"
                  name="email"
                  value={company.email}
                  {...register("email", { required: true })}
                  onChange={handleChange}
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
                  className="w-full rounded border-2 border-gray-400 p-3 outline-none max-h-50 "
                  type="text"
                  placeholder="(99) 9999-9999"
                  mask="(99) 9999-9999"
                  name="phoneNumber"
                  value={company.phoneNumber}
                  {...register("phoneNumber")}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group
                className="grid mb-5 text-neutral-500"
                controlId="celPhone"
              >
                <Form.Label className="mb-1">*Celular</Form.Label>
                <InputMask
                  className="w-full rounded border-2 border-gray-400 p-3 outline-none max-h-50"
                  type="text"
                  placeholder="(99) 99999-9999"
                  mask="(99) 99999-9999"
                  name="celPhone"
                  value={company.celPhone}
                  {...register("celPhone", { required: true })}
                  onChange={handleChange}
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
                  value={company.cep}
                  {...register("cep", { required: true })}
                  onBlur={checkCEP}
                  onChange={handleChange}
                />
                {errors.cep && (
                  <p className="text-red-500">{errors.cep?.message}</p>
                )}
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
                  value={company.street}
                  {...register("street", { required: true })}
                  onChange={handleChange}
                />
                {errors.street && (
                  <p className="text-red-500">{errors.street?.message}</p>
                )}
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
                  value={company.number}
                  {...register("number", { required: true })}
                  onChange={handleChange}
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
                <Form.Label className="mb-1">*Bairro</Form.Label>
                <Form.Control
                  className="w-full rounded border-2 border-gray-400 p-3 outline-none max-h-50 "
                  type="text"
                  placeholder="Bairro"
                  name="district"
                  value={company.district}
                  {...register("district", { required: true })}
                  onChange={handleChange}
                />
                {errors.district && (
                  <p className="text-red-500">{errors.district?.message}</p>
                )}
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
                  value={company.city}
                  {...register("city", { required: true })}
                  onChange={handleChange}
                />
                {errors.city && (
                  <p className="text-red-500">{errors.city?.message}</p>
                )}
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
                  value={company.uf}
                  {...register("uf", { required: true })}
                  onChange={handleChange}
                />
                {errors.uf && (
                  <p className="text-red-500">{errors.uf?.message}</p>
                )}
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
                  value={company.complement}
                  {...register("complement")}
                  onChange={handleChange}
                />
                {errors.complement && (
                  <p className="text-red-500">{errors.complement?.message}</p>
                )}
              </Form.Group>
            </div>
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
      </Form>
    </section>
  );
};

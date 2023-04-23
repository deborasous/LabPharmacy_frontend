import { createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { toast } from "react-toastify";

export const ShopContext = createContext();

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
    .matches(/^\(\d{2}\)\s\d{5}\-\d{4}$/, "Insira um número de telefone válido")
    .required("Campo Obrigatório"),
  phoneNumber: yup.string().notRequired(),
  cep: yup
    .string()
    .matches(/^\d{5}-\d{3}$/, "CEP digitado incorreto")
    .required("Campo Obrigatório"),
  city: yup.string().required("Campo Obrigatório"),
  district: yup.string().required("Campo Obrigatório"),
  number: yup.string().required("Campo Obrigatório"),
  complement: yup.string().notRequired(),
  street: yup.string().required("Campo Obrigatório"),
  uf: yup.string().required("Campo Obrigatório"),
});

export const ShopProvider = ({ children }) => {
  const [shop, setShop] = useState({
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
  const [shopList, setShopList] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedShop, setSelectedShop] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [position, setPosition] = useState([-27.5972029, -48.5494815]);
  const [zipCodeSearched, setZipCodeSearched] = useState("");
  const [center, setCenter] = useState([-27.5974, -48.5495]);
  const [zoom, setZoom] = useState(13);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredShop, setFilteredShop] = useState(shopList);

  //***lista de lojas

  const {
    register,
    handleSubmit,
    setFocus,
    setValue,
    formState: { errors },
  } = useForm(schema);

  useEffect(() => {
    //recupera a chave Loja e salva em shopList
    const storedShopList = JSON.parse(localStorage.getItem("Lojas")) || [];
    setShopList(storedShopList);

    //Sempre que a Loja for atualizada de outra aba ou da mesma, o shopList é atualizado e renderiza os itens na tabela
    window.addEventListener("storage", () => {
      const updatedShopList = JSON.parse(localStorage.getItem("Lojas")) || [];
      setShopList(updatedShopList);
    });
  }, []);

  const handleOpenModal = (item) => {
    setSelectedShop(item);
    setModal(true);
  };

  //cadastro, exclusão e edição de loja

  const validateFields = () => {
    if (!shop.businessName || typeof shop.businessName !== "string") {
      return false;
    }
    if (!shop.email || typeof shop.email !== "string") {
      return false;
    }

    if (!shop.cnpj || typeof shop.cnpj !== "string") {
      return false;
    }

    if (!shop.celPhone || typeof shop.celPhone !== "string") {
      return false;
    }
    if (!shop.fantasyName || typeof shop.fantasyName !== "string") {
      return false;
    }
    if (!shop.cep || typeof shop.cep !== "string") {
      return false;
    }
    if (!shop.number || typeof shop.number !== "string") {
      return false;
    }

    if (shop.phoneNumber && typeof shop.phoneNumber !== "string") {
      return false;
    }

    // Verifica se o complement é uma string válida, mas permite que esteja vazio
    if (shop.complement && typeof shop.complement !== "string") {
      return false;
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
        setShop({
          ...shop,
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
    const newCompanyData = [...shopList, shop];
    localStorage.setItem("Lojas", JSON.stringify(newCompanyData));
    setShopList(newCompanyData);
  };

  const removeShop = (shopToRemove) => {
    setShopList((prevShopList) =>
      prevShopList.filter((item) => item !== shopToRemove)
    );
  };

  const editShop = (updatedShop) => {
    const updatedShopList = shopList.map((item) =>
      item === selectedShop ? updatedShop : item
    );
    setShopList(updatedShopList);
    setSelectedShop(null);
    setModal(false);
  };

  //Não funciona quando passado como parametro do handleSubmit do useForm dentro do componente RegisterShop
  const submitCompany = (e) => {
    e.preventDefault();

    const areFieldsValid = validateFields(shop);
    if (areFieldsValid) {
      try {
        addShop();
        checkCEP();
        toast.success("Farmácia cadastrada com sucesso!");
      } catch (error) {
        toast.error(`Ocorreu um erro ao cadastrar farmácia: ${error.message}`);
      }
    } else {
      toast.warning("Preencha todos os campos obrigatórios");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setShop((prevCompany) => ({
      ...prevCompany,
      [name]: value,
    }));
  };

  //search

  useEffect(() => {
    if (searchTerm) {
      const filteredList = shopList.filter(
        (shop) =>
          shop.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shop.celPhone.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shop.cep.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredShop(filteredList);

      if (filteredList.length === 0) {
        setFilteredShop(shopList);
      }
    } else {
      setFilteredShop(shopList);
    }
  }, [searchTerm, shopList]);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchInputBlur = () => {
    setSearchTerm("");
  };

  const contextValues = {
    shop,
    setShop,
    shopList,
    setShopList,
    modal,
    setModal,
    selectedShop,
    setSelectedShop,
    zipCodeSearched,
    setZipCodeSearched,
    center,
    setCenter,
    zoom,
    setZoom,
    position,
    setPosition,
    handleOpenModal,
    searchTerm,
    setSearchTerm,
    handleChange,
    submitCompany,
    addShop,
    removeShop,
    editShop,
    isEditing,
    setIsEditing,
    checkCEP,
    validateFields,
    register,
    handleSubmit,
    errors,
    handleSearchInputChange,
    handleSearchInputBlur,
    filteredShop,
  };

  return (
    <ShopContext.Provider value={contextValues}>
      {children}
    </ShopContext.Provider>
  );
};

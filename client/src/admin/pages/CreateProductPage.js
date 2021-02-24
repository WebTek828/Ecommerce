import React from "react";

import CreateProduct from "../components/CreateProduct/CreateProduct";
import { useHttp } from "../../customHooks/useHttp";

const CreateProductPage = (props) => {
  const [
    createdProduct,
    loading,
    error,
    fetchData,
    setCreatedProduct,
    setError,
  ] = useHttp();

  const createProductHandler = (value) => {
    fetchData(`http://localhost:5000/products`, "post", value);
  };

  return (
    <>
      <CreateProduct createProduct={(value) => createProductHandler(value)} />
    </>
  );
};

export default CreateProductPage;

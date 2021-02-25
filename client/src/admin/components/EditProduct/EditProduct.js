import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductForm from "../CreateProduct/ProductForm/ProductForm";
import Spinner from "../../../share/UI/Spinner/Spinner";
import { useHttp } from "../../../customHooks/useHttp";
import useCheckOverAllValid from "../../../customHooks/useCheckOverAllValid";

const EditProduct = (props) => {
  const [editProductVal, loading, error, fetchData] = useHttp();
  const [editedProduct, editIsLoading, editError, editData] = useHttp();
  const productId = useParams().productId;

  useEffect(() => {
    fetchData(`http://localhost:5000/products/${productId}`);
  }, []);

  const [productVal, setProductVal] = useState({
    brand: "",
    price: "",
    image: "",
    description: "",
    gender: "",
    inStock: "",
    cashOnDelivery: "",
    warranty: "",
    size: "",
    return: "",
  });

  const [allValid] = useCheckOverAllValid(productVal);

  useEffect(() => {
    editProductVal &&
      setProductVal({
        ...productVal,
        brand: {
          value: editProductVal.brand,
          isTouched: true,
          valid: true,
        },
        price: { value: editProductVal.price, valid: true, isTouched: true },
        image: { value: editProductVal.image, valid: true, isTouched: true },
        description: {
          value: editProductVal.description,
          valid: true,
          isTouched: true,
        },
        gender: {
          value: editProductVal.features.gender,
          valid: true,
          isTouched: true,
        },
        inStock: {
          value: editProductVal.features.inStock,
          valid: true,
          isTouched: true,
        },
        cashOnDelivery: {
          value: editProductVal.cashOnDelivery,
          valid: true,
          isTouched: true,
        },
        warranty: {
          value: editProductVal.features.warranty,
          valid: true,
          isTouched: true,
        },
        size: {
          value: editProductVal.features.size,
          valid: true,
          isTouched: true,
        },
        return: {
          value: editProductVal.features.return,
          valid: true,
          isTouched: true,
        },
      });
  }, [editProductVal]);

  const changeEditValHandler = (val, label) => {
    setProductVal({ ...productVal, [label]: val });
  };

  const editProductHandler = () => {
    //send http request to edit
  };

  return editProductVal ? (
    <>
      <Spinner show={loading} />
      <h1>Edit your product</h1>
      <ProductForm
        creatingProduct={editProductHandler}
        brand={editProductVal.brand}
        price={editProductVal.price}
        image={editProductVal.image}
        description={editProductVal.description}
        gender={editProductVal.features.gender}
        inStock={editProductVal.features.inStock}
        cashOnDelivery={editProductVal.features.cashOnDelivery}
        warranty={editProductVal.features.warranty}
        size={editProductVal.features.size}
        return={editProductVal.features.return}
        changeLoginVal={(val, label) => changeEditValHandler(val, label)}
        allValid={allValid}
      />
    </>
  ) : null;
};

export default EditProduct;

import React, { useEffect, useState } from "react";

import "./App.css";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import AllProducts from "./products/pages/AllProductsPage/AllProductsPage";
import ProductDetailPage from "./products/pages/ProductDetailPage/ProductDetailPage";
import Navigation from "./share/UI/Navigation/Navigation";
import FilterProductPage from "./products/pages/FilterProductPage/FilterProductPage";
import CartPage from "./cart/pages/CartPage/CartPage";
import Context from "./contexts/context";
import Auth from "./share/components/auth/auth";
import CheckoutPage from "./cart/pages/CheckoutPage/CheckoutPage";
import { useHttp } from "./customHooks/useHttp";

const App = () => {
  const history = useHistory();
  const [
    cartItem,
    loading,
    error,
    fetchData,
    setCartItem,
    setError,
  ] = useHttp();

  const [cartItemAmount, setCartItemAmount] = useState();
  const [login, setLogin] = useState(false);
  const [curUser, setCurUser] = useState();
  const [token, setToken] = useState();
  const [authenticated, setAuthenticated] = useState(false);
  const [totalAmount, setTotalAmount] = useState();

  const updateCartItemAmount = () => {
    let totalAmount = 0;
    console.log(cartItem);
    cartItem &&
      Array.isArray(cartItem) &&
      cartItem.forEach((cartItem) => {
        totalAmount += parseInt(cartItem.price) * cartItem.pickedQty;
      });

    const result =
      cartItem &&
      Array.isArray(cartItem) &&
      cartItem
        .map((d) => {
          return d.pickedQty;
        })
        .reduce((pre, cur) => {
          return pre + cur;
        }, 0);
    setCartItemAmount(result);
    setTotalAmount(totalAmount);
  };

  useEffect(() => {
    if (curUser) {
      fetchData(`http://localhost:5000/cart/${curUser.userId}`, "get");
    } else {
      setCartItem([]);
    }
  }, [curUser]);

  useEffect(() => {
    updateCartItemAmount();
  }, [curUser, cartItem]);

  const loginUserHandler = (customer, token) => {
    setCurUser(customer);
    setToken(token);
    setAuthenticated(!!token);
  };

  const logoutUserHandler = () => {
    setCurUser(false);
    setToken("");
    setAuthenticated(false);
    history.push("/");
  };

  const toggleLoginHandler = () => {
    setLogin(!login);
  };

  console.log(cartItem);

  return (
    <div className="wrapper">
      <Auth
        loginUser={(customer, token) => loginUserHandler(customer, token)}
        toggleLogin={toggleLoginHandler}
        login={login}
      />
      <Context.Provider
        value={{
          logout: logoutUserHandler,
          cartItemAmount,
          toggleLogin: () => toggleLoginHandler(),
          curUser,
          authenticated: !!authenticated,
        }}
      >
        <Navigation />
      </Context.Provider>
      <Switch>
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/" component={AllProducts} />
        <Route
          exact
          path="/product/filter/:gender"
          component={FilterProductPage}
        />
        <Context.Provider
          value={{
            updateCartItemAmount: () => updateCartItemAmount(),
            curUser,
            authenticated,
            toggleLogin: toggleLoginHandler,
            totalAmount,
            cartItemAmount,
            cartItemData: {
              cartItem,
              loading,
              error,
              setCartItem: (cartItem) => setCartItem(cartItem),
              fetchData: (url, method, data) => fetchData(url, method, data),
              setError: (boolean) => setError(boolean),
            },
          }}
        >
          {authenticated && <Route path="/cart" exact component={CartPage} />}
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/product/:id" component={ProductDetailPage} />
        </Context.Provider>
      </Switch>
    </div>
  );
};

export default App;

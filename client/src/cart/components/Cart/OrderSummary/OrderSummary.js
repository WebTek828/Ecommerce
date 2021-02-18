import React, { useState, useEffect } from "react";

import "./OrderSummary.css";

const OrderSummary = (props) => {
  const [totalAmount, setTotalAmount] = useState(props.totalAmount);

  const maniStr = (amount) => {
    amount = amount.toString();

    if (amount.length > 3) {
      let words = [];
      let w3 = "";
      amount.split("").forEach((w, i) => {
        w3 += w;
        if (w3.length === 3) {
          words.push(w3);
          w3 = "";
        } else if (amount.length - 1 === i) {
          words.push(w3);
          w3 = "";
        }
      });
      console.log(words);
      return words.join(",");
    } else {
      return amount;
    }
  };

  useEffect(() => {
    setTotalAmount(props.totalAmount);
  }, [props.totalAmount]);

  const shippingFee = maniStr("2470");

  return (
    <>
      <h5 className="order-summary__header">Order Summary</h5>
      <ul className="order-summary__lists">
        <li className="order-summary__list">
          <span className="order-summary__text">
            Subtotal({props.totalItem} items)
          </span>
          <span className="order-summary__ks">{maniStr(totalAmount)}</span>
        </li>
        <li className="order-summary__list">
          <span className="order-summary__text">Shipping Fee</span>
          <span className="order-summary__ks">{shippingFee}</span>
        </li>
        <hr />
        <li className="order-summary__list total">
          <span className="order-summary__text">Total</span>
          <span className="order-summary__ks">
            {maniStr(parseInt(totalAmount) + parseInt(shippingFee))}
          </span>
        </li>
      </ul>
      <button className="order-summary__btn">{props.action}</button>
    </>
  );
};

export default OrderSummary;

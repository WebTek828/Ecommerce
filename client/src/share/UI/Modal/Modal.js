import React, { useState } from "react";

import BackDrop from "../../../share/UI/BackDrop/BackDrop";
import "./Modal.css";

const Modal = (props) => {
  return (
    <>
      <BackDrop clicked={props.hideModal} backDropShow={props.modalShow} />
      <div
        className={`modal ${props.className} ${
          props.modalShow && "modal-show"
        }`}
      >
        <h5 className="modal__title">{props.title}</h5>
        <div className="modal__body">{props.body}</div>
      </div>
    </>
  );
};

export default Modal;

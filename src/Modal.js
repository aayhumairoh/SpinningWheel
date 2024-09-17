import React from "react";
import "./styles.css";

const Modal = ({ showModal, closeModal, children }) => {
    if (!showModal) return null;

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={closeModal}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;

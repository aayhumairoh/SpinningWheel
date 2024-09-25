import React from "react";
import "./styles.css";
import confettiVideo from "./assets/confetti.webm"

const Modal = ({ showModal, closeModal, children }) => {
    if (!showModal) return null;

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <video autoPlay muted loop className="confetti-video">
                    <source src={confettiVideo} type="video/webm" />
                    {console.log("link video", confettiVideo)}
                </video>
                <div className="modal-body">
                    {/* <button className="close-btn" onClick={closeModal}>
                        &times;
                    </button> */}
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;

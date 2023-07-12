import React, { useState } from "react";

import "./NewServerMenu.css";

const NewServerMenu = ({ serverName }) => {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <>
            <button onClick={toggleModal}>
                new server
            </button>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h2>New Server</h2>
                        <div>
                            <p>Version: </p>

                        </div>
                        <button className="close-modal" onClick={toggleModal}>
                            CANCEL
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default NewServerMenu
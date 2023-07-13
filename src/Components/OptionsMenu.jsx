import React, { useState, useEffect } from "react";
import "./OptionsMenu.css";

const OptionsMenu = ({ serverName }) => {

  const [modal, setModal] = useState(false);
  const [serverProperties, setServerProperties] = useState(null);

  useEffect(() => {
    fetch("/properties?name=" + serverName).then(res => res.json()).then(data => {
      setServerProperties(data);
    })
  }, []);

  const getProp = () => {
    let data = Object.entries(serverProperties);
    return (
      data.map(([k, v], index) => {
        return <div>{k}: {v}</div>
      })
    )
  }

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
      <button onClick={toggleModal} className="Button">
        options
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Options for {serverName}</h2>
            {getProp()}
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default OptionsMenu
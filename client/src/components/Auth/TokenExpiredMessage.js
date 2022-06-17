import { useState, useEffect } from "react";

// Components
import Modal from "react-bootstrap/Modal";

const TokenExpiredMessage = ({ setTokenExpired }) => {
  const [show, setShow] = useState(true);

  // when modal is closed, we reinitialize tokenExpired to false
  useEffect(() => {
    !show && setTokenExpired(false);
  }, [show]);

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Votre session a expiré</Modal.Title>
      </Modal.Header>
      <Modal.Body>Veuillez vous reconnecter.</Modal.Body>
    </Modal>
  );
};

export default TokenExpiredMessage;

// Components
import Modal from "react-bootstrap/Modal";
import UpdatePasswordForm from "./UpdatePasswordForm";

const UpdatePasswordModal = (props) => {
  const { userId, setModalShow, setArticleListEdited, ...rest } = props;
  return (
    <Modal
      {...rest}
      as="section"
      aria-labelledby="update-password-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title as="h2" id="update-password-modal">
          Modifier mon mot de passe
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-md-5">
        <UpdatePasswordForm userId={userId} setModalShow={setModalShow} />
      </Modal.Body>
    </Modal>
  );
};

export default UpdatePasswordModal;

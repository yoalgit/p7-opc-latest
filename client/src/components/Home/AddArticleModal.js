// Components
import Modal from "react-bootstrap/Modal";
import AddArticleForm from "./AddArticleForm";

const AddArticleModal = (props) => {
  const { setModalShow, setArticleListEdited, ...rest } = props;

  return (
    <Modal
      {...rest}
      size="lg"
      aria-labelledby="add-article-modal"
      centered
      className="ps-0"
    >
      <Modal.Header closeButton>
        <Modal.Title as="h2" id="add-article-modal">
          Publier un article
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-md-5">
        <AddArticleForm
          setModalShow={setModalShow}
          setArticleListEdited={setArticleListEdited}
        />
      </Modal.Body>
    </Modal>
  );
};

export default AddArticleModal;

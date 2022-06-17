import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// Context
import { AuthContext } from "../../utils/context/AuthContext";

// Services
import articleService from "../../services/articleService";
import commentService from "../../services/commentService";
import userService from "../../services/userService";

// Components
import Modal from "react-bootstrap/Modal";
import { StyledButton } from "../../utils/style/styles";

// Delete confirmation modal used for all the delete actions
const DeleteConfirmation = ({
  componentToDelete,
  articleId,
  commentId,
  userId,
  commentsCount,
  setCommentRefresh,
  setCommentsCount,
  setArticleListEdited,
  show,
  onHide,
}) => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const deleteItem = async () => {
    try {
      // Different actions depending on deleted resource
      switch (componentToDelete) {
        case "article":
          await articleService.deleteArticle(articleId);
          setArticleListEdited(true);
          onHide();
          break;
        case "comment":
          await commentService.deleteComment(articleId, commentId);
          setCommentRefresh(true);
          setCommentsCount(commentsCount - 1);
          break;
        case "user":
          await userService.deleteUser(userId);
          if (currentUser.userId === userId) {
            logout();
            navigate("/auth");
          } else {
            navigate("/home");
          }
          break;
        default:
          throw new Error(`Veuillez préciser le type d'élément à supprimer`);
      }
    } catch (error) {}
  };

  // Customized confirmation message depending on deleted resource
  let message = "Voulez-vous vraiment supprimer ";
  switch (componentToDelete) {
    case "article":
      message += "cet article ?";
      break;
    case "comment":
      message += "ce commentaire ?";
      break;
    case "user":
      message += "ce compte ?";
      break;
    default:
      message += "cet élément";
  }
  return (
    <Modal
      show={show}
      onHide={onHide}
      as="section"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title as="h3" id="contained-modal-title-vcenter">
          {message}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-5 d-flex justify-content-center row">
        <StyledButton
          $danger
          $modal
          onClick={() => deleteItem()}
          className="col-12 col-sm-6 rounded-pill mx-2 mb-2"
        >
          Confirmer
        </StyledButton>
        <StyledButton
          $outline
          $modal
          onClick={onHide}
          className="col-12 col-sm-6 rounded-pill mx-2 mb-2"
        >
          Annuler
        </StyledButton>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteConfirmation;

import { useState } from "react";

// Components
import { LinkStyledButton } from "../../utils/style/styles";
import DeleteConfirmation from "./DeleteConfirmation";

const DeleteButton = ({
  componentToDelete,
  articleId,
  commentId,
  setCommentRefresh,
  commentsCount,
  setCommentsCount,
  setArticleListEdited,
}) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <LinkStyledButton
        onClick={() => setModalShow(true)}
        className="align-self-start"
      >
        <i className="fa-solid fa-xmark" aria-hidden="true"></i>
        <span className="sr-only">Supprimer</span>
      </LinkStyledButton>
      <DeleteConfirmation
        show={modalShow}
        onHide={() => setModalShow(false)}
        componentToDelete={componentToDelete}
        articleId={articleId}
        commentId={commentId}
        commentsCount={commentsCount}
        setCommentRefresh={setCommentRefresh}
        setCommentsCount={setCommentsCount}
        setArticleListEdited={setArticleListEdited}
      />
    </>
  );
};

export default DeleteButton;

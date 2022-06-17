import React, { useState, useEffect } from "react";

// Services
import commentService from "../../services/commentService";

// Components
import Collapse from "react-bootstrap/Collapse";
import Comment from "./Comment";
import { LinkStyledButton } from "../../utils/style/styles";

const ToggleComments = ({
  setCommentRefresh,
  commentRefresh,
  articleId,
  commentsCount,
  setCommentsCount,
}) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [commentsList, setCommentsList] = useState([]);

  const getComments = async () => {
    try {
      const response = await commentService.getAllComments(articleId);
      setCommentsList(response.data);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  // If the user publishes a new comment, we toggle the comment list open
  useEffect(() => {
    if (commentRefresh) {
      getComments();
      !open && commentRefresh && setOpen(true);
      setCommentRefresh(false);
    }
    return () => setCommentRefresh(false);
  }, [commentRefresh]);

  return (
    <React.Fragment>
      <LinkStyledButton
        onClick={() => setOpen(!open)}
        aria-controls={`comment-${articleId}`}
        aria-expanded={open}
      >
        <i className="fa-solid fa-comments fa-lg"></i>
        <span>{`${commentsCount} `}</span>
        {commentsCount > 1 ? (
          <span>commentaires</span>
        ) : (
          <span>commentaire</span>
        )}
      </LinkStyledButton>
      <Collapse in={open} onEnter={getComments}>
        <div id={`comment-${articleId}`}>
          {commentsList.map((comment) => (
            <Comment
              setCommentRefresh={setCommentRefresh}
              commentRefresh={commentRefresh}
              key={`comment-${comment.id}`}
              data={comment}
              commentsCount={commentsCount}
              setCommentsCount={setCommentsCount}
            />
          ))}
        </div>
      </Collapse>
    </React.Fragment>
  );
};

export default ToggleComments;

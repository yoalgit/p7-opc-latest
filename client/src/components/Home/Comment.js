// Hooks
import useCanDelete from "../../utils/hooks/useCanDelete";

// Components
import Card from "react-bootstrap/Card";
import DeleteButton from "../Shared/DeleteButton";
import CardHeader from "../Shared/CardHeader";

// Style
import styled from "styled-components";
import colors from "../../utils/style/colors";

const StyledCard = styled(Card)`
  border-left: 3px solid ${colors.secondaryDark};
`;

const Comment = ({
  data,
  commentRefresh,
  setCommentRefresh,
  commentsCount,
  setCommentsCount,
}) => {
  const userId = data.user.id;
  const canDelete = useCanDelete(userId, ["moderator", "admin"]);

  return (
    <StyledCard className="shadow-sm my-3 ">
      <Card.Body>
        <CardHeader type="comment" data={data}>
          {canDelete && (
            <DeleteButton
              componentToDelete="comment"
              articleId={data.articleId}
              commentId={data.id}
              setCommentRefresh={setCommentRefresh}
              commentRefresh={commentRefresh}
              setCommentsCount={setCommentsCount}
              commentsCount={commentsCount}
            />
          )}
        </CardHeader>
        <Card.Text>{data.content}</Card.Text>
      </Card.Body>
    </StyledCard>
  );
};

export default Comment;

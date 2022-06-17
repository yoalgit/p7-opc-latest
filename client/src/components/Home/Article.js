import { useState } from "react";

// Hooks
import useCanDelete from "../../utils/hooks/useCanDelete";

// Components
import Card from "react-bootstrap/Card";
import CardBase from "../Shared/CardBase";
import CardHeader from "../Shared/CardHeader";
import DeleteButton from "../Shared/DeleteButton";
import ArticleImage from "./ArticleImage";
import LikeButton from "./LikeButton";
import ToggleComments from "./ToggleComments";
import AddComment from "./AddComment";

function Article({ data, setArticleListEdited }) {
  const [commentRefresh, setCommentRefresh] = useState(false);
  const [commentsCount, setCommentsCount] = useState(data.commentsCount);
  const [likesCount, setLikesCount] = useState(data.likesCount);
  const [likedByUser, setLikedByUser] = useState();
  const userId = data.user.id;
  const canDelete = useCanDelete(userId, ["moderator", "admin"]);
  console.log(data);
  return (
    <CardBase as="article">
      <CardHeader type="article" data={data}>
        {canDelete && (
          <DeleteButton
            componentToDelete="article"
            articleId={data.id}
            setArticleListEdited={setArticleListEdited}
          />
        )}
      </CardHeader>

      <div className="px-md-4 d-flex flex-column">
        <Card.Title as="h2" className="my-3">
          {data.title}
        </Card.Title>
        {data?.image && <ArticleImage title={data.title} source={data.image} />}

        <Card.Text className="border-bottom border-3 pb-3">
          {data.content}
        </Card.Text>
      </div>
      <Card.Footer className="bg-white border-top-0 px-0 px-md-3 pt-3">
        <LikeButton
          articleId={data.id}
          likesCount={likesCount}
          setLikesCount={setLikesCount}
          likedByUser={likedByUser}
          setLikedByUser={setLikedByUser}
        />
        <ToggleComments
          articleId={data.id}
          commentRefresh={commentRefresh}
          setCommentRefresh={setCommentRefresh}
          commentsCount={commentsCount}
          setCommentsCount={setCommentsCount}
        />
        <AddComment
          articleId={data.id}
          commentRefresh={commentRefresh}
          setCommentRefresh={setCommentRefresh}
          commentsCount={commentsCount}
          setCommentsCount={setCommentsCount}
        />
      </Card.Footer>
    </CardBase>
  );
}

export default Article;

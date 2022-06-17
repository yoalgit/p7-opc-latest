import { useState, useEffect, useContext } from "react";

// Context
import { AuthContext } from "../../utils/context/AuthContext";

// Service
import likeService from "../../services/likeService";

// Components
import { LinkStyledButton } from "../../utils/style/styles";

const LikeButton = ({
  articleId,
  likesCount,
  setLikesCount,
  likedByUser,
  setLikedByUser,
}) => {
  const [error, setError] = useState(false);
  const { currentUser } = useContext(AuthContext);

  // Check if current user likes this article
  const checkLikes = (likes, user) => {
    let isLikedByUser = false;
    likes.forEach((like) => {
      if (like.userId === user) {
        isLikedByUser = true;
      }
    });
    return isLikedByUser;
  };

  // Get number of user liking the article
  useEffect(() => {
    const getIsLiked = async () => {
      try {
        const response = await likeService.getLike(articleId);
        const isLikedByUser = checkLikes(response.data, currentUser.userId);
        setLikedByUser(isLikedByUser);
        setLikesCount(response.data.length);
      } catch (err) {
        setError(err);
      }
    };
    getIsLiked();
  }, [likedByUser]);

  const postLike = async () => {
    try {
      // If the user previously liked the article, we send a "false" value to cancel the like and vice-versa
      const newLikeValue = likedByUser ? false : true;
      await likeService.sendLike(articleId, { isLiked: newLikeValue });
      // Toggle like button color
      setLikedByUser(!likedByUser);
      // If we sent a 'true' value (ie. the user liked the article) : likesCount incremented
      // If we sent a 'false' value (ie. the user unliked the article) : likesCount decremented
      newLikeValue
        ? setLikesCount(likesCount + 1)
        : setLikesCount(likesCount - 1);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <LinkStyledButton
      onClick={() => postLike()}
      likedByUser={likedByUser}
      className="me-3"
    >
      <i className="fa-solid fa-thumbs-up fa-lg"></i>
      {likesCount && <span>{likesCount} </span>} J'aime
    </LinkStyledButton>
  );
};

export default LikeButton;

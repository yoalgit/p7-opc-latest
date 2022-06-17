import styled from "styled-components";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";
import colors from "../../utils/style/colors";

// Time format configuration
dayjs.extend(relativeTime);
dayjs.locale("fr");

// Styled Component
const PublishedTimeStyled = styled.p`
  font-size: ${(props) => (props.inArticle ? "0.9em" : "0.75em")};
  color: ${colors.gray};
  margin-bottom: 0px;
`;

// Functional Component
const PublishedTime = ({ inArticle, createdAt }) => {
  return (
    <PublishedTimeStyled inArticle={inArticle}>
      {inArticle && "publié "}
      {dayjs(createdAt).fromNow()}
    </PublishedTimeStyled>
  );
};

export default PublishedTime;
